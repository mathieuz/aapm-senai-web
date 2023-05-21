/* Importando variáveis necessárias do arquivo module. */
import { ath, db, storage } from "../module.js"

import { doc, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

let modalPerfil = document.getElementById("modalPerfil")

let hrefCss = document.head.getElementsByTagName("link")[0]
let logoSenai = document.getElementById("senaiLogo")
let imgIconAdmin = document.getElementById("imgIconAdmin")
let imgAdmin = document.getElementById("imgAdmin")

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const adminDoc = doc(db, "Administrador", user.email)
    const admin = await getDoc(adminDoc)

    if (admin.get("darkMode") == true){
      hrefCss.href = "css/painel/painel-dm.css"
      logoSenai.src = "./img/senai-logo-branco.png"

    } else if (admin.get("darkMode") == false){
      hrefCss.href = "css/painel/painel.css"
      logoSenai.src = "./img/senai-logo.png"

    }

    //Adiciona função dark/light mode.
    document.getElementById("btnDarkLightMode").onclick = async () => {


      if (hrefCss.href.includes("css/painel/painel.css")){
        hrefCss.href = "css/painel/painel-dm.css"
        logoSenai.src = "./img/senai-logo-branco.png"

        const alterarDarkMode = doc(db, "Administrador", user.email)
        await updateDoc(alterarDarkMode, {
          darkMode: true
        })

      } else if (hrefCss.href.includes("css/painel/painel-dm.css")){
        hrefCss.href = "css/painel/painel.css"
        logoSenai.src = "./img/senai-logo.png"

        const alterarDarkMode = doc(db, "Administrador", user.email)
        await updateDoc(alterarDarkMode, {
          darkMode: false
        })

      }
    }

    document.getElementById("imgIconAdmin").addEventListener("click", async () => {
        if (window.getComputedStyle(modalPerfil).display === "none"){
            modalPerfil.style.display = "flex"

            const docRef = doc(db, "Administrador", user.email);
            const admin = await getDoc(docRef)

            document.getElementById("nomeAdmin").innerHTML = admin.get("nome")
            document.getElementById("emailAdmin").innerHTML = admin.get("email")

            document.getElementById("btnLogout").addEventListener("click", async () => {
              //Verifica se a conta é nova. Se sim, remove o campo de sedocumento.
              if (admin.get("senhaAdmin") != undefined){
                const removeSenha = doc(db, 'Administrador', user.email)
                await updateDoc(removeSenha, {
                  senhaAdmin: deleteField()
                });
              
                alert("Admin novo, senha removida do banco.")
              } else {
                alert("Nada acontece feijoada.")
              }
              
              const auth = getAuth();
              signOut(auth).then(() => {
                alert("Saindo...")
                document.location.href = "./login.html"
              }).catch((error) => {
                alert("Um erro ocorreu ao deslogar.")
              });
            })

            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                try{

                  //Adiciona imagem.
                  const storage = getStorage();
                  const starsRef = ref(storage, `images/${user.email}.jpg`)
                  
                  getDownloadURL(starsRef)
                    .then((url) => {
                      document.getElementById("imgAdmin").src = `${url}`
                    })
                    .catch((error) => {
                      alert(error)
                    });
              
                } catch (error) { alert(error) }
              }
            });
    
            //Adiciona rota para o perfil no botão "Ver Perfil"
            document.getElementById("btnVerPerfil").onclick = () => {
                document.getElementById("iframePainel").src = "html/painel/perfil.html"
                modalPerfil.style.display = "none"
            }
    
        } else if (window.getComputedStyle(modalPerfil).display === "flex"){
            modalPerfil.style.display = "none"
        }

    })

  } else {
    alert("Nenhum admin logado.")

  }

  try{

    //Adiciona imagem.
    const storage = getStorage();
    const starsRef = ref(storage, `images/${user.email}.jpg`)
    
    getDownloadURL(starsRef)
      .then((url) => {
        document.getElementById("imgIconAdmin").src = `${url}`
      })
      .catch((error) => {
        alert(error)
      });

  } catch (error) { alert(error) }
});