import estilos from './Usuarios.module.css'
import {useEffect, useState} from 'react'
import {Trash, Gear} from '@phosphor-icons/react'
import {ModalUsuarios} from '../componentes/ModalUsuarios'
import {ModalConfirmacao} from '../componentes/ModalConfirmacao'
import {useForm} from 'react-hook-form'
import { bd } from '../firebase/firebaseConexao'
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'

const usuarioTipo = {
    codigo: '',
    nome: '',
    email: '',
    senha: '',
    foto: '',
    permissao: ''
}

export function Usuarios(){

    const [todosUsuarios, setTodosUsuarios] = useState([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(usuarioTipo)
    
    const [modalUsuariosVisivel, setModalUsuariosVisivel] = useState(false)
    const [modalUsuariosTitulo, setModalUsuariosTitulo] = useState('')
    const [modalUsuariosOperacao, setModalUsuariosOperacao] = useState('')

    const [modalConfirmacaoVisivel, setModalConfirmacaoVisivel] = useState(false)
    const [modalConfirmacaoTitulo, setModalConfirmacaoTitulo] = useState('')
    const [modalConfirmacaoTexto, setModalConfirmacaoTexto] = useState('')
    const [modalConfirmacaoPagina, setModalConfirmacaoPagina] = useState('usuarios')

    const {register, handleSubmit} = useForm()


    useEffect( () => {

        onSnapshot( collection(bd, 'usuarios'), (colecaoUsuarios) => {

            let listaUsuarios = []

            colecaoUsuarios.forEach( (cadaUsuario) => {

                listaUsuarios.push({
                    codigo: cadaUsuario.id,
                    nome: cadaUsuario.data().nome,
                    email: cadaUsuario.data().email,
                    senha: cadaUsuario.data().senha,
                    foto: cadaUsuario.data().foto,
                    permissao: cadaUsuario.data().permissao
                })
                
            } )


        })

    }, [])

    function criarUsuario(){
        setModalUsuariosTitulo('Novo usuário')
        setModalUsuariosOperacao('inclusao')
        exibirModal('usuarios')
    }

    function alterarUsuario(usuario) {
        setModalUsuariosTitulo('Alterar usuário')
        setModalUsuariosOperacao('alteracao')
        setUsuarioSelecionado(usuario)
        exibirModal('usuarios')
    }

    function excluirUsuario(usuario) {
        setUsuarioSelecionado(usuario)
        setModalConfirmacaoTitulo('Exclusão')
        setModalConfirmacaoTexto(`Confirma a exclusão do usuário: `)

        exibirModal('confirmacao')

    }


    async function buscaUsuario(data){

    }


    function exibirModal(modal){
        modal == 'usuarios' ? setModalUsuariosVisivel(true) : setModalConfirmacaoVisivel(true)
    }

    function ocultarModal(modal){
        modal == 'usuarios' ? setModalUsuariosVisivel(false) : setModalConfirmacaoVisivel(false)
    }

    return(
        <div className={estilos.conteiner}> 

            <p className={estilos.titulo}>Usuários</p>

            <div className={estilos.conteinerNovo}>
                <button 
                    className={estilos.botaoNovo}
                    onClick={criarUsuario}
                    type='button'
                >Novo usuário</button>            
            </div>

            <form 
                className={estilos.formularioBusca}
                onSubmit={handleSubmit(buscaUsuario)}
            >

                <input 
                    {...register('nomeBusca')}
                    className={estilos.busca}
                    placeholder='Busca por nome'
                />

                <button 
                    className={estilos.botao}
                >Buscar</button>

            </form>

            <table className={estilos.tabela}>
                <thead>
                    <tr className={estilos.tabelaLinhaCabecalho}>
                        <th className={estilos.tabelaPrimeiraColuna}>Código</th>
                        <th className={estilos.tabelaColuna}>Nome</th>
                        <th className={estilos.tabelaColuna}>E-mail</th>
                        <th className={estilos.tabelaColuna}>Senha</th>
                        <th className={estilos.tabelaColuna}>Permissão</th>
                        <th className={estilos.tabelaColunaOperacoes}>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={estilos.tabelaLinha}>
                        <td className={estilos.tabelaPrimeiraColuna}>Codigo</td>
                        <td className={estilos.tabelaColuna}>Nome</td>
                        <td className={estilos.tabelaColuna}>Email</td>
                        <td className={estilos.tabelaColuna}>Senha</td>
                        <td className={estilos.tabelaColuna}>Permissao</td>
                        <td className={estilos.tabelaColunaOperacoes}>
                            <button 
                                className={estilos.alterar}
                                onClick={() => alterarUsuario()}
                            >
                                <Gear 
                                    size={24}
                                    color='#ffba08'
                                    weight='duotone'
                                />
                            </button>                                    
                            <button 
                                className={estilos.excluir}
                                onClick={() => excluirUsuario()}
                            >
                                <Trash 
                                    size={24}
                                    color='#d00000'
                                    weight='duotone'
                                />
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>

            <ModalConfirmacao 
                exibir={modalConfirmacaoVisivel}
                ocultar={() => ocultarModal('mensagem')}  
                titulo={modalConfirmacaoTitulo}       
                texto={modalConfirmacaoTexto}   
                usuarioProps={usuarioSelecionado}   
                operacao={modalUsuariosOperacao}
                pagina={modalConfirmacaoPagina}
            />

            <ModalUsuarios 
                exibir={modalUsuariosVisivel}
                ocultar={() => ocultarModal('usuarios')}  
                titulo={modalUsuariosTitulo}       
                usuarioProps={usuarioSelecionado}   
                operacao={modalUsuariosOperacao}
            />

        </div>
    )
}
