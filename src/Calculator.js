import { format, evaluate } from 'mathjs'
import DOMPurify from 'dompurify'

export default {
  //Função responsável pelo cálculo das expressões
  calculateExpression(expression) {
    try {
      //Máscara para validar se é uma expressão
      const isValidExpression = /^[\d+\-*/().\s]|(log|sin|cos|tan|sqrt)+\(/.test(expression)

      if (!isValidExpression) {
        throw new Error('Não é uma expressão válida.')
      }

      //Variável aplicando a lib DOMPurify para retirar impurezas de códigos JS no input
      const sanitizedExpression = DOMPurify.sanitize(expression)

      const result = evaluate(sanitizedExpression)

      let formattedValue

      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        if (!Number.isInteger(result)) {
          formattedValue = format(result, { precision: 3 })
        } else {
          formattedValue = result
        }

        //Variável aplicando a lib DOMPurify para retirar impurezas de códigos JS no input
        const sanitizedResult = DOMPurify.sanitize(formattedValue)

        return sanitizedResult
        //Tratamento dos erros
      } else {
        throw new Error('Não é uma expressão válida.')
      }
    } catch (error) {
      return 'Não é uma expressão válida.'
    }
  }
}
