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

/*Padrão Regex dos campos de texto.*/
    //Verifica se o campo é composto apenas por dígitos numéricos de no no mínimo 10 caracteres.
    let matriculaRegex = /^[0-9]{10}$/

    //Verifica se o campo é composto apenas por letras.
    let nomeRegex = /[\p{L}A-Za-z]*\s[\p{L}A-Za-z\s]*/

    //Verifica se o campo é composto apenas por digitos numéricos de no mínimo 11 caracteres.
    let cpfRegex = /^[0-9]{11}$/

    //Verifica se o campo é composto apenas por digitos numéricos (sem limite definido).
    let telRegex = /^[0-9]{8,11}$/

/*Verificação de campos: executa quando há uma tentativa de realizar o cadastro.*/
document.getElementById("btnCadastrarAluno").addEventListener("click", () => {
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

    /*Verificação dos Inputs.*/

    /*Verificação Matrícula*/
    if (matriculaRegex.test(inputNumeroDaMatricula) === true){
        arrayInput[0].classList.remove("alertaInput")
        arrayInput[0].classList.add("sucessoInput")

        arrayLabels[0].classList.remove("alertaLabel")
        arrayLabels[0].classList.add("sucessoLabel")

        arrayIcones[0].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[0].style.display = "flex"

    } else {
        arrayInput[0].classList.remove("sucessoInput")
        arrayInput[0].classList.add("alertaInput")

        arrayLabels[0].classList.remove("sucessoLabel")
        arrayLabels[0].classList.add("alertaLabel")

        arrayIcones[0].src = "../../img/icones/icon-alerta.png"
        arrayIcones[0].style.display = "flex"
    }

    /*Verificação Nome*/
    if (nomeRegex.test(inputNome) === true){
        arrayInput[1].classList.remove("alertaInput")
        arrayInput[1].classList.add("sucessoInput")

        arrayLabels[1].classList.remove("alertaLabel")
        arrayLabels[1].classList.add("sucessoLabel")

        arrayIcones[1].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[1].style.display = "flex"

    } else {
        arrayInput[1].classList.remove("sucessoInput")
        arrayInput[1].classList.add("alertaInput")

        arrayLabels[1].classList.remove("sucessoLabel")
        arrayLabels[1].classList.add("alertaLabel")

        arrayIcones[1].src = "../../img/icones/icon-alerta.png"
        arrayIcones[1].style.display = "flex"
    }

    /*Verificação Data de Nascimento*/
    if (inputDataDeNascimento != ""){
        arrayInput[2].classList.remove("alertaInput")
        arrayInput[2].classList.add("sucessoInput")

        arrayLabels[2].classList.remove("alertaLabel")
        arrayLabels[2].classList.add("sucessoLabel")

        arrayIcones[2].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[2].style.display = "flex"

    } else {
        arrayInput[2].classList.remove("sucessoInput")
        arrayInput[2].classList.add("alertaInput")

        arrayLabels[2].classList.remove("sucessoLabel")
        arrayLabels[2].classList.add("alertaLabel")

        arrayIcones[2].src = "../../img/icones/icon-alerta.png"
        arrayIcones[2].style.display = "flex"
    }

    /*Verificação CPF*/
    if (cpfRegex.test(inputCpf) === true){
        arrayInput[3].classList.remove("alertaInput")
        arrayInput[3].classList.add("sucessoInput")

        arrayLabels[3].classList.remove("alertaLabel")
        arrayLabels[3].classList.add("sucessoLabel")

        arrayIcones[3].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[3].style.display = "flex"

    } else {
        arrayInput[3].classList.remove("sucessoInput")
        arrayInput[3].classList.add("alertaInput")

        arrayLabels[3].classList.remove("sucessoLabel")
        arrayLabels[3].classList.add("alertaLabel")

        arrayIcones[3].src = "../../img/icones/icon-alerta.png"
        arrayIcones[3].style.display = "flex"
    }

    /*Verificação telefone*/
    if (telRegex.test(inputTelefone) === true){
        arrayInput[4].classList.remove("alertaInput")
        arrayInput[4].classList.add("sucessoInput")

        arrayLabels[4].classList.remove("alertaLabel")
        arrayLabels[4].classList.add("sucessoLabel")

        arrayIcones[4].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[4].style.display = "flex"

    } else {
        arrayInput[4].classList.remove("sucessoInput")
        arrayInput[4].classList.add("alertaInput")

        arrayLabels[4].classList.remove("sucessoLabel")
        arrayLabels[4].classList.add("alertaLabel")

        arrayIcones[4].src = "../../img/icones/icon-alerta.png"
        arrayIcones[4].style.display = "flex"
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