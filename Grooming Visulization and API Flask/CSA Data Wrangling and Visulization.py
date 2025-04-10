import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, send_file
import io

import pandas as pd

# 读取数据
df = pd.read_csv("CSA-Data.csv")

# 显示原始列名（可选）
print("Original columns:\n", df.columns.tolist())

# 标准化列名：去除空格和特殊字符
df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[^\w_]', '', regex=True)

# 去重
df = df.drop_duplicates()

# 查看缺失值概况
print("\nMissing values before cleaning:\n", df.isnull().sum())

# 填充缺失值
for col in df.columns:
    if df[col].isnull().sum() > 0:
        if df[col].dtype in ['float64', 'int64']:
            df[col] = df[col].fillna(df[col].median())
        else:
            df[col] = df[col].fillna(df[col].mode().iloc[0])

# 统一布尔列的值（例如是/否、true/false 统一为 Yes/No）
bool_map = {
    'yes': 'Yes', 'no': 'No',
    'true': 'Yes', 'false': 'No',
    'TRUE': 'Yes', 'FALSE': 'No',
}
for col in df.columns:
    if df[col].dtype == object:
        df[col] = df[col].astype(str).str.strip().str.lower().replace(bool_map)

# 打印清洗后信息
print("\n Cleaned Dataset Info:")
print(df.info())

# 可选：保存清洗后的数据
df.to_csv("CSA-Data-Cleaned.csv", index=False)






import pandas as pd
import matplotlib.pyplot as plt

# 读取数据
df = pd.read_csv("CSA-Data-Cleaned.csv")

# 标准化列名
df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[^\w_]', '', regex=True)

# 标准化回答列内容
col_name = "Do_you_know_what_child_grooming_is"
df[col_name] = df[col_name].astype(str).str.lower().str.strip()

# 将常见回答统一为 Yes / No
df[col_name] = df[col_name].replace({
    'yes': 'Yes',
    'no': 'No',
    'y': 'Yes',
    'n': 'No',
    'true': 'Yes',
    'false': 'No'
})

# 统计频数
counts = df[col_name].value_counts()

# 绘制饼状图
plt.figure(figsize=(6, 6))
plt.pie(counts, labels=counts.index, autopct='%1.1f%%', colors=["#66b3ff", "#ff9999"], startangle=140)
plt.title("Awareness of Child Grooming")
plt.tight_layout()
plt.show()



