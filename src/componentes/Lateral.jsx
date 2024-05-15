import estilos from './Lateral.module.css'
import {FilmSlate, Gear} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export function Lateral(){
    return(
        <aside className={ estilos.conteiner }>
            <header>
            <img className={ estilos.imagemCabecalho } src='https://images.unsplash.com/photo-1613469425754-bf71d7280f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80' />

            <div className={ estilos.perfil }>
                <img className={ estilos.avatar } src='https://images.unsplash.com/photo-1637781930945-090e6672b750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1902&q=80' />
                <strong>Ralfe</strong>
            </div>
            </header>
            <section className={ estilos.opcoes }>

                <Link className={ estilos.botao }
                to={'/Perfil'}>

                    <Gear size={20} />
                    <strong>Perfil</strong>
                </Link>

                <Link className={ estilos.botao }
                to={'/inicial'}>
                    <FilmSlate size={20} />
                    <strong>Filmes</strong>
                </Link>

                <Link className={ estilos.botao }
                to={'/sobre'}>
                    <FilmSlate size={20} />
                    <strong>Sobre</strong>
                </Link>

            </section>
        </aside>
    )
}
