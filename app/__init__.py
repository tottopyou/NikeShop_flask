from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
import logging
import os
from authlib.integrations.flask_client import OAuth


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db = SQLAlchemy(app)
    migrate = Migrate(app, db)
    login = LoginManager(app)
    file_handler = logging.FileHandler('app.log')
    file_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] %(message)s'))
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)
    mail = Mail(app)

    oauth = OAuth(app)
    google = oauth.register(
        name='google',
        client_id="354944080345-ti09n9mflh184mrn5m246m3kn7nlhvhs.apps.googleusercontent.com",
        client_secret="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",
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        authorize_params=None,
        api_base_url='https://www.googleapis.com/oauth2/v1/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={'scope': 'email profile'},
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration'
    )

    with app.app_context():
        mail.connect()
    
    return app

from app import routes, models