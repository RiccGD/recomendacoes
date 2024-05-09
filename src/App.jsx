import './global.css'
import {BrowserRouter} from 'react-router-dom'
import {Rotas} from './rotas/Rotas'
import {Perfil} from './paginas/Perfil'


export function App() {
  return (
    <BrowserRouter>
     <Rotas />
    </BrowserRouter>
  )
}
