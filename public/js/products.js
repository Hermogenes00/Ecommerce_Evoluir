

    let buscar = document.getElementById('buscar')
    let btnBuscar = document.getElementById('btnBuscar')
    btnBuscar.addEventListener('click', () => {
        document.location.href = buscar.value.length > 0 ? buscar.value : 'all';
    })