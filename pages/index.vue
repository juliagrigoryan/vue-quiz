<template lang="pug">
  main.main
    .main__container
      h1.main__title Quiz
      QuizMain
</template>

<style lang="scss">
.main {
  &__container {
    margin: 0 auto;
    max-width: 1280px;
    padding: 50px;

    @include media-max(767) {
      padding: 50px 20px;
    }
  }

  &__title {
    color: $color-2--1;
    font-size: 7rem;
    font-weight: 700;
    margin-bottom: 50px;
    text-align: center;
    text-shadow: 5px 5px $color-black;

    @include media-max(767) {
      font-size: 6rem;
    }
  }
}
</style>
