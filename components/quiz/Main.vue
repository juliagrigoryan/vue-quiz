<template lang="pug">
  .quiz(:class="{ 'has-background': questions.length }")
    template(v-if="categories.length && !selectedCategory")
      h2.quiz__title Choose a category:
      ul.quiz__list
        li.quiz__item(v-for="category in categories" :key="category.label")
          button.quiz__button(@click="selectedCategory = category.value") {{ category.label }}

    template(v-else-if="selectedCategory && !questions.length")
      h2.quiz__title Choose difficulty level:
      - const levels = ["Easy", "Medium", "Hard"]
      ul.quiz__list
        each level in levels
          li.quiz__item
            button.quiz__button(@click="getQuestions")= level

    template(v-else-if="questions.length")
      p.quiz__text Currently at question {{ currentQuestion + 1 }} of {{ questions.length }}
      h2.quiz__question {{ questions[currentQuestion].question }}
      ul.quiz__list
        li.quiz__item.is-answer(v-for="answer in answers" :key="questions[currentQuestion].id + answer")
          button.quiz__button.is-answer(@click="checkAnswer" :disabled="isAnswered") {{ answer }}

</template>

<script>
import service from '../../services/quizService'
import ModalMain from '../modal/Main'

export default {
  data() {
    return {
      selectedCategory: '',
      categories: [],
      questions: [],
      answers: [],
      currentQuestion: 0,
      correctAnswer: '',
      score: 0,
      isAnswered: false
    }
  },
  async mounted() {
    const response = await service.getCategories()

    Object.entries(response).forEach(([key, value]) => {
      this.categories.push({
        label: key,
        value
      })
    })
  },

  methods: {
    async getQuestions(e) {
      const level = e.target.textContent.toLowerCase()
      const params = `categories=${this.selectedCategory}&difficulty=${level}`
      this.questions = await service.getQuestions(params)
      this.getCurrentQuestion()
    },

    getCurrentQuestion() {
      this.answers = []
      const { incorrectAnswers, correctAnswer } = this.questions[this.currentQuestion]
      this.answers.push(...incorrectAnswers, correctAnswer)
      this.answers.sort()
      this.correctAnswer = correctAnswer
    },

    checkAnswer(e) {
      this.isAnswered = true

      if (e.target.textContent === this.correctAnswer) {
        e.target.classList.add('is-correct')
        this.score++
      } else {
        e.target.classList.add('is-wrong')
      }

      setTimeout(() => {
        this.showAnswer()
      }, 1000)
    },

    showAnswer() {
      const buttons = [...document.querySelectorAll('button.is-answer')]

      buttons.forEach((button) => {
        if (button.innerText === this.correctAnswer) {
          button.classList.add('is-animated')
        }
      })

      setTimeout(() => {
        this.getNextQuestion()
      }, 2000)
    },

    getNextQuestion() {
      this.currentQuestion++

      if (this.currentQuestion !== this.questions.length) {
        this.isAnswered = false
        this.getCurrentQuestion()
      } else {
        this.currentQuestion = this.questions.length - 1
        this.showModal()
      }
    },

    showModal() {
      this.$modal.show(ModalMain, {
        score: this.score,
        action: this.resetQuiz
      }, {
        height: 'auto',
        adaptive: true,
        width: 500,
        scrollable: true,
        pivotY: 0.50
      })
    },

    resetQuiz() {
      this.selectedCategory = ''
      this.questions = []
      this.currentQuestion = 0
      this.isAnswered = false
      this.score = 0
    }
  }
}

</script>

<style lang="scss">
.quiz {
  &.has-background {
    background: rgba($color-white, 50%);
    border-radius: 6px;
    padding: 30px;
  }

  &__title {
    color: $color-2--1;
    font-size: 5rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    text-shadow: 5px 5px $color-black;

    @include media-max(767) {
      font-size: 4rem;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    list-style: none;

    @include media-max(767) {
      gap: 20px;
    }
  }

  &__item {
    &.is-answer {
      width: calc(50% - 15px);

      @include media-max(767) {
        width: 100%;
      }
    }
  }

  &__button {
    @include trs;
    background-color: rgba($color-white, 50%);
    border-radius: 6px;
    border: 5px solid $color-2--1;
    color: $color-black;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.8em 1.2em;

    @include on-event {
      background-color: $color-2--1;
    }

    &.is-answer {
      @include size(100%);
    }

    &.is-correct {
      background-color: $color-green;
      border-color: $color-green;
    }

    &.is-wrong {
      background-color: $color-red;
      border-color: $color-red;
    }

    &.is-animated {
      animation: flash-button;
      animation-duration: 0.7s;
      animation-delay: 0.2s;
      animation-iteration-count: 3;
      background-color: $color-green;
      border-color: $color-green;
    }

    &:disabled {
      pointer-events: none;
    }
  }

  &__question {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;

    @include media-max(767) {
      font-size: 2.5rem;
    }
  }

  &__text {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: right;
  }
}
</style>
