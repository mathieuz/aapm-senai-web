import { db, storage } from "../module.js"

import { getDocs, collection, query, where, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const colecao = collection(db, "Aluno")
const arrayDocumentos = await getDocs(colecao)

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

arrayDocumentos.forEach(async (d) => {
    const solicitacao = doc(db, "Aluno", d.id, "solicitacoes", "solicitacao")
    const docSolicitacao = await getDoc(solicitacao)

    if (docSolicitacao.exists() && docSolicitacao.get("obs").length === 0) {
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

          document.getElementsByClassName("inputDados")[1].value = docSolicitacao.get("blusao") == true ? "Solicitado - " : "Não Solicitado"
          document.getElementsByClassName("inputDados")[1].value += docSolicitacao.get("tamanhoBlusa") == "tamanho " ? " tamanho P - " : `${docSolicitacao.get("tamanhoBlusa")} `
          document.getElementsByClassName("inputDados")[1].value += docSolicitacao.get("qntBlusa") == 0 ? "Quantidade: 1" : `Quantidade: ${docSolicitacao.get("qntBlusa")}`

          document.getElementsByClassName("inputDados")[2].value = docSolicitacao.get("camiseta") == true ? "Solicitado - " : "Não Solicitado"
          document.getElementsByClassName("inputDados")[2].value += docSolicitacao.get("tamanhoCamisa") == "tamanho " ? " tamanho P - " : `${docSolicitacao.get("tamanhoCamisa")} `
          document.getElementsByClassName("inputDados")[2].value += docSolicitacao.get("qntCamisa") == 0 ? "Quantidade: 1" : `Quantidade: ${docSolicitacao.get("qntCamiseta")}`

          document.getElementsByClassName("inputDados")[3].value = docSolicitacao.get("jaleco") == true ? "Solicitado - " : "Não Solicitado"
          document.getElementsByClassName("inputDados")[3].value += docSolicitacao.get("tamanhoJaleco") == "tamanho " ? " tamanho P - " : `${docSolicitacao.get("tamanhoJaleco")} `
          document.getElementsByClassName("inputDados")[3].value += docSolicitacao.get("qntJaleco") == 0 ? "Quantidade: 1" : `Quantidade: ${docSolicitacao.get("qntCamiseta")}`

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

        //Adicionando evento para os botões de recusar/confirmar.
        document.getElementById("recusar").addEventListener("click", async () => {
          let msg = document.getElementById("obs").value

          if (String(msg).length > 0){
            const alunoRef = doc(db, "Aluno", `${d.id}`, "solicitacoes", "solicitacao")
            await updateDoc(alunoRef, {
                obs: "Solicitação Recusada: " + msg
            });

            spanPopUp[1].innerHTML = "Solicitação recusada com sucesso."
            popUp[1].style.display = "flex"

            setTimeout(() => {
                window.location.href = "../../html/painel/solicitacoes.html"
            }, 2000)

          } else {
            spanPopUp[0].innerHTML = "Detalhe nas observações antes de recusar uma solicitação"
            popUp[0].style.display = "flex"

            setTimeout(() => {
                popUp[0].style.display = "none"
            }, 3000)
          }
        })

        document.getElementById("confirmar").addEventListener("click", async () => {
          let msg = document.getElementById("obs").value

          if (String(msg).length === 0){
            msg = "Sua solicitação foi confirmada!"
          }

          const alunoRef = doc(db, "Aluno", `${d.id}`, "solicitacoes", "solicitacao")
          await updateDoc(alunoRef, {
              obs: "Solicitação Confirmada: " + msg
          });

          spanPopUp[1].innerHTML = "Solicitação confirmada com sucesso."
          popUp[1].style.display = "flex"

          setTimeout(() => {
              window.location.href = "../../html/painel/solicitacoes.html"
          }, 2000)
        })

      })

      modalRegistro.style.display = "flex"
      sectionRegistro.style.pointerEvents = "none"

    })

  }
}, 480)

/*Adicionando evento de fechar janela no elemento de fechar janela no botão.*/
document.getElementById("botaoFechar").addEventListener("click", () => {
  modalRegistro.style.display = "none"
  imgAluno.src = "../../img/icones/icon-foto-perfil.png"

  sectionRegistro.style.pointerEvents = "all"
})

//Número de registros
setTimeout(() => {
  document.getElementById("infoQtdSol").innerHTML = `Há ${arrayRegistro.length} solicitações pendentes à serem analisadas.`
}, 680)