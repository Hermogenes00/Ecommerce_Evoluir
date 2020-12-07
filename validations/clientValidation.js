const joi = require('joi')

let schema = joi.object({
nome: joi.string().min(3).message('Informe um nome válido (obs: tamanho mínimo de 3 caracteres)').required(),
cnpjCpf:joi.string().min(11).message('Informe um cpf/cnpj válido (obs: tamanho mínimo de 11 caracteres)').required(),
email:joi.string().email().message('Informe um email válido').required(),
password:joi.string().min(3).message('Informe uma senha válida (obs: tamanho mínimo de 3 caracteres)').required(),
tel:joi.string().min(11).message('Informe um telefone válido (obs: tamanho mínimo de 11 caracteres)').required(),
cel1:joi.string().min(11).message('Cel1: Informe um celular válido (obs: tamanho mínimo de 11 caracteres)').required(),
cel2:joi.string().min(11).message('Cel2: Informe um celular válido (obs: tamanho mínimo de 11 caracteres)').required(),
cep:joi.string().min(8).message('Informe um cep válido (obs: tamanho mínimo de 8 caracteres)').required(),
numero: joi.string().min(1).message('Informe um número válido ou SN').required(),
})

module.exports = schema;

