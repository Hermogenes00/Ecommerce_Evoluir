

var ctxCarrinho = document.getElementById('chartCarrinho').getContext('2d');
    var chartCarrinho = new Chart(ctxCarrinho, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Carrinho',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 500, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });

    var ctxPedido = document.getElementById('chartPedido').getContext('2d');
    var chartPedido = new Chart(ctxPedido, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Pedido',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 500, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });


    var ctxCancelado = document.getElementById('chartCancelado').getContext('2d');
    var chartCancelado = new Chart(ctxCancelado, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Cancelado',
                backgroundColor: 'rgb(0,0,255)',
                borderColor: 'rgb(255, 500, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });


    var ctxCancelado2 = document.getElementById('chartCancelado2').getContext('2d');
    var chartCancelado = new Chart(ctxCancelado2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Cancelado 2',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 500, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });