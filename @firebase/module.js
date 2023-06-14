/* Arquivo de configuração de conexão do Firebase. */

/* Configuração de conexão com o Firebase e a aplicação. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, addDoc, doc, getDocs, getDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


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
const app = initializeApp(firebaseConfig)

/* Constantes necessárias para utilização dos métodos do Firebase que serão exportadas em outros arquivos. */
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
