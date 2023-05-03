import { db, storage } from "../module.js"

import { getDocs, collection, query, where, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const colecao = collection(db, "Aluno")
const arrayDocumentos = await getDocs(colecao)

arrayDocumentos.forEach(async (d) => {
    const solicitacao = doc(db, "Aluno", d.id, "solicitacoes", "solicitacao")
    const docSolicitacao = await getDoc(solicitacao)

    if (docSolicitacao.exists()) {
        console.log("Subcoleção:", docSolicitacao.data())
        console.log("Subcoleção: ", docSolicitacao.get("jaleco"))

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
        valueMatricula.value = d.get("numMatricula")
    
        let th = document.createElement("th")
        th.innerHTML = "Matrícula"
        thead.append(th)
    
        th = document.createElement("th")
        th.innerHTML = "Nome"
        thead.append(th)
    
        th = document.createElement("th")
        th.innerHTML = "CPF"
        th.setAttribute("class", "sumir")
        thead.append(th)
    
        th = document.createElement("th")
        th.innerHTML = "Curso"
        th.setAttribute("class", "sumir")
        thead.append(th)
    
        th = document.createElement("th")
        th.innerHTML = "Turma"
        th.setAttribute("class", "sumir")
        thead.append(th)
    
        /**/
    
        let td = document.createElement("td")
        td.innerHTML = d.get("numMatricula")
        tbody.append(td)
    
        td = document.createElement("td")
        td.innerHTML = d.get("nome")
        tbody.append(td)
    
        td = document.createElement("td")
        td.innerHTML = d.get("cpf")
        td.setAttribute("class", "sumir")
        tbody.append(td)
    
        td = document.createElement("td")
        td.innerHTML = d.get("curso")
        td.setAttribute("class", "sumir")
        tbody.append(td)
    
        td = document.createElement("td")
        td.innerHTML = d.get("turma")
        td.setAttribute("class", "sumir")
        tbody.append(td)
    
    
        table.append(thead, tbody)
        registroItem.append(imgAluno, table, valueMatricula)
        sectionRegistro.append(registroItem)
    
        try{
    
            //Adiciona imagem.
            const storage = getStorage();
            const starsRef = ref(storage, `images/${d.get("email")}`)
            
            getDownloadURL(starsRef)
              .then((url) => {
                imgAluno.src = `${url}`
              })
              .catch((error) => {
                console.log(error)
              });
    
        } catch {}

    }
});