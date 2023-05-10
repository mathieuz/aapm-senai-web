let modalPerfil = document.getElementById("modalPerfil")

document.getElementById("imgIconAdmin").addEventListener("click", () => {
    if (window.getComputedStyle(modalPerfil).display === "none"){
        modalPerfil.style.display = "flex"

        //Adiciona rota para o perfil no botão "Ver Perfil"
        document.getElementById("btnVerPerfil").onclick = () => {
            document.getElementById("iframePainel").src = "html/painel/perfil.html"
            modalPerfil.style.display = "none"
        }

        document.getElementById("btnLogout").onclick = () => {
            window.location.href = "./login.html"
        }

    } else if (window.getComputedStyle(modalPerfil).display === "flex"){
        modalPerfil.style.display = "none"
    }
})