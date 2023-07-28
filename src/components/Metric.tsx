import { ReactNode } from 'react'
import style from './Metric.module.css'

type props = { //Tipo das propriedades que 
  children: ReactNode
  title: string
}

export function Metric ({children, title}: props) { //Criando o componente Metric
  return (
    <div className={style.container}> 
      <p className={style.title}>{title}</p> {/* O título é passado como propriedade */}
      <div className={style.content}>{children}</div> {/* O conteúdo é passado como filho */}
    </div>
  )
}