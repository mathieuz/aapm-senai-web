import { db, storage } from "../module.js"

import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const colecao = collection(db, "Aluno")
const arrayDocumentos = await getDocs(colecao)

arrayDocumentos.forEach(doc => {
    
    let sectionRegistro = document.getElementById("sectionRegistro")

    let registroItem = document.createElement("div")
    registroItem.setAttribute("class", "registroItem")

    let imgAluno = document.createElement("img")
    imgAluno.setAttribute("class", "imgAluno")
    imgAluno.src = "../../img/icones/icon-foto-perfil.png"

    let table = document.createElement("table")
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")
    let valueMatricula = document.createElement("input")
    valueMatricula.setAttribute("type", "hidden")
    valueMatricula.setAttribute("class", "valueMatricula")
    valueMatricula.value = doc.get("numMatricula")

    let th = document.createElement("th")
    th.innerHTML = "Matrícula"
    thead.append(th)

    th = document.createElement("th")
    th.innerHTML = "Nome"
    thead.append(th)

    th = document.createElement("th")
    th.innerHTML = "CPF"
    thead.append(th)

    th = document.createElement("th")
    th.innerHTML = "Curso"
    thead.append(th)

    th = document.createElement("th")
    th.innerHTML = "Turma"
    thead.append(th)

    /**/

    let td = document.createElement("td")
    td.innerHTML = doc.get("numMatricula")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("nome")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("cpf")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("curso")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("turma")
    tbody.append(td)


    table.append(thead, tbody)
    registroItem.append(imgAluno, table, valueMatricula)
    sectionRegistro.append(registroItem)

    try{

        //Adiciona imagem.
        const storage = getStorage();
        const starsRef = ref(storage, `images/${doc.get("email")}`)
        
        getDownloadURL(starsRef)
          .then((url) => {
            imgAluno.src = `${url}`
          })
          .catch((error) => {
            console.log(error)
          });

    } catch {}
})

/*Acessando a section contêiner de todos os registros.*/
let sectionRegistro = document.getElementById("sectionRegistro")

/*Acessando o Modal.*/
let modalRegistro = document.getElementById("modalRegistro")

/*Acessando o array de todos os registros.*/
let arrayRegistro = document.getElementsByClassName("registroItem")

/*Adicionando evento de abrir modal em todos os registros.*/
for (let i = 0; i < arrayRegistro.length; i++){
    arrayRegistro[i].addEventListener("click", async () => {
        /*Capturando o úmero de matrícula para a busca de registro. (Considerando que cada matrícula é um vlor único para cada matrícula.*/
        const matricula = document.getElementsByClassName("valueMatricula")[i].value

        /* Pegando a coleção Aluno e realizando uma busca baseado no número de matrícula do registro especificado, filtrando pelo número de matrícula. */
        const colecao = collection(db, "Aluno")
        const busca = query(colecao, where("numMatricula", "==", matricula))

        /*Jogando a informação em cada campo do Modal. */
        const resultadoBusca = await getDocs(busca)
        resultadoBusca.forEach((doc) => {
            document.getElementById("nomeAluno").innerHTML = doc.get("nome")
            document.getElementById("emailAluno").innerHTML = doc.get("email")
            document.getElementById("telefoneAluno").innerHTML = doc.get("telefone")
            document.getElementById("cursoAluno").innerHTML = doc.get("curso")
            document.getElementById("dataNascimentoAluno").innerHTML = doc.get("dataDeNascimento")

            document.getElementById("inputMatricula").value = doc.get("numMatricula")
            document.getElementById("inputTurma").value = doc.get("turma")
            document.getElementById("inputCategoria").value = doc.get("categoria")
            document.getElementById("inputPeriodo").value = doc.get("periodo")
            document.getElementById("inputInicioDoCurso").value = doc.get("dataDeInicioCurso")
            document.getElementById("inputFimDoCurso").value = doc.get("dataDeConclusaoCurso")

            document.getElementById("numArmario").value = doc.get("numArmario")
            document.getElementById("voucher").value = doc.get("voucher")

            try{

                //Adiciona imagem.
                const storage = getStorage();
                const starsRef = ref(storage, `images/${doc.get("email")}`)
                
                getDownloadURL(starsRef)
                  .then((url) => {
                    imgAluno.src = `${url}`
                  })
                  .catch((error) => {
                    console.log(error)
                  });
        
            } catch {}
        })

        modalRegistro.style.display = "flex"
        sectionRegistro.style.pointerEvents = "none"

        setTimeout(() => {
          sectionRegistro.onclick = () => {
            modalRegistro.style.display = "none"
            imgAluno.src = "../../img/icones/icon-foto-perfil.png"

            sectionRegistro.style.pointerEvents = "all"
          }
        }, 500)
    })
}

/*Adicionando evento de fechar janela no elemento de fechar janela no botão.*/
document.getElementById("botaoFechar").addEventListener("click", () => {
    modalRegistro.style.display = "none"
    imgAluno.src = "../../img/icones/icon-foto-perfil.png"

    sectionRegistro.style.pointerEvents = "all"
})