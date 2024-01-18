import { format, evaluate } from 'mathjs'
import DOMPurify from 'dompurify'

// Função para remover impurezas da expressão usando DOMPurify
const sanitizeExpression = (expression) => DOMPurify.sanitize(expression)

// Função para validar se a expressão é uma expressão matemática válida
const isValidExpression = (expression) => /^[\d+\-*/().\s]|(log|sin|cos|tan|sqrt)+\(/.test(expression)

// Função para tratar casos de divisão por zero
const handleZeroDivision = (expression) => {
  if (/\/\s*0/.test(expression)) {

    throw new Error('Não é possível dividir por zero.')

  }
}

// Função principal para calcular a expressão
const calculateExpression = (expression) => {

  try {

    // Verifica se a expressão é válida
    if (!isValidExpression(expression)) {

      throw new Error('Não é uma expressão válida.')

    }

    // Trata casos de divisão por zero
    handleZeroDivision(expression)

    // Remove impurezas da expressão
    const sanitizedExpression = sanitizeExpression(expression)

    // Calcula a expressão
    const result = evaluate(sanitizedExpression)

    // Verifica se o resultado é um número válido
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {

      // Formata o resultado com precisão de 3 casas decimais
      const formattedValue = result === 0 ? 0 : format(result, { precision: 3 })

      // Remove impurezas do resultado formatado
      return sanitizeExpression(formattedValue)

    } else {

      throw new Error('Não é uma expressão válida.')

    }

  } catch (error) {

    // Verifica o tipo de erro e retorna a mensagem apropriada
    if (error.message === 'Não é possível dividir por zero.') {

      return 'Não é possível dividir por zero.'

    }
    return 'Não é uma expressão válida.'
  }
}

export default {
  calculateExpression,
}
