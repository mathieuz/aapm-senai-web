/* Importando variáveis necessárias do arquivo module. */
import { ath, db } from "../module.js"

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

import { doc, getDoc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
        .catch( async (error) => {
            const docRef = doc(db, "Administrador", email);
            const docSnap = await getDoc(docRef);

            //Se a conta dada ao realizar ao login existir, faz o login.
            if (docSnap.exists()){
                if (senha === atob(docSnap.get("senhaAdmin"))){
                    createUserWithEmailAndPassword(autenticacao, email, senha)
                        .then(async (userCredential) => {
                            alert("[SUCESSO] E-mail autenticado com sucesso.")
                            window.location.href = "./painel.html"
                        })
                        .catch((error) => {
                            alert(error)
                        });

                } else {
                    alert("[ERRO] Senha incorreta. Tente novamente.")
                }
            } else {
                alert("[ERRO] A conta informada não existe no sistema.")
            }
        });
})