export default {
    required: value => !!value || "Obrigatório.",
    email: value => {
        // eslint-disable-next-line max-len
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || "E-mail inválido."
    },
    same: (firstValue, secondValue) => firstValue === secondValue || "Senhas diferentes.",
    number: value => {
        const pattern = /[0-9.,]/
        return pattern.test(value) || "Número inválido." 
    },
    maxValue: (firstValue, secondValue) => firstValue <= secondValue || "Valor menor que o mínimo."
}