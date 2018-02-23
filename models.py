from app import *
from datetime import datetime

# users class
class User(db.Model):
    employee_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    phone_number = db.Column(db.String(20))
    email_address = db.Column(db.String(120), unique=True)
    role = db.Column(db.String(6))

    def __init__(
        self,
        first_name,
        last_name,
        phone_number,
        email_address,
        role
    ):

        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.email_address = email_address
        self.role=role

    def __repr__(self):
        return '{first_name:%s, last_name: %s, phone_number: %s, email_address: %s, role: %s }'%(self.first_name, self.last_name, self.phone_number, self.email_address, self.role)

# shift class
class Shift(db.Model):
    shift_id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer)
    date = db.Column(db.DateTime)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    job_id=db.Column(db.Integer)
    location = db.Column(db.String(120))
    category_id = db.Column(db.Integer)
    complete = db.Column(db.Boolean)
    comments = db.Column(db.String(400))

    def __init__(
        self,
        employee_id,
        date,
        start_time,
        end_time,
        job_id,
        location,
        category_id,
        complete,
        comments
    ):

        self.employee_id = employee_id
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.job = job
        self.location = location
        self.category_id = category_id
        self.complete = complete
        self.comments = comments

    def __repr__(self):
        return '{shift_id:%s, employee_id: %s, date: %s, start_time: %s, end_time: %s, job_id: %s, location: %s, category_id: %s, complete: %s }'%(self.shift_id, self.employee_id, self.date, self.start_time, self.end_time, self.job_id, self.location, self.category_id, self.complete)

# job class
class Job(db.Model):
    job_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))

    def __init__(
        self,
        name,
    ):

        self.name = name

    def __repr__(self):
        return '{name:%s}'%(self.name)


# location class
class Location(db.Model):
    location_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))

    def __init__(
        self,
        name,
    ):
        self.name = name

    def __repr__(self):
        return '{name:%s}'%(self.name)

class Category(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))

    def __init__(
        self,
        name
    ):
        self.name = name

    def __repr__(self):
        return '{name:%s}'%self.name
# grouping class
class Grouping(db.Model):
    grouping_id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer)
    location_id = db.Column(db.Integer)
    category_id = db.Column(db.Integer)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)


    def __init__(
        self,
        job_id,
        location_id,
        category_id,
        start_time,
        end_time
    ):
        
        self.job_id = job_id
        self.location_id = location_id
        self.category_id = category_id
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return '{job_id: %s, location_id: %s, category_id: %s, start_time: %s, end_time: %s}'%(self.job_id, self.location_id, self.category_id, self.start_time, self.end_time)
