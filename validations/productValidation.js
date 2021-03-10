const joi = require('joi')

let schema = joi.object({
    nome: joi.string().min(5).message('Campo nome deve conter no mínimo 5 caracteres').required(),
    descricao: joi.string().min(20).message('Campo descricao deve conter no mínimo 20 caracteres').required(),
    tamFinalAltura: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Tamanho Final Altura (obs: valor mínimo = 0,1)').required(),
    tamFinalLargura: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Tamanho Final Largura (obs: valor mínimo = 0,1)').required(),
    vlrProduto: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Valor Produto (obs: valor mínimo = 0,1)').required(),
    gramatura: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Gramatura (obs: valor mínimo = 0,1)').required(),
    peso: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Peso (obs: valor mínimo = 1)').required(),
    tamSangriaAltura: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Tamanho Sangria Altura (obs: valor mínimo = 0.1)').required(),
    tamSangriaLargura: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Tamanho Sangria Largura (obs: valor mínimo = 0.1)').required(),
    qtd: joi.number().min(1).max(10000).message('Informe um valor válido para o campo Quantidade (obs: valor mínimo = 1 máximo = 10000)').required(),
    propriedadeDivisao: joi.number().min(1).message('Informe um valor válido para o campo Propriedade de Divisão (obs: valor mínimo = 1)').required(),
    previsaoProducao: joi.number().precision(2).min(1).message('Informe um valor válido para o campo Previsão de Produção (obs: valor mínimo = 1)').required(),
    imagem: joi.string().dataUri().message('Selecione uma imagem para o produto').required(),
    categoriaId: joi.number().min(1).empty().integer().min(1).message('Informe uma categoria para o produto (obs: valor mínimo = 1)').positive().required(),
    subcategoriaId: joi.number().min(1).integer().min(1).message('Informe uma SubCategoria para o produto').positive().required(),
    und: joi.string().required(),
    desconto: joi.number().precision(2).min(0.1).message('Informe um valor válido para o campo Valor Produto (obs: valor mínimo = 0,1)').required(),
    material: joi.string().min(5).message('Campo material deve conter no mínimo 5 caracteres').required(),

})


module.exports = schema;