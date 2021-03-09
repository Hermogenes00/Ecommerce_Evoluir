
function recordNewPassword(event) {

    event.preventDefault()

    let newPassword = event.target.querySelector('#newPassword')
    let confirmPassword = event.target.querySelector('#confirmPassword')
    let codSecurity = event.target.querySelector('#codSecurity')

    if (newPassword.value === confirmPassword.value) {
        axios.post('/client/recoverAccount/', {
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value,
            codSecurity: codSecurity.value
        }).then(response => {
            if (!response.data.err){
                showMessageAlert('Aviso', 'Senha alterada com sucesso!!! Realize o login com a sua nova senha')
            }else{
                showMessageAlert('Aviso', response.data.err)
            }
                
            
        }).catch(err => {
            showMessageAlert('Aviso', 'Ops! Ocorreu algo de errado ao tentar realizar esta operação.')
        })
    } else {
        showMessageAlert('Aviso', 'Senhas não conferem')
    }
}

function sendEmailByPassword(event) {
    event.preventDefault()

    let email = document.getElementById('email')

    if (email.value) {
        axios.post('/client/sendEmailByPassword', { email: email.value }).then(response => {
            if (!response.data.err) {
                showMessageAlert('Aviso', 'Link para redefinição de senha enviado para o email cadastrado, verifique sua caixa de entrada/spam')
            }
        }).catch(err => {
            console.dir(err)
        })
    } else {
        alert('Informe um email.')
    }
}
