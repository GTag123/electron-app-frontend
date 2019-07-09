import React from 'react';
import registraion from 'components/js/registration';
import PropTypes from 'prop-types'


export class Reg extends React.Component {
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
        registraion(this.formRef) // registration
        
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

Reg.propTypes = {
    changeForm: PropTypes.func.isRequired
};
ErrorMessage.propTypes = {
    message: PropTypes.string,
}
