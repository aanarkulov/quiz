import React from 'react'
import classes from './ActiveQuestion.css'

const ActiveQuestion = props => (
    <div className={classes.ActiveQuestion}>
        <p className={classes.Question}>
            <span>
                <strong>2.</strong>&nbsp;
                Как дела?
            </span>
            <small>2 из 4</small>
        </p>

        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
);

export default ActiveQuestion
