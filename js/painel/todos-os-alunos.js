/*Buscador de Alunos*/

let registroItem = document.getElementsByClassName("registroItem")
let barraDePesquisa = document.getElementById("barraDePesquisa")
let filtro = document.getElementById("filtro")

barraDePesquisa.addEventListener("input", function busca(){
    let paramBusca;

    switch (filtro.value){
        case "Buscar Por: Matrícula":
            paramBusca = document.getElementsByClassName("valueMatricula")
        break;

        case "Buscar Por: Nome":
            paramBusca = document.getElementsByClassName("valueNome")
        break;

        case "Buscar Por: Curso":
            paramBusca = document.getElementsByClassName("valueCurso")
        break;

        case "Buscar Por: Turma":
            paramBusca = document.getElementsByClassName("valueTurma")
        break;

        case "Buscar Por: CPF":
            paramBusca = document.getElementsByClassName("valueCpf")
        break;
    }

    for (let i = 0; i < registroItem.length; i++){
        if (String(paramBusca[i].value).toLowerCase().includes(String(barraDePesquisa.value).toLowerCase())){
            registroItem[i].style.display = "flex"
        } else {
            registroItem[i].style.display = "none"
        }
    }
})

filtro.addEventListener("submit", busca)