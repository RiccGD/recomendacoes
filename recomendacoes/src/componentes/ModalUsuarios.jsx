import estilos from './ModalUsuarios.module.css'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {ModalMensagem} from '../componentes/ModalMensagem'
import {autenticacao, bd} from '../firebase/firebaseConexao'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'


const usuarioTipo = {
    codigo: '',
    nome: '',
    email: '',
    senha: '',
    foto: '',
    permissao: ''
}

const criacaoUsuariosSchema = z.object({

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

const alteracaoUsuariosSchema = z.object({

    nome: z.string()
           .min(2, 'Informe um nome!')
           .max(25, 'Máximo de 25 caracteres!'),

    foto: z.string()
           .min(5, 'Informe o caminho completo!')
           .max(50, 'Máximo de 50 caracteres!'),      

    permissao: z.string()
                .min(5, 'Informe uma permissão válida!')
                .max(50, 'Máximo de 50 caracteres!')
})



export function ModalUsuarios({exibir, 
                               ocultar, 
                               titulo, 
                               operacao = '', 
                               usuarioProps = usuarioTipo, 
                               pagina = ''}) {


    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')
    const [modalMensagemPagina, setModalMensagemPagina] = useState('')


    const {register, handleSubmit, setValue,formState: {errors}
    } = useForm( { resolver: operacao == 'inclusao' 
                             ? zodResolver(criacaoUsuariosSchema) 
                             : zodResolver(alteracaoUsuariosSchema)} )


        useEffect( ()=> {
            if(operacao == 'inclusao'){
                setValue('nome', '')
                setValue('email', '')
                setValue('senha', '')
                setValue('foto', '')
                setValue('permissao', '')
            }else{
                setValue('nome', usuarioProps.nome)
                setValue('foto', usuarioProps.foto)
                setValue('permisao', usuarioProps.permissao)
            }
        }, [usuarioProps, operacao] )



    async function criarUsuario(data){

        try {

            const usuarioPesquisado = await getDoc( doc(bd, 'usuario',usuarioLogado.uid))
            const usuarioLogadoEmail = usuarioPesquisado.data().email
            const usuarioLogadoSenha = usuarioPesquisado.data().senha


           const NovoUsuario = await createUserWithEmailAndPassword(autenticacao, data.email, data.senha)
            ocultar()

            await setDoc(doc(bd,'usuarios',novoUsuario.user.uid), {
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                foto: data.foto,
                permissao: data.permissao
            })

            await signInWithEmailAndPassword(autenticacao, usuarioLogadoEmail, usuarioLogadoSenha)

            resizeTo()
            ocultar()
            
        } catch (error) {

            setModalMensagemPagina(pagina)
            setModalMensagemTitulo('Erro na criação do usuário')
 
            switch (error.code) {

                case 'auth/email-already-in-use':
                    setModalMensagemTexto('E-mail já utilizado!')
                    break

                case 'auth/network-request-failed':
                    setModalMensagemTexto('Falha de conexão! \nVerifique sua rede.')
                    break

                default:
                    setModalMensagemTexto(`Por favor, entre em contato com o suporte e informe esse código: ${error.code}`)
            }
            
            exibirModal()
        }       
    }

    async function alterarUsuario(data){
        
        try {
            
            console.log('Alteração de usuário')
            
            ocultar()

        } catch (error) {
            setModalMensagemPagina('usuarios')
            setModalMensagemTitulo('Erro na alteração do usuário')
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

            <div className={estilos.conteiner}
                 style={{backgroundColor: `${ pagina == 'login' ? '#1f0322' : null }` }}
            >
                <p className={estilos.titulo}
                   style={{color: `${ pagina == 'login' ? '#f5f5f5' : null }` }}
                >{titulo}</p>

                <form className={estilos.formulario}> 

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
                        hidden={ operacao !== 'inclusao' ? true : false}
                    />
                    { errors.email && operacao == 'inclusao' ? 
                        <p className={estilos.mensagem}>
                            {errors.email.message}
                        </p>
                    : null }


                    <input 
                        {...register('senha')}
                        className={estilos.campo}
                        placeholder='Senha' 
                        hidden={ operacao !== 'inclusao' ? true : false}
                    />  
                    { errors.senha && operacao == 'inclusao' ?
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
                        onClick={ operacao == 'inclusao' 
                                  ? handleSubmit(criarUsuario)
                                  : handleSubmit(alterarUsuario)}
                    >Confirmar</button>

                    <button
                        className={estilos.botao}                    
                        onClick={() => ocultar()}
                    >Cancelar</button>                    
                </form>

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