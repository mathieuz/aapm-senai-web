/* Importando variáveis necessárias do arquivo module. */
import { ath, db, storage } from "../module.js"

import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

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
                alert("Upload completo");
              }).catch((error) => {
                alert("Erro")
              });
        }

        alert("Publicacao Enviada!")
    }
})

})