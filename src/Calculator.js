import { format } from 'mathjs'
import DOMPurify from 'dompurify'

export default {
  calculateExpression(expression) {
    try {
      
      const isValidExpression = /^[0-9+\-*/().\s]+$/.test(expression)

      if (!isValidExpression) {
        throw new Error('Não é uma expressão válida.')
      }

      const sanitizedExpression = DOMPurify.sanitize(expression)

      const dynamicFunction = new Function(`return (${sanitizedExpression})`)

      const result = dynamicFunction()

      let formattedValue

      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        if (!Number.isInteger(result)) {
          formattedValue = format(result, { precision: 3 })
        } else {
          formattedValue = result
        }

        const sanitizedResult = DOMPurify.sanitize(formattedValue)

        return sanitizedResult
      } else {
        throw new Error('Não é uma expressão válida.')
      }
    } catch (error) {
      return 'Não é uma expressão válida.'
    }
  }
};
