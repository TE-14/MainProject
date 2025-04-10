import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, send_file
import io

# ---Data Wrangling---
import pandas as pd

# read the dataset csv
df = pd.read_csv("CSA-Data.csv")

# Show the original column name (optional)
print("Original columns:\n", df.columns.tolist())

# Normalized column names: Remove Spaces and special characters
df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[^\w_]', '', regex=True)

# drop the duplicate information
df = df.drop_duplicates()

# View the missing Values overview
print("\nMissing values before cleaning:\n", df.isnull().sum())

# Fill missing value
for col in df.columns:
    if df[col].isnull().sum() > 0:
        if df[col].dtype in ['float64', 'int64']:
            df[col] = df[col].fillna(df[col].median())
        else:
            df[col] = df[col].fillna(df[col].mode().iloc[0])

# Unify Boolean column values (e.g. Yes/No, true/false to Yes/No)
bool_map = {
    'yes': 'Yes', 'no': 'No',
    'true': 'Yes', 'false': 'No',
    'TRUE': 'Yes', 'FALSE': 'No',
}
for col in df.columns:
    if df[col].dtype == object:
        df[col] = df[col].astype(str).str.strip().str.lower().replace(bool_map)

# Print post-cleaning information
print("\n Cleaned Dataset Info:")
print(df.info())

# Optional: Save the cleaned data
df.to_csv("CSA-Data-Cleaned.csv", index=False)





# ---Visulization---
import pandas as pd
import matplotlib.pyplot as plt

# read the cleaned dataset
df = pd.read_csv("CSA-Data-Cleaned.csv")

# Standardized column name
df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[^\w_]', '', regex=True)

# Standardize the content of the response column
col_name = "Do_you_know_what_child_grooming_is"
df[col_name] = df[col_name].astype(str).str.lower().str.strip()

# Unify common answers as Yes/No
df[col_name] = df[col_name].replace({
    'yes': 'Yes',
    'no': 'No',
    'y': 'Yes',
    'n': 'No',
    'true': 'Yes',
    'false': 'No'
})

# Statistical frequency
counts = df[col_name].value_counts()

# Draw a pie chart
plt.figure(figsize=(6, 6))
plt.pie(counts, labels=counts.index, autopct='%1.1f%%', colors=["#66b3ff", "#ff9999"], startangle=140)
plt.title("Awareness of Child Grooming")
plt.tight_layout()
plt.show()



