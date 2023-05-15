/* Importando variáveis necessárias do arquivo module. */
import { ath, db } from "../module.js"

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

let modalPerfil = document.getElementById("modalPerfil")


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {

    //Adiciona função dark/light mode.
    document.getElementById("btnDarkLightMode").onclick = () => {
      let hrefCss = document.head.getElementsByTagName("link")[0]
      let logoSenai = document.getElementById("senaiLogo")

      if (hrefCss.href.includes("css/painel/painel.css")){
        hrefCss.href = "css/painel/painel-dm.css"
        logoSenai.src = "img/senai-logo-branco.png"

      } else {
        hrefCss.href = "css/painel/painel.css"
        logoSenai.src = "img/senai-logo.png"
      }
    }

    document.getElementById("imgIconAdmin").addEventListener("click", async () => {
        if (window.getComputedStyle(modalPerfil).display === "none"){
            modalPerfil.style.display = "flex"

            const docRef = doc(db, "Administrador", user.email);
            const admin = await getDoc(docRef)

            document.getElementById("nomeAdmin").innerHTML = admin.get("nome")
            document.getElementById("emailAdmin").innerHTML = admin.get("email")

            document.getElementById("btnLogout").addEventListener("click", () => {
              const auth = getAuth();
              signOut(auth).then(() => {
                alert("Saindo...")
                document.location.href = "./login.html"
              }).catch((error) => {
                alert("Um erro ocorreu ao deslogar.")
              });
            })
    
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
});