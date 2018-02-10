from app import *
from datetime import datetime

# users class
class User(db.Model):
    employee_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    phone_number = db.Column(db.String(20))
    email_address = db.Column(db.String(120), unique=True)
    
    def __init__(
        self,
        first_name,
        last_name,
        phone_number,
        email_address
    ):

        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.email_address = email_address

    def __repr__(self):
        return '<Email %r>' % self.email_address

# shift class
class Shift(db.Model):
    shift_id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer)
    date = db.Column(db.DateTime)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    location = db.Column(db.String(120))
    category_id = db.Column(db.Integer)
    complete = db.Column(db.Boolean)

    def __init__(
        self,
        shift_id,
        employee_id,
        date,
        start_time,
        end_time,
        location,
        category_id,
        complete
    ):

        self.shift_id = shift_id
        self.employee_id = employee_id
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.location = location
        self.category_id = category_id
        self.complete = complete

    def __repr__(self):
        return '<Shift %r>' % self.shift_id

