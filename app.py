import os,sys
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
import requests
import json
import psycopg2

app = Flask(__name__)
app.debug = True
db = SQLAlchemy(app)
db.init_app(app)
import models
# PostgreSQL for Server
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['postgresql://postgres@localhost/circus']
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost/circus'
POSTGRES = {
    'user': 'circus',
    'pw' : 'password',
    'db' : 'circus',
    'host': 'localhost',
    'port': '5432',
}
employees_url = "http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2"
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/employees')
def getEmployees():
    response = requests.get(employees_url)
    if (response.ok):
        json_data = json.loads(response.content)
        return json.dumps(json_data)
    else:
        return 'Could not decode JSON response'

@app.route('/employees/<employee_id>')
def getEmployee(employee_id):
    req_id = int(employee_id)
    response = requests.get(employees_url)
    if (response.ok):
        json_data = json.loads(response.content)
        for emp in json_data:
            if emp['id'] == req_id:
                return json.dumps(emp)
    return 'could not find employee'

@app.route('/dashboard')
def getDashboard():
    return 'Not yet.'

@app.route('/dbtest')
def getDBStuff():
    return 'oops'
if __name__ == '__main__':
    app.run()
