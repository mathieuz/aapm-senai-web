import { db, auth } from "../module.js"

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

/********/
/********/
/********/

/*Selecionando todos os inputs, labels e icones do formulário.*/
let arrayInput = document.getElementsByClassName("inputCad")
let arrayLabels = document.getElementsByTagName("label")
let arrayIcones = document.getElementsByClassName("icone-verif")

/*Verificação de campos: executa quando há uma tentativa de realizar o cadastro.*/
document.getElementById("btnCadastrarAluno").addEventListener("click", () => {
    for (let i = 0; i < arrayInput.length; i++){
        if (arrayInput[i].value.length > 0){

            arrayInput[i].classList.remove("alertaInput")
            arrayInput[i].classList.add("sucessoInput")

            arrayLabels[i].classList.remove("alertaLabel")
            arrayLabels[i].classList.add("sucessoLabel")

            arrayIcones[i].src = "../../img/icones/icon-sucesso.png"
            arrayIcones[i].style.display = "flex"

        } else {

            arrayInput[i].classList.remove("sucessoInput")
            arrayInput[i].classList.add("alertaInput")

            arrayLabels[i].classList.remove("sucessoLabel")
            arrayLabels[i].classList.add("alertaLabel")

            arrayIcones[i].src = "../../img/icones/icon-alerta.png"
            arrayIcones[i].style.display = "flex"

        }
    }
})

/*
let inputNumeroDaMatricula = document.getElementById("inputNumeroDaMatricula").value
    let inputNome = document.getElementById("inputNome").value
    let inputDataDeNascimento = document.getElementById("inputDataDeNascimento").value
    let inputCpf = document.getElementById("inputCpf").value
    let inputTelefone = document.getElementById("inputTelefone").value
    let inputCategoria = document.getElementById("inputCategoria").value
    let inputTurma = document.getElementById("inputTurma").value
    let inputCurso = document.getElementById("inputCurso").value
    let inputPeriodo = document.getElementById("inputPeriodo").value
    let inputDataDeInicio = document.getElementById("inputDataDeInicio").value
    let inputDataDeConclusao = document.getElementById("inputDataDeConclusao").value
    let inputNumArmario = document.getElementById("inputNumArmario").value
    let inputVoucher = document.getElementById("inputVoucher").value
    let inputEmailInstitucional = document.getElementById("inputEmailInstitucional").value
    let inputSenha = document.getElementById("inputSenha").value

    createUserWithEmailAndPassword(auth, inputEmailInstitucional, inputSenha)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Cadastro realizado com sucesso!")
            //Estrutura de criação de coleção de dados + armazenamento no firestore (uma vez que a autenticação e cadastro foram bem-sucedidos)
            addDoc(collection(db, "Aluno"), {
                numMatricula: `${inputNumeroDaMatricula}`,
                nome: `${inputNome}`,
                dataDeNascimento: `${inputDataDeNascimento}`,
                cpf: `${inputCpf}`,
                telefone: `${inputTelefone}`,
                categoria: `${inputCategoria}`,
                turma: `${inputTurma}`,
                curso: `${inputCurso}`,
                periodo: `${inputPeriodo}`,
                dataDeInicioCurso: `${inputDataDeInicio}`,
                dataDeConclusaoCurso: `${inputDataDeConclusao}`,
                numArmario: `${inputNumArmario}`,
                voucher: `${inputVoucher}`,
                email: `${inputEmailInstitucional}`
            });

        })
*/