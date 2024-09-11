import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB5vhLwcx9xP4bD4WsCmOqV6IzBDFWfZ5Q",
  authDomain: "riccirecomendacoes-fb.firebaseapp.com",
  projectId: "riccirecomendacoes-fb",
  storageBucket: "riccirecomendacoes-fb.appspot.com",
  messagingSenderId: "859398273205",
  appId: "1:859398273205:web:7bd66eade140318d67a6fc"


}

const conexao = initializeApp(firebaseConfig)

const autenticacao = getAuth(conexao)
const bd = getFirestore(conexao)
const repositorio = getStorage(conexao)

export {autenticacao, bd, repositorio}
