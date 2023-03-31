// admin@senai.sp.gov.br - admin123
// aluno@teste.com - aluno123

/* Configuração de conexão com o Firebase e a aplicação. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, addDoc, doc, getDocs, getDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

/* Connfirguração de conexão entre a aplicação e o Firebase. */
const firebaseConfig = {
    apiKey: "AIzaSyDM0ahJj0alvS4TAXQbdhXs5GaTbvKs2Dg",
    authDomain: "senai-tcc-aapm.firebaseapp.com",
    projectId: "senai-tcc-aapm",
    storageBucket: "senai-tcc-aapm.appspot.com",
    messagingSenderId: "522581165702",
    appId: "1:522581165702:web:b891574b76e52a4272b307",
    measurementId: "G-GMJB0HWNLP"
};

/* A constante 'app' tem o método que inicializa a conexão do Firebase, além de ser utilizado como parâmetro de inicialização de módulos de conexão do Firebase. */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

/* Todos os event-listeners e e suas funções. */
    try {
        document.body.querySelector("#btnFazerLogin").addEventListener("click", fazerLogin)
        console.log(document.location.pathname + " - CARREGADO.")
    } catch {}

    try{
        document.getElementById("btnCadastrarAluno").addEventListener("click", cadastrarAluno)
        console.log(document.location.pathname + " - CARREGADO.")
    } catch {}

    try{

        if (document.location.pathname.includes("/todos-os-alunos.html") || document.location.pathname.includes("/solicitacoes.html")){
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
            })
        }

        //A função adicionarFuncaoModal() executa somente quando todos os registros forem carregados.
        adicionarFuncaoModal()

    } catch {}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/* Funções respectivas de cada event-listener. */

    /* Função de login na plataforma. */
    function fazerLogin(){

        let email = document.getElementById("inputEmail").value
        let senha = document.getElementById("inputSenha").value

        const autenticacao = getAuth()
        signInWithEmailAndPassword(autenticacao, email, senha)
            .then((userCredential) => {
                alert("[SUCESSO] E-mail autenticado com sucesso.")
                window.location.href = "./painel.html"

            })
            .catch((error) => {
                alert("[ERRO] E-mail não corresponde dentro dos e-mails registrados.")
            });
    }

    /* cadastrar-aluno.html - Função de Cadastro de Aluno. */
    function cadastrarAluno(){
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
    }

    /*
    if (window.location.pathname === "/html/painel/alunos/todos-os-alunos.html"){

        const colecao = collection(db, "Aluno")

        const arrayDocumentos = await getDocs(colecao)

        arrayDocumentos.forEach(doc => {
            console.log(doc.get("nome"))
        })

    }
    */

    function adicionarFuncaoModal(){
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
                })

                modalRegistro.style.display = "flex"
            })
        }

        /*Adicionando evento de fechar janela no elemento de fechar janela.*/
        document.getElementById("botaoFechar").addEventListener("click", () => {
            modalRegistro.style.display = "none"
        })
    }

