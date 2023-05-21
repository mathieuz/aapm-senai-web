/* Importando variáveis necessárias do arquivo module. */
import { ath, db, storage } from "../module.js"

import { doc, getDoc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

//Alterar Foto
const imgPerfil = document.getElementById('imgPerfil');
const inputAlterarFoto = document.getElementById('alterarFoto');

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

      if (senhaAdmin === confirmSenha){
        await setDoc(doc(db, "Administrador", emailAdmin), {
          nome: nomeAdmin,
          email: emailAdmin,
          telefone: telAdmin,
          senhaAdmin: btoa(senhaAdmin),
          darkMode: false
        });     

        alert("Administrador Cadastrado!")

        location.reload()

      } else {
        alert("Senhas não conferem. Tente novamente.")
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