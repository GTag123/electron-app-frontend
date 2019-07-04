/* eslint-disable react/prop-types */
import React from 'react';

export default class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSamePass: true
        }
        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    formValidation() {
        let pass1 = this.formRef.current.elements['password'].value,
            pass2 = this.formRef.current.elements['password-repeat'].value;
        if (pass1 === pass2) {
            this.setState({ isSamePass: true });
            return true;
        } else {
            this.setState({ isSamePass: false });
            return false;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.formValidation()) return;
        console.log('submit reg2!')

        let form = new FormData(this.formRef.current);
        form.delete('password-repeat');
        form.delete('isRemember');

        fetch('http://127.0.0.1:8000/user/create/', {
                method: 'POST',
                body: form
            })
            .then( response => {
                response.json().then( json => {
                    new Promise((function(resolve, reject) {
                        if (response.status === 201) {
                            notificate('Успешная регистрация!', this.props.notifWrap, 'success');
                            resolve()
                        } else {
                            reject()
                        }
                    }).bind(this)) // говнокодим как можем!
                    .then( () => {
                        let loginForm = new FormData();
                        loginForm.append('login', form.get('login'));
                        loginForm.append('password', form.get('password'));
                        this.props.login(loginForm); // авторизация после регистрации
                    })
                    .catch( () => { // ошибка при регистрации
                        if (json.username || json.errors !== 0) {
                            notificate('Пользователь с таким ником уже существует!', this.props.notifWrap, 'warn');
                            this.formRef.current.elements['login'].value = '';
                        } else {
                            console.log(json);
                            notificate('Неизвестная ошибка! Проверьте корректность введённых данных!', this.props.notifWrap, 'error');
                        }
                    });
                });
            })
            .catch(() => notificate('Ошибка сервера при регистрации', this.props.notifWrap, 'error'));
    }

    render() {
        return (
            <form name='reg-form' onSubmit={this.handleSubmit} ref={this.formRef}>
                <div className='auth-text'>Регистрация</div>
                <div className='form-group text-center'>
                    <label htmlFor="email">Ваш e-mail:</label>
                    <div className="input-wrap">
                        <input type="email" name="email" placeholder='Введите эл. почту' className='form-control'
                            id='email' autoFocus required />
                    </div>
                </div>
                <div className='form-group text-center'>
                    <label htmlFor="login">Придумайте логин:</label>
                    <div className="input-wrap">
                        <input type="text" name="login" placeholder='Введите логин'
                            className='form-control' id='login' required minLength='4' />
                    </div>
                </div>
                <div className='form-group text-center'>
                    <label htmlFor="password">Придумайте пароль:</label>
                    <div className="input-wrap">
                        <input type="password" name="password" placeholder='Введите пароль' className='form-control'
                            id='password' required minLength='6' />
                    </div>
                </div>
                <div className='form-group text-center'>
                    <label htmlFor="password-repeat">Повторите пароль:</label>
                    <div className="input-wrap">
                        <input type="password" name="password-repeat" placeholder='Повторите пароль'
                            className='form-control' id='password-repeat' required />
                        {!this.state.isSamePass && <ErrorMessage message='Пароли не совпадают' />}
                    </div>
                </div>
                <div className="form-check text-center">
                    <input type="checkbox" className="form-check-input" name='isRemember' id="isRemember" />
                    <label className="form-check-label" htmlFor="isRemember">Запомнить меня</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-block btn-round mt-4">Зарегистрироваться</button>
                </div>
                <div className="auth-text-bottom" >Уже зарегистрированы? <a onClick={this.props.changeForm}
                    href="#">Авторизоваться</a></div>
            </form>
        );
    }
}

function ErrorMessage(props) {
    return (
        <div className="input-message">
            <div className="input-arrow"></div>
            <div className="input-message-body">
                {props.message}
            </div>
        </div>
    );
}