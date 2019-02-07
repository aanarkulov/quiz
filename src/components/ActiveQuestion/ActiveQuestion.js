import React from 'react'
import classes from './ActiveQuestion.css'
import AnswerList from './AnswerList/AnswerList'

const ActiveQuestion = props => (
    <div className={classes.ActiveQuestion}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>

        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
);

export default ActiveQuestion
