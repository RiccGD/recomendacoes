import estilos from './login.module.css'

export function Login(){
    <div className={estilos.conteiner}>
        <form className={estilos.formu}>

            <input 
            placeholder='Usuário' 
            className={estilos.campo}/>

            <input 
            placeholder='Senha' 
            className={estilos.campo}/>

            <button className={estilos.botao}>Entrar</button>
        </form>
    </div>
}