import os,sys
import datetime
from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from dateutil import parser
import requests
import json
import psycopg2
import pytz


app = Flask(__name__)
app.debug = True
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://ugozwxkr:mdQ1clGViIGjn8VD8WtT46yk9hOcG-Pl@babar.elephantsql.com:5432/ugozwxkr'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)
import models
utc=pytz.UTC

@app.template_global()
def static_include(filename):
    fullpath = os.path.join(app.static_folder, filename)
    with open(fullpath, 'r') as f:
        return f.read()

def dateconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


# Main routes

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')


# Admin routes

@app.route('/admin/settings')
def settings():
    return render_template('admin/settings.html')

@app.route('/admin/shift')
def createShift():
	return render_template('addShift.html')

@app.route('/admin/grouping')
def createCategoryGrouping():
    return render_template('addGrouping.html')

@app.route('/admin/category')
def createCategory():
	return render_template('addCategory.html')

@app.route('/admin/location')
def createLocation():
    return render_template('addLocation.html')

@app.route('/admin/job')
def createJob():
    return render_template('addJob.html')

@app.route('/admin/employee')
def createEmployee():
    return render_template('addEmployee.html')

@app.route('/admin/employee/delete')
def removeEmployee():
    return render_template('deleteEmployee.html')

@app.route('/admin/location/delete')
def removeLocation():
    return render_template('deleteLocation.html')



# Rest routes

@app.route('/employees', methods=['GET'])
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
        content.get('email_address'),
        content.get('role')
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
    delete_id = content.get('id')
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
            'job_id': s['job_id'],
            'location': s['location'],
            'category_id': s['category_id'],
            'complete': s['complete'],
            'comments': s['comments']
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
        content.get('job_id'),
        content.get('location'),
        content.get('category_id'),
        content.get('complete'),
        content.get('comments')
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
    print(content)

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

@app.route('/categories', methods=["GET"])
def getCategories():
    categories = db.session.query(models.Category).all()
    response = []
    for val in categories:
        cat = val.__dict__
        response.append({
            'category_id': cat['category_id'],
            'name': cat['name'],
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '), default=dateconverter)

@app.route('/addCategory', methods=['POST'])
def addCategory():
    content = request.get_json()
    category = models.Category(
        content.get('name'),
    )
    db.session.add(category)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Category added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '), default=dateconverter)

@app.route('/deleteCategory', methods=['POST'])
def deleteCategory():
    content = request.get_json()
    delete_id = content.get('category_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Category did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    category = db.session.query(models.Category).get(delete_id)
    db.session.delete(category)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Category deleted.",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/groupings')
def getGroupings():
    groupings = db.session.query(models.Grouping).all()
    response = []
    for val in groupings:
        cat = val.__dict__
        response.append({
            'grouping_id': cat['grouping_id'],
            'job_id': cat['job_id'],
            'location_id': cat['location_id'],
            'category_id': cat['category_id'],
            'start_time': cat['start_time'],
            'end_time': cat['end_time'],
            })
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '), default=dateconverter)

@app.route('/addGrouping', methods=['POST'])
def addGrouping():
    content = request.get_json()
    location = models.Grouping(
        content.get('job_id'),
        content.get('location_id'),
        content.get('category_id'),
        content.get('start_time'),
        content.get('end_time')
    )
    db.session.add(location)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Grouping added to database",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '), default=dateconverter)

@app.route('/deleteGrouping', methods=['POST'])
def deleteGrouping():
    content = request.get_json()
    delete_id = content.get('grouping_id')
    if not delete_id:
        response = {
            'status': 403,
            'message': "Grouping did not exist",
        }
        return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
    category = db.session.query(models.Grouping).get(delete_id)
    db.session.delete(grouping)
    db.session.commit()
    response = {
        'status': 200,
        'message': "Grouping deleted.",
    }
    return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

# @app.route('/updateGrouping', methods=['POST'])
# def updateGrouping():
# 	content = request.get_json()
# 	o_job_id = content.get('job_id')
#     o_location_id = content.get('location_id')
# 	o_location_id = content.get('category_id')
# 	o_start_time_id = parser.parse(content.get('start_time'))
# 	o_end_time_id = parser.parse(content.get('end_time'))

# 	groupings = db.session.query(models.Grouping).all()
# 	for item in groupings:
# 		item_dict = item.__dict__
# 		print item_dict
# 		if item_dict['job_id'] == o_job_id and item_dict['location_id'] == o_location_id and item_dict['category_id'] == o_category_id and utc.localize(item_dict['start_time']) >= o_start_time and utc.localize(item_dict['end_time']) <= o_end_time:
# 			grouping = db.session.query(models.Grouping).get(item_dict['grouping_id'])
# 			db.session.commit()

# 	response = {
#         'status': 200,
#         'message': "Grouping updated.",
#     }
# 	return json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

@app.route('/dbtest')
def getDBStuff():
    return 'oops'
if __name__ == '__main__':
    app.run()
