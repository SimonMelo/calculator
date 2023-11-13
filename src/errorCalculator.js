export default {
    errors(error) {
        const value = error
        if (value === 'Não é uma expressão válida.' || value === 'undefined' || value === '') {
            return true
        }
        return false
    }
}