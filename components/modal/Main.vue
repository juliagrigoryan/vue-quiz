<template lang="pug">
  .modal
    h2.modal__title Congratulations! <br> You've completed your Quiz!
    p.modal__result You answered {{ score }} out of 5 questions.
    .modal__actions
      button.modal__button(@click='resetQuiz') Play again
      button.modal__button(@click='$emit("close")') Close
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      require: true,
      default: 0
    },
    action: {
      type: Function,
      default: () => null
    }
  },
  methods: {
    resetQuiz() {
      this.action()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  padding: 30px;
  text-align: center;

  &__title {
    color: $color-green;
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  &__result {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  &__button {
    @include trs;
    background-color: $color-2--1;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 700;
    margin: 5px;
    padding: 0.6em 1.2em;

    @include on-event {
      background-color: $color-1--1;
      color: $color-white;
    }
  }
}
</style>
