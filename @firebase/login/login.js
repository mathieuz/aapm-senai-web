/* Importando variáveis necessárias do arquivo module. */
import { auth } from "../module.js"

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

//Função que realiza o login na plataforma.
document.getElementById("btnFazerLogin").addEventListener("click", () => {
    let email = document.getElementById("inputEmail").value
    let senha = document.getElementById("inputSenha").value

    const autenticacao = getAuth()
    signInWithEmailAndPassword(autenticacao, email, senha)
        .then((userCredential) => {
            alert("[SUCESSO] E-mail autenticado com sucesso.")
            window.location.href = "./painel.html"

        })
        .catch((error) => {
            alert("[ERRO] E-mail não corresponde dentro dos e-mails registrados.")
        });
})