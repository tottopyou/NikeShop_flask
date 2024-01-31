import logging
import os

from authlib.integrations.flask_client import OAuth
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    from app.models import db
    db.init_app(app)
    migrate = Migrate(app, db)

    from app.models import login
    login.init_app(app)

    from app.email import mail 
    mail.init_app(app)

    file_handler = logging.FileHandler('app.log')
    file_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] %(message)s'))
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)

    oauth = OAuth(app)
    google = oauth.register(
        name='google',
        client_id="354944080345-ti09n9mflh184mrn5m246m3kn7nlhvhs.apps.googleusercontent.com",
        client_secret=os.environ['client_secret'],
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        authorize_params=None,
        api_base_url='https://www.googleapis.com/oauth2/v1/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={'scope': 'email profile'},
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        redirect_uri=os.environ['OAUTH_REDIRECT_URI']
    )

    with app.app_context():
        mail.connect()

    from app.routes import routes_line  # Import routes_line after initializing mail

    routes_line(app, db, oauth)

    return app

from app import models