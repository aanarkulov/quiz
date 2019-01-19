import React, { Component } from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../form/formFramework'
import axios from 'axios'

const API_KEY = 'AIzaSyAOGqKcfPCu-e3zBlMIbYvpBxyHvv2RzNA'

class Auth extends Component {
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
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`
        try {
            const response = await axios.post(url, authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
        try {
            const response = await axios.post(url, authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = value
        control.touched = true
        control.valid = validate(value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
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
            )
        })

    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}> Войти</Button>
                        <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth  