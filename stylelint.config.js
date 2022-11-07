module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  plugins: [
    'stylelint-scss'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'max-nesting-depth': 6,
    'at-rule-no-unknown': null,
    'custom-property-no-missing-var-function': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'no-eol-whitespace': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'declaration-colon-newline-after': null,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['class', 'attribute']
      }
    ],
    'selector-max-compound-selectors': 10,
    'max-line-length': 200,
    'scss/at-mixin-pattern': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/no-global-function-names': null,
    'color-function-notation': null,
    'selector-class-pattern': null
  },
  ignoreFiles: [
    '**/*.js'
  ]
}
