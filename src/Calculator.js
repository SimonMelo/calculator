import { format, evaluate } from 'mathjs'
import DOMPurify from 'dompurify'

export default {
  // Função responsável pelo cálculo das expressões
  calculateExpression(expression) {
    try {
      // Máscara para validar se é uma expressão
      const isValidExpression = /^[\d+\-*/().\s]|(log|sin|cos|tan|sqrt)+\(/.test(expression)

      if (!isValidExpression) {
        throw new Error('Não é uma expressão válida.')
      }

      // Variável aplicando a lib DOMPurify para retirar impurezas de códigos JS no input
      const sanitizedExpression = DOMPurify.sanitize(expression)

      // Adiciona verificação para divisão por zero antes de chamar evaluate
      if (/\/\s*0/.test(sanitizedExpression)) {
        throw new Error('Não é possível dividir por zero')
      }

      const result = evaluate(sanitizedExpression)

      let formattedValue

      // Verifica se result é do tipo "number" e faz a comparação
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        // Adiciona verificação para tratar resultado zero
        formattedValue = result === 0 ? 0 : format(result, { precision: 3 });

        // Variável aplicando a lib DOMPurify para retirar impurezas de códigos JS no input
        const sanitizedResult = DOMPurify.sanitize(formattedValue)

        return sanitizedResult
      } else {
        throw new Error('Não é uma expressão válida.')
      }
    } catch (error) {
      // Adiciona lógica para verificar divisão por zero
      if (error.message === 'Não é possível dividir por zero') {
        return 'Não é possível dividir por zero'
      }
      return 'Não é uma expressão válida.'
    }
  }
}
