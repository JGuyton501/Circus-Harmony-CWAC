import os,sys
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) 
app.debug = True


# PostgreSQL for Server
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']


@app.template_global()
def static_include(filename):
    fullpath = os.path.join(app.static_folder, filename)
    with open(fullpath, 'r') as f:
        return f.read()

@app.route('/')
def home():
    return render_template('base.html')



@app.route('/admin/shift')
def createShift():
	return render_template('addShift.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')
    

if __name__ == '__main__': 
	app.run()