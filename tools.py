import datetime

def date_convert(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()
