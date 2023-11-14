from app import app, db
from app.forms import LoginForm, RegistrationForm,EditProfileForm,CommentForm
from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Comment

@app.route('/', methods=['GET', 'POST'])
def none():
    return redirect('/base')


@app.route('/base', methods=['GET', 'POST'])
def base():

    login_form = LoginForm()
    registration_form = RegistrationForm()
    comment_form = CommentForm()
    comments = []
    comments = Comment.query.order_by(Comment.timestamp.desc()).all()
    if request.method == 'POST':
        print("Form submitted via POST method")
        if 'login' in request.form :
            print("Form LOG")
            print(request.form)

            if login_form.validate_on_submit():
                print("Form LOG IN")
                username = request.form['login-username']
                password = request.form['login-password']
                user = User.query.filter_by(username=username).first()
                if user is None or not user.check_password(password):
                    print("error")
                    flash('Invalid username or password')
                else:
                    print("you are logined")
                    login_user(user)
        elif 'comment' in request.form:
            print("Form comment")
            if comment_form.validate_on_submit():
                print("Form comment IN ")
                comment = Comment(content=request.form['comment_field'], user_id = current_user.id )  
                db.session.add(comment)
                db.session.commit()

        elif 'register' in request.form:
            print("Form REG")
            if registration_form.validate_on_submit():
                print("Form REG IN ")
                username = request.form['register-username']
                email = request.form['register-email']
                password = request.form['register-password']
                user = User(username=username, email=email)
                user.set_password(password)
                db.session.add(user)
                try:
                    print("tryyyy")
                    db.session.commit()
                    login_user(user)
                except Exception as e:
                    db.session.rollback()
                    flash(f"An error occurred during registration: {str(e)}")
                    app.logger.error(f'Error during registration for username: {username}, error: {str(e)}')
                else:
                    flash('Congratulations, you are now a registered user!')
                    app.logger.debug(f'User {username} successfully registered')

    return render_template('register.html', login_form=login_form, registration_form=registration_form,comment_form=comment_form, comments=comments)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('base'))


@app.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    change_form = EditProfileForm()

    if 'change_name' in request.form:
        current_user.username = request.form['changed_username']
        db.session.commit()
        return redirect(url_for('account'))
    elif 'change_mail' in request.form:
        current_user.email = request.form['changed_email']
        db.session.commit()
        return redirect(url_for('account'))

    return render_template('account.html', title='acc', change_form=change_form)


@app.route('/indexBasket', methods=['GET', 'POST'])
@login_required
def indexBasket():
    return render_template('indexBasket.html', title='Basket')
