import os

basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = os.environ['MAIL_SERVER']
    MAIL_PORT = os.environ['MAIL_PORT']    
    MAIL_USE_TLS = os.environ['MAIL_USE_TLS']
    MAIL_USERNAME = os.environ['MAIL_USERNAME']
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
    ADMINS = os.environ['ADMINS']