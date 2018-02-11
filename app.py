import os,sys
from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests
import json
import psycopg2

app = Flask(__name__)
app.debug = True
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost/circus'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)
import models

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/employees')
def getEmployees():
    employees = db.session.query(models.User).all()
    response = []
    for val in employees:
        emp = val.__dict__
        response.append({
            'id': emp['employee_id'],
            'first_name': emp['first_name'],
            'last_name': emp['last_name'],
            'email': emp['email_address']
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/employees/<employee_id>', methods=['GET'])
def getEmployee(employee_id):
    employee = db.session.query(models.User).get(employee_id)
    emp_dict = employee.__dict__
    response = {
        'id': employee_id,
        'first_name': emp_dict['first_name'],
        'last_name': emp_dict['last_name'],
        'email': emp_dict['email_address']
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/addEmployee', methods=['POST'])
def addEmployee():
    content = request.get_json()
    employee = models.User(
        content.get('first_name'),
        content.get('last_name'),
        content.get('phone_number'),
        content.get('email_address')
        )
    db.session.add(employee)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Employee added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/categories', methods=['GET'])
def getCategories():
    categories = db.session.query(models.Category).all()
    response = []
    for val in categories:
        cat = val.__dict__
        response.append({
            'id': cat['category_id'],
            'location': cat['location'],
            'job': cat['job'],
            'name': cat['name']
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/addShift', methods=['POST'])
def addShift():
    content = request.get_json()
    shift = models.Shift(
        content.get('employee_id'),
        content.get('date'),
        content.get('start_time'),
        content.get('end_time'),
        content.get('location'),
        None,
        content.get('complete')
    )
    db.session.add(shift)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Employee added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/addCategory')

@app.route('/dashboard')
def getDashboard():
    return 'Not yet.'

@app.route('/dbtest')
def getDBStuff():
    return 'oops'
if __name__ == '__main__':
    app.run()
