import React from 'react'
import classes from './ActiveQuestion.css'
import AnswersList from './AnswerList/AnswerList'

const ActiveQuestion = props => (
    <div className={classes.ActiveQuestion}>
        <p className={classes.Question}>
            <span>
                <strong>2.</strong>&nbsp;
                {props.question}
            </span>
            <small>2 из 4</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuestion
