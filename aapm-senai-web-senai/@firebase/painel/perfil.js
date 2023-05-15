/* Importando variáveis necessárias do arquivo module. */
import { ath, db } from "../module.js"

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
  }
})

//Cadastrar administrador
document.getElementById("adicionarAdmin").addEventListener("click", () => {
  let modalPerfil = document.getElementById("modalCadAdmin")

  if (window.getComputedStyle(modalPerfil).display == "none"){
    modalPerfil.style.display = "flex"

    let nomeAdmin = document.getElementById("nomeAdmin").value
    let telAdmin = document.getElementById("telAdmin").value
    let emailAdmin = document.getElementById("emailAdmin").value
    let senhaAdmin = document.getElementById("senhaAdmin").value
    let confirmSenha = document.getElementById("confirmSenhaAdmin").value

    //Botão de cadastro
    document.getElementById("btnCadastrar").addEventListener("click", () => {
      alert("Usuário cadastrado!")
      window.location.href = window.location.href
    })

    //Botão de fechar o modal
    document.getElementById("botaoFechar").addEventListener("click", () => {
      modalPerfil.style.display = "none"
    })
  }
})