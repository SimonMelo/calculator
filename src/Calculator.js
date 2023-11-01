import { evaluate, format } from 'mathjs'

export default {
  calculateExpression(expression) {
    try {
      const result = evaluate(expression)
      let formatedValue = format(result, { precision: 3 })
      return formatedValue
    } catch (error) {
      if (error)
      return 'Não é uma expressão válida.';
    }
  }
};