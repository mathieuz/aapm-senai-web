/* Script que torna visível ou não a caixa de input de senha. */
let estaLigado = false;

let mostrarSenha = document.getElementById("mostrarSenha")
let inputSenha = document.getElementById("inputSenha")

mostrarSenha.addEventListener("click", () => {
    if (estaLigado === false){
        mostrarSenha.src = "../img/icones/mostrarSenhaOn.png"
        mostrarSenha.title = "Ocultar Senha"
        inputSenha.type = "text"

        estaLigado = true

    } else if (estaLigado === true) {
        mostrarSenha.src = "../img/icones/mostrarSenhaOff.png"
        mostrarSenha.title = "Mostrar Senha"
        inputSenha.type = "password"

        estaLigado = false
    }
})

/* Script que atualiza o ano de copyright do footer. */
let anoAtual = new Date().getFullYear()
document.getElementById("spanFooterCopyrightSenai").innerHTML = `SENAI Manuel Garcia Filho &#x1427; Copyright ${anoAtual} &copy; Todos os direitos reservados.`