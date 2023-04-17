import { auth } from "../module.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

const autenticacao = getAuth()
const usuarioAtual = autenticacao.currentUser
console.log(usuarioAtual.uid)