import {Routes, Route} from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'
import { Filmes } from '../paginas/Filmes'
import { Perfil } from '../paginas/Perfil'
import { Sobre } from '..paginas/Sobre'


export function Rotas(){
    return(
        <Routes>

            <Route path='/' element={<Login />} />

            <Route path='/inicial' element={<Inicial />}>
                <Route index element={<Filmes />} />
                <Route path='perfil' element={<Perfil />} />
                <Route path='sobre' element={<Sobre />} />
            </Route>

        </Routes>
    )
}