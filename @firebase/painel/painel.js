/* Importando variáveis necessárias do arquivo module. */
import { ath } from "../module.js"

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

let modalPerfil = document.getElementById("modalPerfil")

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("imgIconAdmin").addEventListener("click", () => {
        if (window.getComputedStyle(modalPerfil).display === "none"){
            modalPerfil.style.display = "flex"

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
    console.log("Nenhum admin logado.")

  }
});