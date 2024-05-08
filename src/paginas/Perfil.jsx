import estilos from './perfil.module.css'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'


const perfilSchema = z.object({

    nome: z.string()
      .min(2, 'Informe um nome')
      .max(25, 'Máximo de 25 caracteres foi atingido'),

    email: z.string()
      .email({message: 'Informe um E-mail válido!'}),

    usuario: z.string()
      .min(5, 'Minimo de 5 caracteres!')
      .max(10, 'Máximo de 10 caracteres!'),

    senha: z.string()
      .min(6, 'Minimo de 6 caracteres!')
      .max(6, 'Máximo de 6 caracteres atingido!')
})

export function Perfil(){

    const {register,
         handleSubmit,
         formState: {erros}
        } = useForm({
            resolver: zodResolver(perfilSchema)
        })


    function obterDadosForm(data){
        console.log(data)
    }


    return(
    <div className={estilos.conteiner}>

        <p className={estilos.titulo}>Perfil</p>

        <form className={estilos.formu}
        onSubmit={handleSubmit(obterDadosForm)}
        >

            <input 
            {...register('nome')}
            placeholder='Nome' 
            className={estilos.campo}
            />

            {erros.nome && (
                <p className={estilos.mensagem}>{erros.nome.message}</p>
            )}

            <input 
            {...register('email')}
            placeholder='E-mail' 
            className={estilos.campo}
            />

            {erros.email && (
                <p className={estilos.mensagem}>{erros.email.message}</p>
            )}

            <input 
            {...register('usuario')}
            placeholder='Usuário' 
            className={estilos.campo}
            />

            {erros.usuario && (
                <p className={estilos.mensagem}>{erros.usuario.message}</p>
            )}

            <input 
            {...register('senha')}
            placeholder='Senha' 
            className={estilos.campo}
            />

            {erros.senha && (
                <p className={estilos.mensagem}>{erros.senha.message}</p>
            )}

            <button className={estilos.botao}
            type='submit'>
                Confirmar</button>
        </form>
    </div>
)}