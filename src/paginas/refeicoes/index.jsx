import './Refeicoes.css'

import SidePanel from "../../components/sidePanel";

import Dia from './dias/Dia';

export default function Refeicoes(){

    const semana = [
        {dia:'domingo',componente:<Dia props='domingo'/>},
        {dia:'segunda',componente:<Dia props='segunda'/>},
        {dia:'terca',componente:<Dia props='terca'/>},
        {dia:'quarta',componente:<Dia props='quarta'/>},
        {dia:'quinta',componente:<Dia props='quinta'/>},
        {dia:'sexta',componente:<Dia props='sexta'/>},
        {dia:'sabado',componente:<Dia props='sabado'/>}
    ]

    return(
        <div style={{display:"flex",alignItems:'flex-start'}}>
            <SidePanel/>

            <div className="refeicaoContainer">
                <h1>refeições</h1>
                
                <ul className="semanaToda">
                    {semana.map(dia => (
                        <li 
                            className='semanaContainer' 
                            key={dia._id}
                        >
                            <h2>{dia.dia}</h2>
                            {dia.componente}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}