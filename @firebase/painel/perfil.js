/* Importando variáveis necessárias do arquivo module. */
import { ath, db, storage } from "../module.js"

import { doc, getDoc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

//Alterar Foto
const imgPerfil = document.getElementById('imgPerfil');
const inputAlterarFoto = document.getElementById('alterarFoto');

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

let hrefCss = document.head.getElementsByTagName("link")

inputAlterarFoto.addEventListener('change', function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      imgPerfil.src = reader.result;
    });

    reader.readAsDataURL(file);

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {

        const storageRef = ref(storage, `images/${user.email}.jpg`);
        const uploadTask = uploadBytes(storageRef, file);

        uploadTask.then((snapshot) => {
            alert("Upload completo");
          }).catch((error) => {
            alert("Erro")
          });
      }
    })

  }
});

//Preenchendo o perfil com as informações do usuário logado.
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "Administrador", user.email);
    const admin = await getDoc(docRef)

    //Verifica darkmode.
    if (admin.get("darkMode") == true){
      hrefCss[0].href = "../../../css/painel/global-dm.css"
      hrefCss[1].href = "../../../css/painel/perfil-dm.css"

      document.getElementsByClassName("icone")[0].src = "../../img/icones/icon-email-dm.png"
      document.getElementsByClassName("icone")[1].src = "../../img/icones/icon-telefone-dm.png"
    }

    document.getElementById("nomeAdmin").innerHTML = admin.get("nome")
    document.getElementById("emailAdmin").innerHTML = admin.get("email")
    document.getElementById("telefoneAdmin").innerHTML = admin.get("telefone")
    
    try{

      //Adiciona imagem.
      const storage = getStorage();
      const starsRef = ref(storage, `images/${user.email}.jpg`)
      
      getDownloadURL(starsRef)
        .then((url) => {
          document.getElementById("imgPerfil").src = `${url}`
        })
        .catch((error) => {
          alert(error)
        });

    } catch (error) { alert(error) }
  }
})

//Cadastrar administrador
document.getElementById("adicionarAdmin").addEventListener("click", () => {
  let modalPerfil = document.getElementById("modalCadAdmin")

  if (window.getComputedStyle(modalPerfil).display == "none"){
    modalPerfil.style.display = "flex"

    //Botão de cadastro
    document.getElementById("btnCadastrar").addEventListener("click", async () => {
      let nomeAdmin = document.getElementById("inputNomeAdmin").value
      let telAdmin = document.getElementById("inputTelAdmin").value
      let emailAdmin = document.getElementById("inputEmailAdmin").value
      let senhaAdmin = document.getElementById("inputSenhaAdmin").value
      let confirmSenha = document.getElementById("inputConfirmSenhaAdmin").value

      if (String(nomeAdmin).length > 0 && String(telAdmin).length > 0 && String(emailAdmin).length > 0){
        if (String(senhaAdmin).length > 0 && String(senhaAdmin) == String(confirmSenha)){
        await setDoc(doc(db, "Administrador", emailAdmin), {
            nome: nomeAdmin,
            email: emailAdmin,
            telefone: telAdmin,
            senhaAdmin: btoa(senhaAdmin),
            darkMode: false
          });     

          spanPopUp[1].innerHTML = "Administrador cadastrado com sucesso!"
          popUp[1].style.display = "flex"

          setTimeout(() => {
            location.reload()
          }, 2000)
          

        } else {

          spanPopUp[0].innerHTML = "Senhas não conferem. Verifique os campos e tente novamente."
          popUp[0].style.display = "flex"
      
          setTimeout(() => {
            popUp[0].style.display = "none"
          }, 5000)

        }

      } else {
        spanPopUp[0].innerHTML = "Alguns campos não foram preenchidos. Verifique-os e tente novamente."
        popUp[0].style.display = "flex"
    
        setTimeout(() => {
          popUp[0].style.display = "none"
        }, 5000)
      }

    })

    //Botão de fechar o modal
    document.getElementById("botaoFechar").addEventListener("click", () => {
      modalPerfil.style.display = "none"
    })
  }
})

//Redireciona apra a página do newsletter.
document.getElementById("criarPostagem").addEventListener("click", () => {
  window.location.href = "../../html/painel/newsletter.html"
})

//Todos os posts
document.getElementById("verTodosOsPosts").addEventListener("click", () => {
  window.location.href = "../../html/painel/todas-as-postagens.html"
})