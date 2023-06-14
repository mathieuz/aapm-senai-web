import { db, storage, ath } from "../module.js"

import { getDocs, collection, query, where, doc, updateDoc, getCountFromServer, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

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
      hrefCss[1].href = "../../css/painel/todas-as-postagens-dm.css"
    }
  }
})

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

const colecao = collection(db, "Publicacoes")
const arrayDocumentos = await getDocs(colecao)

arrayDocumentos.forEach(async (pub) => {
    //Pegando documento do autor da postagem.
    const adminDoc = doc(db, "Administrador", pub.get("emailPublicador"))
    const admin = await getDoc(adminDoc)

    let main = document.getElementsByTagName("main")[0]

    let divPostagem = document.createElement("div")
    divPostagem.setAttribute("class", "divPostagem")

        let postagemHeader = document.createElement("div")
        postagemHeader.setAttribute("class", "postagemHeader")

            let linha = document.createElement("div")
            linha.setAttribute("class", "linha")

                let adminFotoPostagem = document.createElement("img")
                adminFotoPostagem.setAttribute("class", "adminFotoPostagem")
                //Adiciona imagem do ícone do autor do post.
                const storageImgAdmin = getStorage();
                const imagem = ref(storageImgAdmin, `images/${admin.id}.jpg`)
                
                getDownloadURL(imagem)
                .then((url) => {
                  adminFotoPostagem.src = `${url}`
                })
                .catch((error) => {
            
                });

                let nomeAdminPost = document.createElement("span")
                nomeAdminPost.setAttribute("class", "nomeAdminPost")
                nomeAdminPost.innerHTML = `${admin.get("nome")}`

                let dataPost = document.createElement("span")
                dataPost.setAttribute("class", "dataPost")
                dataPost.innerHTML = `- postado dia ${pub.get("dataPublicacao")}`

            linha.append(adminFotoPostagem, nomeAdminPost, dataPost)

        postagemHeader.append(linha)

        let postagemBody = document.createElement("div")
        postagemBody.setAttribute("class", "postagemBody")

            let tituloPostagem = document.createElement("span")
            tituloPostagem.setAttribute("class", "tituloPostagem")
            tituloPostagem.innerHTML = pub.get("titulo")

            let descricaoPostagem = document.createElement("span")
            descricaoPostagem.setAttribute("class", "descricaoPostagem")
            descricaoPostagem.innerHTML = pub.get("descricao")

            let imgPost = document.createElement("img")
            imgPost.setAttribute("class", "imgPost")
            try{
                //Adiciona imagem.
                const storage = getStorage();
                const starsRef = ref(storage, `publicacoes/${pub.get("imgRef")}.jpg`)
                
                getDownloadURL(starsRef)
                  .then((url) => {
                    imgPost.src = `${url}`
                  })
                  .catch((error) => {
                    imgPost.style.display = "none"
                  });
            } catch {}

            let removerPost = document.createElement("button")
            removerPost.setAttribute("class", "removerPost")
            removerPost.innerHTML = "Remover Postagem"
            removerPost.addEventListener("click", async () => {

                await deleteDoc(doc(db, "Publicacoes", `${pub.id}`));

                const desertRef = ref(storage, `publicacoes/${pub.get("imgRef")}.jpg`);
                // Delete the file
                deleteObject(desertRef).then(() => {
                  // File deleted successfully
                }).catch((error) => {
                  // Uh-oh, an error occurred!
                });

                spanPopUp[1].innerHTML = "Publicação excluída com sucesso!"
                popUp[1].style.display = "flex"

                setTimeout(() => {
                    window.location.href = window.location.href
                }, 2000)
            })

        postagemBody.append(tituloPostagem, descricaoPostagem, imgPost, removerPost)

    divPostagem.append(postagemHeader, postagemBody)
    main.append(divPostagem)
})