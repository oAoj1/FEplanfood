import './listaAlimentos.css'

import { useEffect, useState } from "react"

import api from "../../../api/api"

import Carregando from '../../../components/carregando'

export default function ListaAlimentos({props}){

    const [listaAlimentos,setListaAlimentos] = useState([])

    useEffect(() => {
        async function lerListaAlimentos(){
            const response = await api.get(`/alimentos/filtrar?grupo=${props}`)
            const data = response.data

            setListaAlimentos(data)
        }

        lerListaAlimentos()
    },[])

    if(listaAlimentos.length == 0){
        return <Carregando/>
        
    }else{
        return(
            <ul className="listaAlimentos">
                {listaAlimentos.map(alimentos => (
                    <li key={alimentos._id}>
                        <p>{alimentos.alimento}</p>
                    </li>
                ))}
            </ul>
        )

    }

}