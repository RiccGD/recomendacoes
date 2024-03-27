import estilos from './Inicial.module.css'
import {Cabecalho} from '../componentes/Cabecalho'
import {Lateral} from '../componentes/Lateral'
import {Conteudo} from '../componentes/Conteudo'

export function Inicial() {
  return (
    <div className={estilos.gridConteiner}>
      <Cabecalho />
      <Lateral />
      <Conteudo />
    </div>
  )
}
