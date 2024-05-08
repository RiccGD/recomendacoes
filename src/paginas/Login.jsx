import { useState } from 'react'
import estilos from './login.module.css'

export function Login(){

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    function obterDadosForm(e){

        e.preventDefault()

        console.log(`Usuario: ${usuario}`)
        console.log(`Senha: ${senha}`)
    }

    return(
    <div className={estilos.conteiner}>

        <form className={estilos.formu}
        onSubmit={obterDadosForm}
        >

            <input 
            placeholder='Usuário' 
            className={estilos.campo}
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            />

            <input 
            placeholder='Senha' 
            className={estilos.campo}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            />

            <button className={estilos.botao}
            type='submit'>
                Entrar</button>
        </form>
    </div>
)}