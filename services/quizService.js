// import axios from 'axios'
import { useFetch } from './index'

export default {
  getCategories() {
    return useFetch('https://the-trivia-api.com/api/categories')
  },

  async getQuestions(param) {
    return (await useFetch(`https://the-trivia-api.com/api/questions?limit=5&${param}`))
  }
}
