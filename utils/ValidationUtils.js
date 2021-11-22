const ValidationUtils = module.exports = {

    validCpf: function validCpf(cpf) {
        let sum = 0
        let rest
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
        }
        rest = (sum * 10) % 11
        if ((rest == 10) || (rest == 11))  rest = 0
        if (rest != parseInt(cpf.substring(9, 10))) return false
        sum = 0
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
        }
        rest = (sum * 10) % 11
        if ((rest == 10) || (rest == 11))  rest = 0
        if (rest != parseInt(cpf.substring(10, 11))) return false
        return true
    },

    validCnpj: function(cnpj) {
        let size = cnpj.length - 2
        let nums = cnpj.substring(0, size)
        const digits = cnpj.substring(size)
        let sum = 0
        let pos = size - 7
        for (let i = size; i >= 1; i--) {
            sum += nums.charAt(size - i) * pos--
            if (pos < 2) pos = 9
        }
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11
        if (result != digits.charAt(0)) return false
        size = size + 1
        nums = cnpj.substring(0, size)
        sum = 0
        pos = size - 7
        for (let i = size; i >= 1; i--) {
            sum += nums.charAt(size - i) * pos--
            if (pos < 2) pos = 9
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11
        if (result != digits.charAt(1)) return false
        return true
    },

    validDocument: function(documentString) {
        if (!documentString) {
            return {type: "desconhecido", valid: false}
        }
        
        const treatedValue = documentString.replace(/\D/g, "")

        if (treatedValue.length == 11) {
            return {type: "cpf", valid: ValidationUtils.validCpf(treatedValue)}
        } else if (treatedValue.length == 14) {
            return {type: "cnpj", valid: ValidationUtils.validCnpj(treatedValue)}
        }
            
        return {type: "desconhecido", valid: false}
    }
    
}