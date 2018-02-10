import os,sys
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) 
app.debug = True

# PostgreSQL for Server
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

@app.route('/')
def home():
    return render_template('base.html')



@app.route('/admin/shift')
def createShift():
	return render_template('addShift.html')



if __name__ == '__main__': 
	app.run()