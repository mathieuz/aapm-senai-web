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
    })

    //Botão de fechar o modal
    document.getElementById("botaoFechar").addEventListener("click", () => {
      modalPerfil.style.display = "none"
    })
  }
})