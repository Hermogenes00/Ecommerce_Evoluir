let CONSTANTS = {
    PORTA: 8090,
    STATUS_PEDIDO: {
        CANCELADO: 'CANCELADO',
        PAGAMENTO_REALIZADO: 'PAGAMENTO_REALIZADO',
        CARRINHO: 'CARRINHO',
        AGUARDANDO_PAGAMENTO: 'AGUARDANDO PAGAMENTO'
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
    RETIRA_BASE:'RETIRA_BASE'

}

module.exports = CONSTANTS;