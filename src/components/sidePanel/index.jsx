import './SidePanel.css';

import { Link } from 'react-router-dom'

export default function SidePanel() {

    const opcoes = [
        {rota:'',label:'início'},
        {rota:'alimentos',label:'alimentos'},
        {rota:'refeicoes',label:'refeicoes'}
    ]

    return (
        <div className='sidePanel'>
            <div className="headerPanel">
                <h2>PlanFood</h2>
            </div>

            <ul className="opcoesPanel">
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
    )
}
