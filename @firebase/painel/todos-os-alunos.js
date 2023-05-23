import { db, storage, ath } from "../module.js"

import { getDocs, collection, query, where, doc, updateDoc, getCountFromServer, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

//Conta quantidade de registros de alunos ao todo.
const coll = collection(db, "Aluno");
const snapshot = await getCountFromServer(coll);
document.getElementById("infoQtdAlunos").innerHTML = `Há ${snapshot.data().count} alunos associados à AAPM atualmente.`

const colecao = collection(db, "Aluno")
const arrayDocumentos = await getDocs(colecao)

/*Pop-up: 0 > Alerta, 1 > Sucesso.*/
let popUp = document.getElementsByClassName("popUpAvisos")
let spanPopUp = document.getElementsByClassName("spanPopUp")

//Verifica darkmode.
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let hrefCss = document.head.getElementsByTagName("link")
    let icoBusca = document.getElementById("icoBusca")

    const adminDoc = doc(db, "Administrador", user.email)
    const admin = await getDoc(adminDoc)

    if (admin.get("darkMode") == true){
      hrefCss[0].href = "../../css/painel/global-dm.css"
      hrefCss[2].href = "../../css/painel/todos-os-alunos-dm.css"
      icoBusca.src = "../../img/icones/busca-dm.png"
    }
  }
})

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

    let valueNome = document.createElement("input")
    valueNome.setAttribute("type", "hidden")
    valueNome.setAttribute("class", "valueNome")
    valueNome.value = doc.get("nome")

    let valueCurso = document.createElement("input")
    valueCurso.setAttribute("type", "hidden")
    valueCurso.setAttribute("class", "valueCurso")
    valueCurso.value = doc.get("curso")

    let valueTurma = document.createElement("input")
    valueTurma.setAttribute("type", "hidden")
    valueTurma.setAttribute("class", "valueTurma")
    valueTurma.value = doc.get("turma")

    let valueCpf = document.createElement("input")
    valueCpf.setAttribute("type", "hidden")
    valueCpf.setAttribute("class", "valueCpf")
    valueCpf.value = doc.get("cpf")

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
    registroItem.append(imgAluno, table, valueMatricula, valueNome, valueCurso, valueTurma, valueCpf)
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

            document.getElementById("idAluno").value = doc.id

            try{

                //Adiciona imagem.
                const storage = getStorage();
                const starsRef = ref(storage, `images/${doc.get("email")}`)
                
                getDownloadURL(starsRef)
                  .then((url) => {
                    imgAluno.src = `${url}`
                  })
                  .catch((error) => {
                    
                  });
        
            } catch {}
        })

        modalRegistro.style.display = "flex"
        sectionRegistro.style.pointerEvents = "none"

        //Adicionando função de edição no modal.
        document.getElementById("botaoEditar").addEventListener("click", editarInfo)

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
    try{
      document.getElementById("botaoEditar").removeEventListener("click", salvarInfo)
    } catch {}

    modalRegistro.style.display = "none"
    imgAluno.src = "../../img/icones/icon-foto-perfil.png"

    sectionRegistro.style.pointerEvents = "all"

    document.getElementById("botaoEditar").src = "../../img/icones/icon-caneta.png"
    document.getElementById("botaoEditar").title = "Editar Informações"

    for (let i = 0; i < document.getElementsByClassName("spanItemCadastral").length; i++){
      document.getElementsByClassName("spanItemCadastral")[i].removeAttribute("contenteditable")
    }

    for (let i = 0; i < document.getElementsByClassName("inputDados").length; i++){
      document.getElementsByClassName("inputDados")[i].setAttribute("readonly", "true")
    }
})

/*Função edição.*/
function editarInfo(){
  spanPopUp[2].innerHTML = "Modo de edição habilitado. Clique em salvar alterações ou feche a janela para descartar alterações."
  popUp[2].style.display = "flex"
  
  setTimeout(() => {
    popUp[2].style.display = "none"
  }, 3000)

  let btn = document.getElementById("botaoEditar")

  let inputModal = document.getElementsByClassName("inputDados")
  let spanItemCadastral = document.getElementsByClassName("spanItemCadastral")

  for (let i = 0; i < spanItemCadastral.length; i++){
    spanItemCadastral[i].setAttribute("contenteditable", "true")
  }

  for (let i = 0; i < inputModal.length; i++){
    inputModal[i].removeAttribute("readonly")
    
    btn.src = "../../img/icones/salvar.png"
    btn.title = "Salvar Alterações"
  }

  btn.removeEventListener("click", editarInfo)

  //Adiciona função de salvar as alterações.
  btn.addEventListener("click", salvarInfo)
}

async function salvarInfo(){
  let spanItemCadastral = document.getElementsByClassName("spanItemCadastral")
  let inputModal = document.getElementsByClassName("inputDados")
  
  let idAluno = document.getElementById("idAluno").value

    const salvarDados = doc(db, "Aluno", idAluno)
    await updateDoc(salvarDados, {
      nome: spanItemCadastral[0].innerHTML,
      email: spanItemCadastral[1].innerHTML,
      telefone: spanItemCadastral[2].innerHTML,
      curso: spanItemCadastral[3].innerHTML,
      dataDeNascimento: spanItemCadastral[4].innerHTML,

      numMatricula: inputModal[0].value,
      turma: inputModal[1].value,
      categoria: inputModal[2].value,
      periodo: inputModal[3].value,
      dataDeInicioCurso: inputModal[4].value,
      dataDeConclusaoCurso: inputModal[5].value,
      numArmario: inputModal[6].value,
      voucher: inputModal[7].value

    })

    spanPopUp[1].innerHTML = "Informações salvas com sucesso!"
    popUp[1].style.display = "flex"

    setTimeout(() => {
        window.location.href = window.location.href
    }, 2000)
}