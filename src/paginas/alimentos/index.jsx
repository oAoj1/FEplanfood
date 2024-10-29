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

                <div className="listaAlimentosContainer"> 
                    <div className="alimentos">
                        <h2>cereais</h2>
                        <ListaAlimentos props='cereais'/>
                    </div>
                    <div className="alimentos">
                        <h2>proteinas</h2>
                        <ListaAlimentos props='proteinas'/>
                    </div>
                    <div className="alimentos">
                        <h2>leguminosas</h2>
                        <ListaAlimentos props='leguminosas'/>
                    </div>
                    <div className="alimentos">
                        <h2>frutas</h2>
                        <ListaAlimentos props='frutas'/>
                    </div>
                    <div className="alimentos">
                        <h2>vegetais</h2>
                        <ListaAlimentos props='vegetais'/>
                    </div>
                    <div className="alimentos">
                        <h2>doces</h2>
                        <ListaAlimentos props='doces'/>
                    </div>
                    <div className="alimentos">
                        <h2>gorduras</h2>
                        <ListaAlimentos props='gorduras'/>
                    </div>
                    <div className="alimentos">
                        <h2>laticinios</h2>
                        <ListaAlimentos props='laticinios'/>
                    </div>
                </div>

            </div>

        </div>
    )
}