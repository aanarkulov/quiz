import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        return await axios.get('/quizes.json')
            .then(response => {
                const quizes = []

                Object.keys(response.data).forEach((key, index) => {
                    quizes.push({
                        id: key,
                        name: `Тест № ${index + 1}`
                    })
                })
                dispatch(fetchQuizesSuccess(quizes))
            })
            .catch(error => {
                dispatch(fetchQuizesError(error))
            })
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        return await axios.get(`/quizes/${quizId}.json`)
            .then(response => {
                dispatch(fetchQuizSuccess(response.data))
            }).catch(error => {
                dispatch(fetchQuizesError(error))
            })
    }
}

export function quizAnswerClick(answerId) {
    return async (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results


        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({ [answerId]: 'success' }, results))

            const timeout = setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishedQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({ [answerId]: 'error' }, results))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: error
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_START,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishedQuiz() {
    return {
        type: QUIZ_FINISHED
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}