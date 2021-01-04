
let CONSTANTS = {
    PORTA: 8090,
    STATUS_PEDIDO: {
        CANCELADO: 'CANCELADO',
        ANALISE: 'ANALISE',
        PAGAMENTO_REALIZADO: 'PAGAMENTO_REALIZADO',
        CARRINHO: 'CARRINHO',
        AGUARDANDO_PAGAMENTO: 'AGUARDANDO PAGAMENTO'
    },
    STATUS_PRODUCAO:{
        AGUARDANDO_PRODUCAO:'AGUARDANDO_PRODUCAO',
        PRODUZINDO:'PRODUZINDO',
        ACABAMENTO:'ACABAMENTO',
        EXPEDICAO:'EXPEDICAO'
    },
    CODIGO_SERVICO_CORREIOS: {
        SEDEX_VISTA: '04014',
        SEDEX_VISTA_PGTO_ENTREGA: '04065',
        PAC_VISTA: '04510',
        PAC_VISTA_PGTO_ENTREGA: '04707',
        SEDEX_12: '40169',
        SEDEX_10: '40215',
        SEDEX_HOJE_VAREJO: '40290'
    },
    METODO_ENVIO: {
        PAC_VISTA: 'PAC_VISTA',
        SEDEX_VISTA: 'SEDEX_VISTA',
        RETIRA_BASE: 'RETIRA_BASE',
        BALCAO: 'BALCAO'
    },
    STATUS_PAGAMENTO: {
        RECEBIDO:'RECEBIDO',
        RECUSADO:'RECUSADO',
        ANALISE_COMPROVANTE: 'ANALISE_COMPROVANTE'
    }


}

module.exports = CONSTANTS;