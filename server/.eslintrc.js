module.exports = {
  env: {
    'browser': true
  },
  extends: ['standard'],
  rules: {
    'max-len': ['error', 120],
    'newline-after-var': [2, 'always'],
    'newline-before-return': 'error',
    'no-console': 1,
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [ 'error', {
      blankLine: 'always',
      prev: '*',
      next: 'if'
    }, {
      blankLine: 'any',
      prev: 'block',
      next: 'if'
    }, {
      blankLine: 'always',
      prev: 'if',
      next: '*'
    }, {
      blankLine: 'any',
      prev: 'if',
      next: 'block'
    }, {
      blankLine: 'always',
      prev: 'export',
      next: '*'
    }],
    'sort-keys': 'warn',
    'sort-vars': 'warn'
  }
}
