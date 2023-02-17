// admin@senai.sp.gov.br - admin123
// aluno@teste.com - aluno123

/* Configuração de conexão com o Firebase e a aplicação. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, doc, collection, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

/* Connfirguração de conexão entre a aplicação e o Firebase. */
const firebaseConfig = {
    apiKey: "AIzaSyDM0ahJj0alvS4TAXQbdhXs5GaTbvKs2Dg",
    authDomain: "senai-tcc-aapm.firebaseapp.com",
    projectId: "senai-tcc-aapm",
    storageBucket: "senai-tcc-aapm.appspot.com",
    messagingSenderId: "522581165702",
    appId: "1:522581165702:web:b891574b76e52a4272b307",
    measurementId: "G-GMJB0HWNLP"
};

/* A constante 'app' tem o método que inicializa a conexão do Firebase, além de ser utilizado como parâmetro de inicialização de módulos de conexão do Firebase. */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

/* Todos os event-listeners e e suas funções. */
document.body.querySelector("#btnFazerLogin").addEventListener("click", fazerLogin)

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/* Funções respectivas de cada event-listener. */

    /* Função de login na plataforma. */
    function fazerLogin(){

        let email = document.getElementById("inputEmail").value
        let senha = document.getElementById("inputSenha").value

        const autenticacao = getAuth();
        signInWithEmailAndPassword(autenticacao, email, senha)
            .then((userCredential) => {
                alert("[SUCESSO] E-mail autenticado com sucesso.")
                window.location.href = "./painel.html"

            })
            .catch((error) => {
                alert("[ERRO] E-mail não corresponde dentro dos e-mails registrados.")

            });

    }