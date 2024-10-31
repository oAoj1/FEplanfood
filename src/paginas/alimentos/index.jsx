import './Alimentos.css'

import { useState } from 'react'

import { IoIosClose, IoIosAdd } from "react-icons/io"

import SidePanel from "../../components/sidePanel";

import ListaAlimentos from './listaAlimentos/listaAlimentos'

import api from '../../api/api';

export default function Alimentos(){

    const [isOpenAddAlimento,setIsOpenAddAlimento] = useState(false)

    var gruposAlimentos = [
        "cereais",
        "vegetais",
        "frutas",
        "leguminosas",
        "proteinas",
        "laticinios",
        "gorduras",
        "doces"
    ]

    const [novoAlimento,setNovoAlimento] = useState({
        alimento:'',
        grupo:''
    })

    async function criarAlimento(e){
        e.preventDefault()

        const confirmar = window.confirm(`Deseja adicionar ${novoAlimento.alimento} em ${novoAlimento.grupo}?`)

        if(confirmar){
            await api.post(`/alimentos`,novoAlimento)
                .then(() => {
                    alert(`${novoAlimento.alimento} adicionado com sucesso!`)
                    location.reload()
                })
                .catch((err) => {
                    alert('Erro ao inserir novo alimento')
                    console.log(err)
                })
        }
    }

    const listaAlimentos = [
        {
            grupo:'cereais',
            componente:<ListaAlimentos props='cereais'/>
        },
        {
            grupo:'proteinas',
            componente:<ListaAlimentos props='proteinas'/>
        },
        {
            grupo:'leguminosas',
            componente:<ListaAlimentos props='leguminosas'/>
        },
        {
            grupo:'frutas',
            componente:<ListaAlimentos props='frutas'/>
        },
        {
            grupo:'vegetais',
            componente:<ListaAlimentos props='vegetais'/>
        },
        {
            grupo:'doces',
            componente:<ListaAlimentos props='doces'/>
        },
        {
            grupo:'gorduras',
            componente:<ListaAlimentos props='gorduras'/>
        },
        {
            grupo:'laticinios',
            componente:<ListaAlimentos props='laticinios'/>
        }
    ]

    return(
        <div style={{display:"flex",alignItems:'flex-start'}}>
            <SidePanel/>

            <div className="alimentosContainer">

                <div className="criarAlimentoContainer">
                    <h1>alimentos</h1>

                    <button onClick={() => setIsOpenAddAlimento(true)}>
                        <IoIosAdd color='#000'/>
                    </button>
                </div>

                {isOpenAddAlimento ? 
                    <div className="overlayForm">
                        
                        <div className="formContainer">
                            <form
                                className='formCriarAlimento'
                                onSubmit={criarAlimento}
                            >
                                <div className="tituloForm">
                                    <IoIosClose
                                        onClick={() => setIsOpenAddAlimento(false)}
                                    />
                                    <h2>Adicionar Alimento</h2>
                                </div>

                                <input
                                    type="text" 
                                    placeholder='Alimento'
                                    required
                                    onChange={e => setNovoAlimento({
                                        ...novoAlimento,
                                        alimento:e.target.value
                                    })}
                                />
                                
                                <select 
                                    required
                                    onChange={e => setNovoAlimento({
                                        ...novoAlimento,
                                        grupo:e.target.value
                                    })}
                                >
                                    <option value="" disabled selected>
                                        Escolha o grupo alimentar
                                    </option>

                                    {gruposAlimentos.map(grupo => (
                                        <option>{grupo}</option>
                                    ))}
                                </select>
            
                                <button>Enviar</button>
                            </form>
                        </div>
            
                    </div>
                : ''}

                <ul className="listaAlimentosContainer">
                    {listaAlimentos.map(alimentos => (
                        <li 
                            key={alimentos._id} 
                            className='alimentos'
                        >
                            <h2>{alimentos.grupo}</h2>
                            {alimentos.componente}
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    )
}