import xml.etree.ElementTree as ET
import pandas as pd

# === STEP 1: Set file paths ===
xml_file = 'pan12-sexual-predator-identification-test-corpus-2012-05-17.xml'
problem2_file = 'pan12-sexual-predator-identification-groundtruth-problem2.txt'
output_csv = 'pan12_message_level_grooming.csv'

# === STEP 2: Parse the XML corpus ===
print("Parsing XML file...")
tree = ET.parse(xml_file)
root = tree.getroot()

messages_data = []

for convo in root.findall('conversation'):
    convo_id = convo.get('id')
    for msg in convo.findall('message'):
        line_num = msg.get('line')
        author_elem = msg.find('author')
        text_elem = msg.find('text')

        if text_elem is not None and text_elem.text:
            text = text_elem.text.strip()
            messages_data.append({
                'conversation_id': convo_id,
                'line': line_num,
                'text': text
            })

df_messages = pd.DataFrame(messages_data)
print(f"Total messages extracted: {len(df_messages)}")

# === STEP 3: Load grooming labels from problem2.txt ===
print("Loading grooming labels...")
grooming_lines = set()

with open(problem2_file, 'r', encoding='utf-8') as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 2:
            convo_id, line_id = parts
            grooming_lines.add((convo_id, line_id))

# === STEP 4: Label messages ===
def label_message(row):
    return 'grooming' if (row['conversation_id'], row['line']) in grooming_lines else 'safe'

df_messages['label'] = df_messages.apply(label_message, axis=1)

# === STEP 5: Clean and filter ===
df_messages['text'] = df_messages['text'].astype(str).str.strip()
df_messages = df_messages[df_messages['text'].str.len() > 10]
df_messages = df_messages.dropna()

# === STEP 6: Save the dataset ===
df_messages.to_csv(output_csv, index=False)
print(f"\nSaved labeled dataset to: {output_csv}")
print("Label counts:")
print(df_messages['label'].value_counts())
