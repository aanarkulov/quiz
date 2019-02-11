import axios from 'axios'
import { baseURL } from '../settings'

export default axios.create({
    baseURL
})