/* Importando variáveis necessárias do arquivo module. */
import { ath, db } from "../module.js"

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

import { doc, getDoc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

//Função que realiza o login na plataforma.
document.getElementById("btnFazerLogin").addEventListener("click", () => {
    let email = document.getElementById("inputEmail").value
    let senha = document.getElementById("inputSenha").value

    if (String(email).length == 0 || String(email).length == 0){
        spanPopUp[0].innerHTML = "Um ou mais campos estão vazios. Preencha todos campos e tente novamente."
        popUp[0].style.display = "flex"

        setTimeout(() => {
            popUp[0].style.display = "none"
        }, 3000)    
    }

    const autenticacao = getAuth()
    signInWithEmailAndPassword(autenticacao, email, senha)
        .then((userCredential) => {
            spanPopUp[1].innerHTML = "Autenticação realizada com sucesso. Redirecionando..."
            popUp[1].style.display = "flex"

            setTimeout(() => {
                window.location.href = "./painel.html"
            }, 2000)

        })
        .catch( async (error) => {
            const docRef = doc(db, "Administrador", email);
            const docSnap = await getDoc(docRef);

            //Se a conta dada ao realizar ao login existir, faz o login.
            if (docSnap.exists()){
                try{
                    if (senha === atob(docSnap.get("senhaAdmin"))){
                        createUserWithEmailAndPassword(autenticacao, email, senha)
                            .then(async (userCredential) => {

                                spanPopUp[1].innerHTML = "Autenticação realizada com sucesso. Redirecionando..."
                                popUp[1].style.display = "flex"
                
                                setTimeout(() => {
                                    window.location.href = "./painel.html"
                                }, 3000)

                            })
                            .catch((error) => {
                                alert(error)
                            });

                    } else {
                        spanPopUp[0].innerHTML = "Senha ou e-mail incorretos. Verifique os campos e tente novamente."
                        popUp[0].style.display = "flex"

                        setTimeout(() => {
                            popUp[0].style.display = "none"
                        }, 3000)
                    }
                } catch {}
            }

            spanPopUp[0].innerHTML = "Senha ou e-mail incorretos. Verifique os campos e tente novamente."
            popUp[0].style.display = "flex"

            setTimeout(() => {
                popUp[0].style.display = "none"
            }, 3000)
        });
})