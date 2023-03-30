// Seleciona o botão de abertura do modal
var btn = document.getElementById("sectionRegistro");

// Seleciona o modal
var modal = document.getElementById("myModal");

// Seleciona o elemento para fechar o modal
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, abre o modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuário clicar no elemento (x), fecha o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fecha o modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
