import estilos from './Perfil.module.css'
import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {ModalMensagem} from '../componentes/ModalMensagem'
import {ModalConfirmacao} from '../componentes/ModalConfirmacao'
import {autenticacao} from '../firebase/firebaseConexao'
import {onAuthStateChanged} from 'firebase/auth'


const usuarioTipo = {
    codigo: '',
    nome: '',
    email: '',
    senha: '',
    foto: '',
    permissao: ''
}

const perfilSchema = z.object({

    nome: z.string()
           .min(2, 'Informe um nome!')
           .max(25, 'Máximo de 25 caracteres!'),
    
    email: z.string()
           .email({message: 'Informe um e-mail válido!'}),

    senha: z.string()
           .length(6, {message: 'Defina uma senha com 6 caracteres!'}),

    foto: z.string()
           .min(5, 'Informe o caminho completo!')
           .max(50, 'Máximo de 50 caracteres!'),      

    permissao: z.string()
                .min(5, 'Informe uma permissão válida!')
                .max(50, 'Máximo de 50 caracteres!')
})

export function Perfil() {

    const [usuarioLogado, setUsuarioLogado] = useState(usuarioTipo)

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')

    const [modalConfirmacaoVisivel, setModalConfirmacaoVisivel] = useState(false)
    const [modalConfirmacaoTitulo, setModalConfirmacaoTitulo] = useState('')
    const [modalConfirmacaoTexto, setModalConfirmacaoTexto] = useState('')
    const [modalConfirmacaoPagina, setModalConfirmacaoPagina] = useState('perfil')

    const { register, handleSubmit, formState: {errors}
    } = useForm({ resolver: zodResolver(perfilSchema) })


    useEffect(() => {
        verificaUsuarioLogado()
    }, [])


    async function verificaUsuarioLogado(){
        onAuthStateChanged(autenticacao, (usuarioAutenticado) => {
            
        })
    }


    async function alterarUsuario(data){

        try {
            console.log('Alteração de usuário')

        } catch (error) {
            
            setModalMensagemTitulo('Erro na alteração do usuário')
            setModalMensagemTexto(`Por favor, entre em contato com o suporte e informe esse código: ${error.code}`)
            exibirModal('mensagem')
        }
    }


    function excluirUsuario(){

        setModalConfirmacaoTitulo('Exclusão')
        setModalConfirmacaoTexto(`Confirma a exclusão do usuário: ${usuarioLogado.nome}`)

        exibirModal('confirmacao')
    }


    function cancelarExclusao(){
        verificaUsuarioLogado()
    }


    // Controle das telas modais (uma tela modal)
    function exibirModal(modal){
        modal == 'mensagem' ? setModalMensagemVisivel(true) : setModalConfirmacaoVisivel(true)
    }

    function ocultarModal(modal){
        modal == 'mensagem' ? setModalMensagemVisivel(false) : setModalConfirmacaoVisivel(false)
    }

    return (
        <main className={estilos.conteiner}>

            <p className={estilos.titulo}>Perfil</p>

            <form 
                className={estilos.formulario}
            >
                <input 
                    {...register('nome')}
                    className={estilos.campo}
                    placeholder='Nome' 
                    
                />
                { errors.nome ?
                    <p className={estilos.mensagem}>
                        {errors.nome.message}
                    </p>
                : null }


                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='E-mail' 
                />
                { errors.email ? 
                    <p className={estilos.mensagem}>
                        {errors.email.message}
                    </p>
                : null }

                <input 
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha' 
                />  
                { errors.senha ?
                    <p className={estilos.mensagem}>
                        {errors.senha.message}
                    </p>
                : null }

                <input 
                    {...register('foto')}
                    className={estilos.campo}
                    placeholder='Foto' 
                />            
                { errors.foto ? 
                    <p className={estilos.mensagem}>
                        {errors.foto.message}
                    </p>
                : null }

                <input 
                    {...register('permissao')}
                    className={estilos.campo}
                    placeholder='Permissão' 
                />                   
                { errors.permissao ? 
                    <p className={estilos.mensagem}>
                        {errors.permissao.message}
                    </p>
                : null }

                <button
                    className={estilos.botao}
                    onClick={handleSubmit(alterarUsuario)}
                >Confirmar alteração</button>

                <button
                    className={estilos.botao}
                    onClick={handleSubmit(excluirUsuario)}
                >Excluir conta</button>

                <button
                    className={estilos.botao}                    
                    onClick={cancelarExclusao}
                    type='button'
                >Cancelar</button>                    
        
            </form>

            <ModalMensagem 
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal('mensagem')}  
                titulo={modalMensagemTitulo}       
                mensagem={modalMensagemTexto}
            />

            <ModalConfirmacao 
                exibir={modalConfirmacaoVisivel}
                ocultar={() => ocultarModal('confirmacao')}  
                titulo={modalConfirmacaoTitulo}       
                texto={modalConfirmacaoTexto}   
                usuarioProps={usuarioLogado} 
                pagina={modalConfirmacaoPagina}
            />

        </main>
        )
}
