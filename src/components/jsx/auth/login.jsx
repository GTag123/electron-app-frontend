import React from 'react';
import login from 'components/js/login';
import PropTypes from 'prop-types'


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        login(new FormData(this.formRef.current));
    }
    render() {
        return (
            <form name='login-form' onSubmit={this.handleSubmit} ref={this.formRef}>
                <div className='auth-text'>Авторизация</div>
                <div className='form-group text-center'>
                    <label htmlFor="login">Логин:</label>
                    <input type="text" name="login" placeholder='Введите логин' className='form-control'
                        id='login' autoFocus required />
                </div>
                <div className='form-group text-center'>
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" name="password" placeholder='Введите пароль' className='form-control'
                        id='password' required />
                </div>
                <div className="form-check text-center">
                    <input type="checkbox" className="form-check-input" name='isRemember' id="isRemember" />
                    <label className="form-check-label" htmlFor="isRemember">Запомнить меня</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-block btn-round mt-4">Авторизоваться</button>
                </div>
                <div className="auth-text-bottom" >Нет аккаунта? <a onClick={this.props.changeForm} href="#">Зарегистрироваться</a></div>
            </form>
        );
    }
}

Login.propTypes = {
    changeForm: PropTypes.func.isRequired
};