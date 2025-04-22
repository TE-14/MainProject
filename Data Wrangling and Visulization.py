import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, send_file
import io

# === data wrangling ===
# === 1. Cyberbullying & Self-Esteem ===
df1 = pd.read_csv('BRACK - cyberbullying and self-esteem dataset.csv', encoding='ISO-8859-1')
df1 = df1.drop_duplicates()
df1 = df1.loc[:, df1.isnull().mean() < 0.1]
for col in df1.columns:
    if df1[col].isnull().sum() > 0:
        if df1[col].dtype in ['float64', 'int64']:
            df1[col] = df1[col].fillna(df1[col].median())
        else:
            df1[col] = df1[col].fillna(df1[col].mode().iloc[0])
print("\n[1] Cleaned: Cyberbullying & Self-Esteem")
print(df1.info())

# === 2. Gaming & FOMO (COVID) ===
df2 = pd.read_excel('Data_Sheet_1_Anxiety, Depression, and Stress Are Associated With Internet Gaming Disorder During COVID-19_ Fear of Missing Out as a Mediator.xlsx')
df2 = df2.drop_duplicates()
df2 = df2.loc[:, df2.isnull().mean() < 0.1]
for col in df2.columns:
    if df2[col].isnull().sum() > 0:
        if df2[col].dtype in ['float64', 'int64']:
            df2[col] = df2[col].fillna(df2[col].median())
        else:
            df2[col] = df2[col].fillna(df2[col].mode().iloc[0])
print("\n[2] Cleaned: Gaming & FOMO during COVID")
print(df2.info())

# === 3. School Climate & IGD ===
df3 = pd.read_excel('Data_Sheet_1_The relationship between perceptions of school climate and internet gaming disorder of teenage students_ A moderated mediation model.xlsx')
df3 = df3.drop_duplicates()
df3 = df3.loc[:, df3.isnull().mean() < 0.1]
for col in df3.columns:
    if df3[col].isnull().sum() > 0:
        if df3[col].dtype in ['float64', 'int64']:
            df3[col] = df3[col].fillna(df3[col].median())
        else:
            df3[col] = df3[col].fillna(df3[col].mode().iloc[0])
print("\n[3] Cleaned: School Climate & IGD")
print(df3.info())

# === 4. India Adolescent Bullying Survey ===
df4 = pd.read_csv('Survey Data.csv')
df4 = df4.drop_duplicates()
df4 = df4.loc[:, df4.isnull().mean() < 0.1]
for col in df4.columns:
    if df4[col].isnull().sum() > 0:
        if df4[col].dtype in ['float64', 'int64']:
            df4[col] = df4[col].fillna(df4[col].median())
        else:
            df4[col] = df4[col].fillna(df4[col].mode().iloc[0])
print("\n[4] Cleaned: India Bullying Survey")
print(df4.info())

# === 5. Trolling in Australia ===
df5 = pd.read_excel('Trolling experiences in an Australian sample of adolescents.xlsx')
df5 = df5.drop_duplicates()
df5 = df5.loc[:, df5.isnull().mean() < 0.1]
for col in df5.columns:
    if df5[col].isnull().sum() > 0:
        if df5[col].dtype in ['float64', 'int64']:
            df5[col] = df5[col].fillna(df5[col].median())
        else:
            df5[col] = df5[col].fillna(df5[col].mode().iloc[0])
print("\n[5] Cleaned: Trolling in Australia")
print(df5.info())

# === data visulization===

# --- Visualization 1: Cyberbullying Score vs Self-Esteem ---
cyberbully_cols = [col for col in df1.columns if "message" in col.lower() or "spread" in col.lower()]
df1["Cyberbullying_Score"] = df1[cyberbully_cols].sum(axis=1)

esteem_col = None
for col in df1.columns:
    if "esteem" in col.lower():
        esteem_col = col
        break

if esteem_col:
    plt.figure(figsize=(8, 6))
    sns.scatterplot(data=df1, x='Cyberbullying_Score', y=esteem_col)
    plt.title("Cyberbullying Score vs Self-Esteem")
    plt.xlabel("Cyberbullying Score")
    plt.ylabel("Self-Esteem Score")
    plt.tight_layout()
    plt.show()

# --- Visualization 2: Gender vs Victim Status ---
victim_cols = [col for col in df4.columns if col.lower().startswith('dv')]
df4['Victim_Score'] = df4[victim_cols].sum(axis=1)
df4['Is_Victim'] = df4['Victim_Score'].apply(lambda x: 1 if x > 0 else 0)

if 'gender' in df4.columns:
    plt.figure(figsize=(8, 6))
    sns.countplot(data=df4, x='gender', hue='Is_Victim')
    plt.title('Gender vs Cyberbullying Victim Status')
    plt.xlabel('Gender')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.show()

# --- Visualization 3: Age Distribution of Trolling Participants ---
if 'Age' in df5.columns:
    plt.figure(figsize=(8, 6))
    sns.histplot(data=df5, x='Age', bins=10, kde=True)
    plt.title('Age Distribution of Trolling Participants')
    plt.xlabel('Age')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.show()


# === Flask API ===
app = Flask(__name__)

@app.route("/")
def home():
    return "<h3>Welcome to the Cyberbullying Visualization API</h3><ul><li><a href='/plot1'>/plot1</a></li><li><a href='/plot2'>/plot2</a></li><li><a href='/plot3'>/plot3</a></li></ul>"

@app.route("/plot1")
def plot1():
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.scatterplot(data=df1, x='Cyberbullying_Score', y=esteem_col, ax=ax)
    ax.set_title("Cyberbullying Score vs Self-Esteem")
    ax.set_xlabel("Cyberbullying Score")
    ax.set_ylabel("Self-Esteem Score")
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route("/plot2")
def plot2():
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.countplot(data=df4, x='gender', hue='Is_Victim', ax=ax)
    ax.set_title('Gender vs Cyberbullying Victim Status')
    ax.set_xlabel('Gender')
    ax.set_ylabel('Count')
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route("/plot3")
def plot3():
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.histplot(data=df5, x='Age', bins=10, kde=True, ax=ax)
    ax.set_title('Age Distribution of Trolling Participants')
    ax.set_xlabel('Age')
    ax.set_ylabel('Count')
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)




