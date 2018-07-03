module.exports = {
  env: {
    'browser': true,
    'jest': true
  },
  extends: [
    'standard',
    'standard-react'
  ],
  parser: 'babel-eslint',
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
    'react/jsx-max-props-per-line': 1,
    'react/jsx-sort-props': 1,
    'react/no-did-update-set-state': 0,
    'sort-keys': 'warn',
    'sort-vars': 'warn'
  }
}
