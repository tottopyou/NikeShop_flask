from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from app.models import User

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()], name= "login-username")
    password = PasswordField('Password', validators=[DataRequired()], name= "login-password")

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()], name= "register-username")
    email = StringField('Email', validators=[DataRequired(), Email()], name= "register-email")
    password = PasswordField('Password', validators=[DataRequired()], name= "register-password")
    password2 = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('password')], name= "password_r2")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')
        
class EditProfileForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])


class CommentForm(FlaskForm):
    content = TextAreaField('Comment', validators=[DataRequired()], name= "comment_field")