from app import app, db, oauth
import time
from app.forms import LoginForm, RegistrationForm,EditProfileForm,CommentForm,ResetPasswordRequestForm,ResetPasswordForm
from flask import jsonify, render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Comment,Good,Basket
from app.email import send_password_reset_email

@app.route('/', methods=['GET', 'POST'])
def none():
    return redirect('/base')


@app.route('/base', methods=['GET', 'POST'])
def base():

    login_form = LoginForm()
    registration_form = RegistrationForm()
    comment_form = CommentForm()
    reset_form = ResetPasswordRequestForm()
    comments = []
    comments = Comment.query.order_by(Comment.timestamp.desc()).all()
    goods = Good.query.all()
    if current_user.is_authenticated:
        goods_basket = Basket.query.filter_by(user_id=current_user.id).count()
    else:
        goods_basket = 0
    
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
        elif 'reset_password' in request.form:
            if reset_form.validate_on_submit():
                print("start reset")
                user = User.query.filter_by(email=request.form['reset-email']).first()
                if user:
                    send_password_reset_email(user)
                flash('Check your email for the instructions to reset your password')
                time.sleep(0)
            return redirect(url_for('base'))

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

    return render_template('register.html',goods=goods, login_form=login_form, registration_form=registration_form,comment_form=comment_form, comments=comments, goods_basket=goods_basket, reset_form=reset_form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('base'))

@app.route('/clear')
def clear():
    Basket.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()
    return redirect(url_for('indexBasket'))

@app.route('/clearItem/<int:basket_id>')
def clearItem(basket_id):
    print("delete items:", basket_id, "\n", Basket.query.filter_by(good_id=basket_id))
    Basket.query.filter_by(id=basket_id).delete()
    db.session.commit()
    return redirect(url_for('indexBasket'))

@app.route('/clearComment/<int:comment_id>')
def clearComment(comment_id):
    print("delete items:", comment_id)
    Comment.query.filter_by(id=comment_id).delete()
    db.session.commit()
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
    elif 'change_pass' in request.form:
        user = User.query.filter_by(email=current_user.email).first()
        if user:
            send_password_reset_email(user)
        return redirect(url_for('account'))
    return render_template('account.html', title='acc', change_form=change_form)


@app.route('/indexBasket', methods=['GET', 'POST'])
@login_required
def indexBasket():
    if request.method == 'POST':
        selected_goods = request.json.get('selectedItems') 
        for good_id, size in selected_goods.items():
            user_basket = Basket.query.filter_by(user_id=current_user.id, good_id=int(good_id)).first()

            if user_basket:
                user_basket.size = int(size)
            else:
                user_basket = Basket(user_id=current_user.id, good_id=int(good_id), size=int(size))
                db.session.add(user_basket)

        db.session.commit()

    goods_in_basket = Basket.query.filter_by(user_id=current_user.id).all()
    return render_template('indexBasket.html', title='Basket', goods_in_basket=goods_in_basket)

@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    print("we are here")
    user = User.verify_reset_password_token(token)
    if not user:
        print("second")
        return redirect(url_for('base'))
    form_resetpass = ResetPasswordForm()
    if 'reset_password' in request.form:
        if form_resetpass.validate_on_submit():
            print("third")
            user.set_password(request.form['Reset_pass_1'])
            db.session.commit()
            flash('Your password has been reset.')
            return redirect(url_for('base'))
        print("render")
    return render_template('reset_password.html', form_resetpass=form_resetpass)    


@app.route('/login')
def login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')
    token = google.authorize_access_token() 
    resp = google.get('userinfo')
    user_info = resp.json()
    username = user_info.get('name')
    useremail = user_info.get('email')
    password = "user authorized by google"
    user = User(username=username, email=useremail)
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

    return redirect('/')
