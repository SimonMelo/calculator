import { format, evaluate } from 'mathjs'
import DOMPurify from 'dompurify'

export default {
  calculateExpression(expression) {
    try {
      
      const isValidExpression = /^[\d+\-*/().\s]|(log|sin|cos|tan)+\(/.test(expression)

      if (!isValidExpression) {
        throw new Error('Não é uma expressão válida.')
      }

      const sanitizedExpression = DOMPurify.sanitize(expression)

      const result = evaluate(sanitizedExpression)

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
}
