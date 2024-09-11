import {useState, useEffect} from "react"
import {autenticacao} from '../firebase/firebaseConexao'
import {onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export function RotasPrivadas({children}) {

    const [carregando, setCarregando] = useState(true)
    const [usuarioLogado, setUsuarioLogado] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        async function verificaUsuarioLogado(){
            onAuthStateChanged(autenticacao, (usuario) => {
                
                if(usuario){
                    setCarregando(false)
                    setUsuarioLogado(true)
                }else{
                    setCarregando(false)
                    setUsuarioLogado(false)
                }
            })
        }

        verificaUsuarioLogado()
    }, [])


    if(carregando) {
        return null 
    }
    

    if(!usuarioLogado) {
        return navigate('/')
    }

    return children
}