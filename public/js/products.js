

    let buscar = document.getElementById('buscar')
    let btnBuscar = document.getElementById('btnBuscar')
    btnBuscar.addEventListener('click', () => {
        document.location.href = buscar.value.length > 0 ? buscar.value : 'all';
    })

    async function enviarGabarito(event, idProduct) {

        event.preventDefault()

        const { value: file } = await Swal.fire({
            title: 'Selecione o seu arquivo (.rar)',
            html: `<form id="formGabarito" class="form form-inline" action="/admin/product/upload/${idProduct}"
                                method="POST" enctype="multipart/form-data">
                                <input type="file" name="file" accept=".rar" id="file">
                                <input type="submit" class="btn btn-primary btn-sm" value="Enviar Gabarito">
                            </form>`,
            inputAttributes: {
                'accept': '.pdf',
                'aria-label': 'Selecione o seu arquivo pdf'
            }
        })
    }

