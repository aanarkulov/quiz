import React, { Component } from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button';

class QuizCreator extends Component {

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = () => {

    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        <input type="text" />
                        <hr />
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />

                        <select></select>

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