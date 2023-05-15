import { db, ath } from "../module.js"

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
    let telRegex = /^([0-9]{8}|[0-9]{11})$/

    let emailRegex = /^([a-zA-Z0-9\.]*@sp.senai.br|[a-zA-Z0-9\.]*@portalsesisp.org.br)$/

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

    inputDataDeNascimento = String(inputDataDeNascimento)
    let dataNascimento = `${inputDataDeNascimento[8]}${inputDataDeNascimento[9]}/${inputDataDeNascimento[5]}${inputDataDeNascimento[6]}/${inputDataDeNascimento[0]}${inputDataDeNascimento[1]}${inputDataDeNascimento[2]}${inputDataDeNascimento[3]}`

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

    if (inputCategoria != "Escolha uma Opção"){
        arrayInput[5].classList.remove("alertaInput")
        arrayInput[5].classList.add("sucessoInput")

        arrayLabels[5].classList.remove("alertaLabel")
        arrayLabels[5].classList.add("sucessoLabel")

        arrayIcones[5].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[5].style.display = "flex"

    } else {
        arrayInput[5].classList.remove("sucessoInput")
        arrayInput[5].classList.add("alertaInput")

        arrayLabels[5].classList.remove("sucessoLabel")
        arrayLabels[5].classList.add("alertaLabel")

        arrayIcones[5].src = "../../img/icones/icon-alerta.png"
        arrayIcones[5].style.display = "flex"
    }

    if (inputTurma.length > 0){
        arrayInput[6].classList.remove("alertaInput")
        arrayInput[6].classList.add("sucessoInput")

        arrayLabels[6].classList.remove("alertaLabel")
        arrayLabels[6].classList.add("sucessoLabel")

        arrayIcones[6].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[6].style.display = "flex"

    } else {
        arrayInput[6].classList.remove("sucessoInput")
        arrayInput[6].classList.add("alertaInput")

        arrayLabels[6].classList.remove("sucessoLabel")
        arrayLabels[6].classList.add("alertaLabel")

        arrayIcones[6].src = "../../img/icones/icon-alerta.png"
        arrayIcones[6].style.display = "flex"
    }

    if (inputCurso != "Escolha uma Opção"){
        arrayInput[7].classList.remove("alertaInput")
        arrayInput[7].classList.add("sucessoInput")

        arrayLabels[7].classList.remove("alertaLabel")
        arrayLabels[7].classList.add("sucessoLabel")

        arrayIcones[7].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[7].style.display = "flex"

    } else {
        arrayInput[7].classList.remove("sucessoInput")
        arrayInput[7].classList.add("alertaInput")

        arrayLabels[7].classList.remove("sucessoLabel")
        arrayLabels[7].classList.add("alertaLabel")

        arrayIcones[7].src = "../../img/icones/icon-alerta.png"
        arrayIcones[7].style.display = "flex"
    }

    if (inputPeriodo != "Escolha uma Opção"){
        arrayInput[8].classList.remove("alertaInput")
        arrayInput[8].classList.add("sucessoInput")

        arrayLabels[8].classList.remove("alertaLabel")
        arrayLabels[8].classList.add("sucessoLabel")

        arrayIcones[8].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[8].style.display = "flex"

    } else {
        arrayInput[8].classList.remove("sucessoInput")
        arrayInput[8].classList.add("alertaInput")

        arrayLabels[8].classList.remove("sucessoLabel")
        arrayLabels[8].classList.add("alertaLabel")

        arrayIcones[8].src = "../../img/icones/icon-alerta.png"
        arrayIcones[8].style.display = "flex"
    }

    if (inputDataDeInicio != ""){
        arrayInput[9].classList.remove("alertaInput")
        arrayInput[9].classList.add("sucessoInput")

        arrayLabels[9].classList.remove("alertaLabel")
        arrayLabels[9].classList.add("sucessoLabel")

        arrayIcones[9].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[9].style.display = "flex"

    } else {
        arrayInput[9].classList.remove("sucessoInput")
        arrayInput[9].classList.add("alertaInput")

        arrayLabels[9].classList.remove("sucessoLabel")
        arrayLabels[9].classList.add("alertaLabel")

        arrayIcones[9].src = "../../img/icones/icon-alerta.png"
        arrayIcones[9].style.display = "flex"
    }

    if (inputDataDeConclusao != ""){
        arrayInput[10].classList.remove("alertaInput")
        arrayInput[10].classList.add("sucessoInput")

        arrayLabels[10].classList.remove("alertaLabel")
        arrayLabels[10].classList.add("sucessoLabel")

        arrayIcones[10].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[10].style.display = "flex"

    } else {
        arrayInput[10].classList.remove("sucessoInput")
        arrayInput[10].classList.add("alertaInput")

        arrayLabels[10].classList.remove("sucessoLabel")
        arrayLabels[10].classList.add("alertaLabel")

        arrayIcones[10].src = "../../img/icones/icon-alerta.png"
        arrayIcones[10].style.display = "flex"
    }

    if (inputNumArmario.length > 0){
        arrayInput[11].classList.remove("alertaInput")
        arrayInput[11].classList.add("sucessoInput")

        arrayLabels[11].classList.remove("alertaLabel")
        arrayLabels[11].classList.add("sucessoLabel")

        arrayIcones[11].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[11].style.display = "flex"

    } else {
        arrayInput[11].classList.remove("sucessoInput")
        arrayInput[11].classList.add("alertaInput")

        arrayLabels[11].classList.remove("sucessoLabel")
        arrayLabels[11].classList.add("alertaLabel")

        arrayIcones[11].src = "../../img/icones/icon-alerta.png"
        arrayIcones[11].style.display = "flex"
    }

    if (inputVoucher.length > 0){
        arrayInput[12].classList.remove("alertaInput")
        arrayInput[12].classList.add("sucessoInput")

        arrayLabels[12].classList.remove("alertaLabel")
        arrayLabels[12].classList.add("sucessoLabel")

        arrayIcones[12].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[12].style.display = "flex"

    } else {
        arrayInput[12].classList.remove("sucessoInput")
        arrayInput[12].classList.add("alertaInput")

        arrayLabels[12].classList.remove("sucessoLabel")
        arrayLabels[12].classList.add("alertaLabel")

        arrayIcones[12].src = "../../img/icones/icon-alerta.png"
        arrayIcones[12].style.display = "flex"
    }

    if (emailRegex.test(inputEmailInstitucional) === true){
        arrayInput[13].classList.remove("alertaInput")
        arrayInput[13].classList.add("sucessoInput")

        arrayLabels[13].classList.remove("alertaLabel")
        arrayLabels[13].classList.add("sucessoLabel")

        arrayIcones[13].src = "../../img/icones/icon-sucesso.png"
        arrayIcones[13].style.display = "flex"

    } else {
        arrayInput[13].classList.remove("sucessoInput")
        arrayInput[13].classList.add("alertaInput")

        arrayLabels[13].classList.remove("sucessoLabel")
        arrayLabels[13].classList.add("alertaLabel")

        arrayIcones[13].src = "../../img/icones/icon-alerta.png"
        arrayIcones[13].style.display = "flex"
    }

    console.log(arrayInput[0].className)

    //Validação recebe um valor booleano 'true'. recebe 'false' à partir do momento em que um campo não estiver validado. O cadastro será decido de acordo com o valor de 'verifValidacao'.
    let verifValidacao = true
    for (let i = 0; i <= 13; i++){
        if (arrayInput[i].className === "inputCad alertaInput"){
            verifValidacao = false
            break;
        }
    }

    if (verifValidacao == true){
        alert("Cadastro realizado com sucesso!")
        
        //Estrutura de criação de coleção de dados + armazenamento no firestore (uma veque a autenticação e cadastro foram bem-sucedidos)
        addDoc(collection(db, "Aluno"), {
            numMatricula: `${inputNumeroDaMatricula}`,
            nome: `${inputNome}`,
            dataDeNascimento: `${dataNascimento}`,
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
            email: `${inputEmailInstitucional}`,
        });

    } else {
        alert("Alguns campos não estão preenchidos corretamente. Verifique-os e tente novamente.")
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