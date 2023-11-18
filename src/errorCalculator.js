//Arquivo JS responsável pela validação dos erros dos resultados e evita adicionar ao histórico

export default {
    errors(error) {
        const value = error
        if (value === 'Não é uma expressão válida.' || value === 'undefined' || value === '')
            return true
    }
}