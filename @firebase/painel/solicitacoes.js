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
        console.log("Subcoleção: ", typeof docSolicitacao.get("jaleco"))

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

/*Acessando a section contêiner de todos os registros.*/
let sectionRegistro = document.getElementById("sectionRegistro")

/*Acessando o Modal.*/
let modalRegistro = document.getElementById("modalRegistro")

/*Acessando o array de todos os registros.*/
let arrayRegistro = document.getElementsByClassName("registroItem")

setTimeout(() => {
  for (let i = 0; i < arrayRegistro.length; i++){
    arrayRegistro[i].addEventListener("click", async () => {

      const matricula = document.getElementsByClassName("valueMatricula")[i].value
      const busca = query(colecao, where("numMatricula", "==", matricula))
      const resultadoBusca = await getDocs(busca)

      resultadoBusca.forEach(async (d) => {
        const solicitacao = doc(db, "Aluno", d.id, "solicitacoes", "solicitacao")
        const docSolicitacao = await getDoc(solicitacao)

        if (docSolicitacao.exists()){
          document.getElementById("nomeAluno").innerHTML = d.get("nome")

          document.getElementsByClassName("inputDados")[0].value = docSolicitacao.get("material") == true ? "Solicitado" : "Não Solicitado"

          document.getElementsByClassName("inputDados")[1].value = docSolicitacao.get("blusao") == true ? "Solicitado" : "Não Solicitado"

          document.getElementsByClassName("inputDados")[2].value = docSolicitacao.get("camiseta") == true ? "Solicitado" : "Não Solicitado"

          document.getElementsByClassName("inputDados")[3].value = docSolicitacao.get("jaleco") == true ? "Solicitado" : "Não Solicitado"

          document.getElementsByClassName("inputDados")[4].value = docSolicitacao.get("chave") == true ? "Solicitado" : "Não Solicitado"

          document.getElementsByClassName("inputDados")[5].value = docSolicitacao.get("semestralidade") == true ? "Solicitado" : "Não Solicitado"

          try{

            //Adiciona imagem.
            const storage = getStorage();
            const starsRef = ref(storage, `images/${d.get("email")}`)
            
            getDownloadURL(starsRef)
              .then((url) => {
                imgAluno.src = `${url}`
              })
              .catch((error) => {
                
              });
    
        } catch {}
        }

      })

      modalRegistro.style.display = "flex"
      sectionRegistro.style.pointerEvents = "none"

    })
  }
}, 470)

/*Adicionando evento de fechar janela no elemento de fechar janela no botão.*/
document.getElementById("botaoFechar").addEventListener("click", () => {
  modalRegistro.style.display = "none"
  imgAluno.src = "../../img/icones/icon-foto-perfil.png"

  sectionRegistro.style.pointerEvents = "all"
})