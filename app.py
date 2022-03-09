from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/associative")
def associative():
    return render_template("associative.html")

@app.route("/simple")
def simple():
    return render_template("simple.html")

@app.route("/function")
def function():
    return render_template("function.html")

@app.route("/usingClass")
def usingClass():
    return render_template("class.html")