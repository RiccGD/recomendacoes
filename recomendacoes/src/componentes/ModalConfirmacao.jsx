import estilos from './ModalConfirmacao.module.css'
import {useState} from 'react'
import {ModalMensagem} from '../componentes/ModalMensagem'
import {useNavigate} from 'react-router-dom'

const usuarioTipo = {
    codigo: '',
    nome: '',
    email: '',
    senha: '',
    foto: '',
    permissao: ''
}

export function ModalConfirmacao({ exibir, 
                                   ocultar, 
                                   titulo, 
                                   texto, 
                                   operacao = '', 
                                   usuarioProps = usuarioTipo, 
                                   pagina = ''}) {

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')
    const [modalMensagemPagina, setModalMensagemPagina] = useState('')

    const navegacao = useNavigate()

    async function confirmar(){

        try {
            console.log('Alteração/Exclusão de usuário')

        } catch (error) {
            setModalMensagemPagina('usuarios')
            setModalMensagemTitulo('Erro na exclusão do usuário')
            setModalMensagemTexto(`Por favor, entre em contato com o suporte e informe esse código: ${error.code}`)
            exibirModal()
        }
    }

    function exibirModal(){
        setModalMensagemVisivel(true)
    }

    function ocultarModal(){
        setModalMensagemVisivel(false)
    }

    if (exibir) {

        return(
            <div className={estilos.conteiner}>

                <p className={estilos.titulo}>{titulo}</p>

                <div className={estilos.conteinerMensagem}>
                    <p className={estilos.mensagem}>{texto}</p>
                </div>
                
                <div className={estilos.conteinerBotoes}>
                    <button 
                        className={estilos.botao}
                        onClick={confirmar}
                    >Confirmar</button>

                    <button 
                        className={estilos.botao}
                        onClick={ocultar}
                    >Cancelar</button>
                </div>


                <ModalMensagem 
                    exibir={modalMensagemVisivel}
                    ocultar={() => ocultarModal()}  
                    titulo={modalMensagemTitulo}       
                    mensagem={modalMensagemTexto}
                    pagina={modalMensagemPagina}
                />

            </div>
        )    
    }
}