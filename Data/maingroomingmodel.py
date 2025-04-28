import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
from transformers import TextClassificationPipeline
import torch

# === Step 1: Load and prepare data ===
df = pd.read_csv("pan12_message_level_grooming.csv")
df = df[df['label'].isin(['safe', 'grooming'])]

# Dynamically sample available data (up to 6000 each)
groom_count = min(len(df[df['label'] == 'grooming']), 6000)
safe_count = min(len(df[df['label'] == 'safe']), 6000)

df_groom = df[df['label'] == 'grooming'].sample(n=groom_count, random_state=42)
df_safe = df[df['label'] == 'safe'].sample(n=safe_count, random_state=42)

df_sampled = pd.concat([df_safe, df_groom]).sample(frac=1, random_state=42).reset_index(drop=True)
df_sampled['label_enc'] = df_sampled['label'].map({'safe': 0, 'grooming': 1})

# Split into training and testing sets
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df_sampled['text'].tolist(), df_sampled['label_enc'].tolist(), test_size=0.1, random_state=42, stratify=df_sampled['label_enc']
)

# === Step 2: Tokenization ===
tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
train_encodings = tokenizer(train_texts, truncation=True, padding=True, max_length=64)
test_encodings = tokenizer(test_texts, truncation=True, padding=True, max_length=64)

# === Step 3: Dataset Wrapper ===
class GroomingDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
    def __getitem__(self, idx):
        return {key: torch.tensor(val[idx]) for key, val in self.encodings.items()} | {'labels': torch.tensor(self.labels[idx])}
    def __len__(self):
        return len(self.labels)

train_dataset = GroomingDataset(train_encodings, train_labels)
test_dataset = GroomingDataset(test_encodings, test_labels)

# === Step 4: Load Model ===
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)

# === Step 5: Training Config ===
training_args = TrainingArguments(
    output_dir="./grooming_model",
    num_train_epochs=1,  # fast training
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    logging_dir="./logs",
    logging_steps=100
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

# === Step 6: Train Model ===
trainer.train()

# === Step 7: Evaluate Model ===
print("\nEvaluation:")
print(trainer.evaluate())

# === Step 8: Build Inference Pipeline ===
pipe = TextClassificationPipeline(
    model=model,
    tokenizer=tokenizer,
    return_all_scores=True,
    device=0 if torch.cuda.is_available() else -1
)

# === Step 9: Risk Level Function ===
def predict_risk(text):
    scores = pipe(text)[0]
    grooming_score = next(score['score'] for score in scores if score['label'] == 'LABEL_1')

    if grooming_score < 0.35:
        return f"SAFE ({grooming_score:.2f})"
    elif grooming_score < 0.70:
        return f"CAUTION ({grooming_score:.2f})"
    else:
        return f"DANGER ({grooming_score:.2f})"

# === Save model and tokenizer ===
model.save_pretrained("./grooming_model")
tokenizer.save_pretrained("./grooming_model")
print("Model saved to ./grooming_model")

# === Step 10: Run Live Testing ===
print("\nType a message to check grooming risk (type 'exit' to stop):")
while True:
    text = input(">> ")
    if text.lower() in ['exit', 'quit']:
        break
    result = predict_risk(text)
    print(f"Prediction: {result}")
