let modalPerfil = document.getElementById("modalPerfil")

document.getElementById("imgIconAdmin").addEventListener("click", () => {
    if (window.getComputedStyle(modalPerfil).display === "none"){
        modalPerfil.style.display = "flex"

    } else if (window.getComputedStyle(modalPerfil).display === "flex"){
        modalPerfil.style.display = "none"
    }
})