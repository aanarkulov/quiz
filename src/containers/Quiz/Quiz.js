import React, { Component } from 'react'
import classes from './Quiz.css'
import ActiveQuestion from '../../components/ActiveQuestion/ActiveQuestion'

class Quiz extends Component {
    state = {
        quiz: [
            {
                answers: [
                    { text: 'Вариант 1' },
                    { text: 'Вариант 2' },
                    { text: 'Вариант 3' },
                    { text: 'Вариант 4' },
                ]
            }
        ]
    }
    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuestion
                        answers={this.state.quiz[0].answers}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz