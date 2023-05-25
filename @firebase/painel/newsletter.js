/* Importando variáveis necessárias do arquivo module. */
import { ath, db, storage } from "../module.js"

import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

//Verifica darkmode.
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let hrefCss = document.head.getElementsByTagName("link")
    let icoBusca = document.getElementById("icoBusca")

    const adminDoc = doc(db, "Administrador", user.email)
    const admin = await getDoc(adminDoc)

    if (admin.get("darkMode") == true){
      hrefCss[0].href = "../../css/painel/global-dm.css"
      hrefCss[2].href = "../../css/painel/newsletter-dm.css"
    }
  }
})

//Enviar Foto
const imagem = document.getElementById('fotoPubli');
const inputImagem = document.getElementById('arquivo');
var file;

inputImagem.addEventListener('change', function() {
  file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      imagem.style.display = "block"
      imagem.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

document.getElementById("enviarPublicacao").addEventListener("click", async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const adminDoc = doc(db, "Administrador", user.email)
        const admin = await getDoc(adminDoc)

        let imgReferenciaStorage = new Date().getTime().toString()

        let dia = new Date().getDate().toString()
        let mes = (new Date().getMonth() + 1).toString()
        let ano = new Date().getFullYear().toString()
        let dataPublicacao = `${dia}/${mes}/${ano}`

        let titulo = document.getElementById("tituloNewsletter").value
        let descricao = document.getElementById("descricaoNewsletter").value

        if (String(titulo).length > 0 && String(descricao).length > 0){
          await setDoc(doc(db, "Publicacoes", imgReferenciaStorage), {
              titulo: titulo,
              descricao: descricao,
              imgRef: imgReferenciaStorage,
              emailPublicador: admin.get("email"),
              dataPublicacao: dataPublicacao
          });

          if (imagem.src.includes("data:image")){
              const storageRef = ref(storage, `publicacoes/${imgReferenciaStorage}.jpg`);
              const uploadTask = uploadBytes(storageRef, file);

              uploadTask.then((snapshot) => {

                }).catch((error) => {
                  alert("Erro ao enviar imagem.")
                });
          }

          spanPopUp[1].innerHTML = "Publicação feita com sucesso"
          popUp[1].style.display = "flex"
      
          setTimeout(() => {
              window.location.href = "../../html/painel/todos-os-alunos.html"
          }, 2000)
          
        } else {
          spanPopUp[0].innerHTML = "Para publicar é necessário que haja ao menos um título e uma descrição. Tente novamente."
          popUp[0].style.display = "flex"
      
          setTimeout(() => {
            popUp[0].style.display = "none"
          }, 5000)
        }
    }
})

})