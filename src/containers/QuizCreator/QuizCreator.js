import React, { Component } from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControl } from '../../form/formFramework'
import Auxillary from '../../hoc/Auxillary/Auxillary'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {
    state = {
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = () => {

    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxillary key={controlName + 1} >
                    <Input
                        label={control.label}
                        value={control.value}
                        errorMessage={control.errorMessage}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={control.validation}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />

                    {index === 0 ? <hr /> : null}
                </Auxillary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >Добавить вопрос</Button>
                        <Button
                            type="success"
                            onClick={this.addQuizHandler}
                        >Создать тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator  