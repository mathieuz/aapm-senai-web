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