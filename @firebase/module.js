/* Arquivo de configuração de conexão do Firebase. */

/* Configuração de conexão com o Firebase e a aplicação. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

/* Importação dos módulos de conexão do Firebase. */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, addDoc, doc, getDocs, getDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


/* Connfirguração de conexão entre a aplicação e o Firebase. */
  const firebaseConfig = {
    apiKey: "AIzaSyDysVkUi2OuEopHyk96jdn0tgaHsM-BQuM",
    authDomain: "aapm-dois.firebaseapp.com",
    projectId: "aapm-dois",
    storageBucket: "aapm-dois.appspot.com",
    messagingSenderId: "291181532064",
    appId: "1:291181532064:web:68bbdba3ce0a209bc74ac5"
  };

/* A constante 'app' tem o método que inicializa a conexão do Firebase, além de ser utilizado como parâmetro de inicialização de módulos de conexão do Firebase. */
const app = initializeApp(firebaseConfig)

/* Constantes necessárias para utilização dos métodos do Firebase que serão exportadas em outros arquivos. */
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
