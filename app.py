import os,sys
import datetime
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


def dateconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

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

@app.route('/deleteEmployee', methods=["POST"])
def deleteEmployee():
    content = request.get_json()
    delete_id = content.get('employee_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Employee did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    employee = db.session.query(models.User).get(delete_id)
    db.session.delete(employee)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Employee deleted.",
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


@app.route('/shifts')
def getShifts():
    shifts = db.session.query(models.Shift).all()
    response = []
    for val in shifts:
        s = val.__dict__
        response.append({
            'shift_id': s['shift_id'],
            'employee_id': s['employee_id'],
            'date': s['date'],
            'start_time': s['start_time'],
            'end_time': s['end_time'],
            'location': s['location'],
            'category_id': s['category_id'],
            'complete': s['complete']
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '), default=dateconverter)

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
        'message': "Shift added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/deleteShift', methods=['POST'])
def deleteShift():
    content = request.get_json()
    delete_id = content.get('shift_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Shift did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    shift = db.session.query(models.Shift).get(delete_id)
    db.session.delete(shift)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Shift deleted.",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/jobs')
def getJobs():
    jobs = db.session.query(models.Job).all()
    response = []
    for val in jobs:
        j = val.__dict__
        response.append({
            'job_id': j['job_id'],
            'name': j['name'],
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/addJob', methods=['POST'])
def addJob():
    content = request.get_json()
    job = models.Job(
        content.get('name')
    )
    db.session.add(job)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Job added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/deleteJob', methods=['POST'])
def deleteJob():
    content = request.get_json()
    delete_id = content.get('job_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Job did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    job = db.session.query(models.Job).get(delete_id)
    db.session.delete(job)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Job deleted.",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/locations')
def getLocations():
    locations = db.session.query(models.Location).all()
    response = []
    for val in locations:
        loc = val.__dict__
        response.append({
            'location_id': loc['location_id'],
            'name': loc['name'],
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/addLocation', methods=['POST'])
def addLocation():
    content = request.get_json()
    location = models.Location(
        content.get('name')
    )
    db.session.add(location)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Location added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/deleteLocation', methods=['POST'])
def deleteLocation():
    content = request.get_json()
    delete_id = content.get('location_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Location did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    location = db.session.query(models.Location).get(delete_id)
    db.session.delete(location)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Location deleted.",
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
