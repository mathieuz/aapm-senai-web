/* Script que torna visível ou não a caixa de input de senha. */
let estaLigado = false;

let mostrarSenha = document.getElementById("mostrarSenha")
let inputSenha = document.getElementById("inputSenha")

mostrarSenha.addEventListener("click", () => {
    if (estaLigado === false){
        mostrarSenha.src = "../img/icones/mostrarSenhaOn.png"
        inputSenha.type = "text"
        inputSenha.title = "Mostrar Senha"

        estaLigado = true

    } else if (estaLigado === true) {
        mostrarSenha.src = "../img/icones/mostrarSenhaOff.png"
        inputSenha.type = "password"
        inputSenha.title = "Ocultar Senha"

        estaLigado = false
    }
})