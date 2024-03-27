import estilos from './Lateral.module.css'
import {Gear} from '@phosphor-icons/react'

export function Lateral(){
    return(
        <aside className={ estilos.conteiner }>
            <img className={ estilos.imagemCabecalho } src='https://images.unsplash.com/photo-1613469425754-bf71d7280f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80' />

            <div className={ estilos.perfil }>
                <img className={ estilos.avatar } src='https://images.unsplash.com/photo-1637781930945-090e6672b750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1902&q=80' />
                <strong>Ralfe</strong>
            </div>
            <div className={ estilos.opcoes }>
                <p className={ estilos.botao }>
                    <Gear size={20} />
                    <strong>Perfil</strong>
                </p>
            </div>
        </aside>
    )
}
