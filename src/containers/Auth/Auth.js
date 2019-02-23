import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl, validate, validateForm } from '../../form/formFramework';
import { AUTH } from '../../store/actions/actionTypes';

export class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: createControl({
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
      }, { required: true, email: true }),

      password: createControl({
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
      }, { required: true, minLength: 6 }),
    },
  };

  submitHandler = event => event.preventDefault();

  loginHandler = () => {
    const { auth } = this.props;
    const { formControls } = this.state;
    const { email, password } = formControls;
    auth(email.value, password.value, true);
  }

  registerHandler = () => {
    const { auth } = this.props;
    const { formControls } = this.state;
    const { email, password } = formControls;
    auth(email.value, password.value, false);
  }


  onChangeHandler = (value, controlName) => {
    const { formControls } = this.state;
    const formControlss = { ...formControls };
    const control = { ...formControlss[controlName] };
    control.value = value;
    control.touched = true;
    control.valid = validate(value, control.validation);
    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  }

  render() {
    const { isFormValid, formControls } = this.state;
    const render = Object.keys(formControls).map((controlName) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + 1}
          type={control.type}
          label={control.label}
          value={control.value}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={control.validation}
          onChange={event => this.onChangeHandler(event.target.value, controlName)}
        />
      );
    });

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {render}
            <Button type="success" onClick={this.loginHandler} disabled={!isFormValid}>Войти</Button>
            <Button type="primary" onClick={this.registerHandler} disabled={!isFormValid}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}

Auth.propTypes = { auth: PropTypes.func.isRequired };

export const mapDispatchToProps = dispatch => (
  { auth: (email, password, isLogin) => dispatch({ type: AUTH, email, password, isLogin }) }
);

export default connect(null, mapDispatchToProps)(Auth);
