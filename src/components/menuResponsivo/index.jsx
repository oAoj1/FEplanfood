import './MenuResponsivo.css'

import { useState } from 'react';

import { IoIosMenu } from "react-icons/io";

import { IoMdClose } from "react-icons/io";

import { Link } from 'react-router-dom'

export default function MenuResponsivo(){

    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const opcoes = [
        {rota:'',label:'início'},
        {rota:'alimentos',label:'alimentos'},
        {rota:'refeicoes',label:'refeicoes'}
    ]

    window.addEventListener('resize', fecharMenu)

    function fecharMenu(){
        setIsOpenMenu(false)
    }

    return(
        <div className="menuResponsivo">
            
            {isOpenMenu ? <div className="overlay"></div> : ''}

            <IoIosMenu 
                onClick={() => setIsOpenMenu(true)}
                className='menuHamburguer'
            />

            {isOpenMenu ? 
                <div className="opcoesMenuResponsivo">
                    <div className='headerOpcoesMenuResponsivo'>
                        <h3>PlanFood</h3>
                        <IoMdClose 
                            onClick={() => setIsOpenMenu(false)}
                            className='fecharMenuHamburguer'
                        />
                    </div>

                    <ul className='opcoes'>
                        {opcoes.map(opcao => (
                            <li key={opcao}>
                                <button>
                                    <Link to={`/${opcao.rota}`}>
                                        {opcao.label}
                                    </Link>
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
            : ''}

        </div>
    )
}