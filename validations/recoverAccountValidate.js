const joi = require('joi')

let schema = joi.object({
newPassword:joi.string().min(5).message('Informe uma senha válida (obs: tamanho mínimo de 5 caracteres)').required(),
confirmPassword:joi.string().min(5).message('Informe uma senha válida (obs: tamanho mínimo de 5 caracteres)').required(),
})

module.exports = schema;