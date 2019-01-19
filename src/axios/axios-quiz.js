import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-2019a.firebaseio.com/'
})