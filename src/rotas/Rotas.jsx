import {Routes, Route} from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'


export function Rotas(){
    return(
        <Routes>

            <Route path='/' element={<Login />} />

            <Route path='/inicial' element={<Inicial />} />

        </Routes>
    )
}