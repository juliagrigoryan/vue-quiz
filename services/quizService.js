import axios from 'axios'

export default {
  async getCategories() {
    return (await axios.get('https://the-trivia-api.com/api/categories')).data
  },

  async getQuestions(param) {
    return (await axios.get(`https://the-trivia-api.com/api/questions?limit=5&${param}`)).data
  }
}
