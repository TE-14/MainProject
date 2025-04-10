from flask import Flask, send_file
import pandas as pd
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route('/')
def home():
    return '''
        <h2>Welcome to Grooming API</h2>
        <p>To view the pie chart, go to 
        <a href="/grooming-awareness-chart">/grooming-awareness-chart</a></p>
    '''

@app.route('/grooming-awareness-chart')
def grooming_chart():
    df = pd.read_csv("CSA-Data-Cleaned.csv")
    col_name = "Do_you_know_what_child_grooming_is"
    df[col_name] = df[col_name].astype(str).str.lower().str.strip()
    df[col_name] = df[col_name].replace({
        'yes': 'Yes',
        'no': 'No',
        'y': 'Yes',
        'n': 'No',
        'true': 'Yes',
        'false': 'No'
    })
    counts = df[col_name].value_counts()

    # 绘图
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.pie(counts, labels=counts.index, autopct='%1.1f%%',
           colors=["#66b3ff", "#ff9999"], startangle=140)
    ax.set_title("Awareness of Child Grooming")
    plt.tight_layout()

    # 转为图像流返回
    buf = io.BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
