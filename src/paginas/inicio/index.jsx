import './Inicio.css'

import { useState, useEffect } from 'react'

import SidePanel from '../../components/sidePanel'

import api from '../../api/api'

export default function Inicio(){

    const [refeicaoAgora, setRefeicaoAgora] = useState([])

    useEffect(() => {
        async function lerRefeicaoAgora(){
            const response = await api.get('/refeicoes/agora')
            const data = response.data

            setRefeicaoAgora([data])
        }

        lerRefeicaoAgora()
    },[])

    console.log(refeicaoAgora)

    return(
        <div style={{display:"flex",alignItems:'flex-start'}}>
            <SidePanel/>
            
            <div className="planFoodContainer">
                <h1>Início</h1>

                <hr style={{width:'800px'}} />

                <ul className="refeicaoAgora">
                    {refeicaoAgora.map(refeicao => (
                        <li key={refeicao._id}>

                            <h2>{refeicao.dia}</h2>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <h3>{refeicao.refeicao}</h3> 
                                <h4>Refeicão agora</h4>
                            </div>

                            <ul className='alimentosRefeicaoAgora'>
                                {refeicao.alimentos.map(alimento => (
                                    <li key={alimento._id}>
                                        {alimento.alimento}
                                    </li>
                                ))}
                            </ul>

                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}