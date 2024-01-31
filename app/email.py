import smtplib
from threading import Thread

from flask import current_app, render_template
from flask_mail import Message

from app.models import mail


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    Thread(target=send_async_email, args=(current_app._get_current_object(), msg)).start()

def send_password_reset_email(user):
    token = user.get_reset_password_token()
    send_email('[NikeShop] Reset Your Password',
               sender=current_app.config['ADMINS'][0],
               recipients=[user.email],
               text_body=render_template('email/reset_password.txt', user=user, token=token),
               html_body=render_template('email/reset_password.html', user=user, token=token))


def send_async_email(app, msg):
    with app.app_context():
        print("here will be app : ", app, '\n', "here will be msg : ", msg )
        try:
            mail.send(msg)
        except smtplib.SMTPServerDisconnected as e:
            app.logger.error(f"SMTP Server Disconnected: {e}")
            try:
                mail.connect()  
                mail.send(msg)
                app.logger.info("Reconnected to SMTP server and sent email successfully.")
            except Exception as conn_error:
                app.logger.error(f"Error while reconnecting to SMTP server: {conn_error}")