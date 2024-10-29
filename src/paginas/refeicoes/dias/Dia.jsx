import './Dia.css'

import { useState, useEffect } from "react"

import { IoIosClose, IoIosAdd } from "react-icons/io"

import api from "../../../api/api"

export default function Dia({ props }) {

    const gruposAlimentos = [
        "cereais",
        "vegetais",
        "frutas",
        "leguminosas",
        "proteinas",
        "laticinios",
        "gorduras",
        "doces"
    ];

    const [dia, setDia] = useState([]);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [idAtual, setIdAtual] = useState('');
    const [inserirGrupo, setInserirGrupo] = useState('');
    const [grupoSelecionado, setGrupoSelecionado] = useState([]);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState('');

    useEffect(() => {
        async function lerRefeicao() {
            const response = await api.get(`/refeicoes/${props}`);
            setDia(response.data);
        }

        lerRefeicao();

        async function lerAlimentosGrupo() {
            const response = await api.get(`/alimentos/filtrar?grupo=${inserirGrupo}`);
            setGrupoSelecionado(Array.isArray(response.data) ? response.data : []);
        }

        if (inserirGrupo) {
            lerAlimentosGrupo();
        }

    }, [props, inserirGrupo]);

    async function criarAlimento(e) {
        e.preventDefault();

        const confirmar = window.confirm('Deseja adicionar alimento?')

        if(confirmar){
            try {
                await api.post(`/refeicoes/${idAtual}/alimentos/${alimentoSelecionado}`);
    
                alert('Alimento inserido com sucesso!');
    
                setIsOpenForm(false);
                location.reload();
    
            } catch (error) {
                alert('Erro, confira o console');
                console.log(error);
    
            }

        }

    }

    async function deletarAlimento(idRefeicao,idAlimento){
        const confirmar = window.confirm('Deseja deletar alimento?')

        if(confirmar){
            try{
                await api.delete(`/refeicoes/${idRefeicao}/alimentos/${idAlimento}`)
                alert('Alimento deletado')
                location.reload()
    
            }catch(error){
                alert('Erro, confira o console')
                console.log(error)
            }

        }
    }

    return (
        <ul className="dia">
            {dia.map(dia => (
                <li key={dia._id}>
                    <div className="tituloDia">
                        <h3>{dia.refeicao}</h3>
                        <IoIosAdd 
                            onClick={() => {
                                setIsOpenForm(true);
                                setIdAtual(dia._id);
                            }}
                        />
                    </div>

                    {isOpenForm && dia._id === idAtual ? 
                        <div className="overlayForm">
                            <div className="formContainer">
                                <form
                                    className='formCriarAlimento'
                                    onSubmit={criarAlimento}
                                >
                                    <div className="tituloForm">
                                        <IoIosClose
                                            onClick={() => setIsOpenForm(false)}
                                        />
                                        <h2>Adicionar Alimento</h2>
                                    </div>

                                    <p className='diaRefeicao'>
                                        {dia.refeicao} - {dia.dia}
                                    </p>

                                    <select
                                        required
                                        onChange={e => setInserirGrupo(e.target.value)}
                                    >
                                        <option value="" disabled selected>
                                            Escolha o grupo alimentar
                                        </option>

                                        {gruposAlimentos.map(grupo => (
                                            <option key={grupo}>
                                                {grupo}
                                            </option>
                                        ))}
                                    </select>

                                    {inserirGrupo && (
                                        <select
                                            required
                                            onChange={e => setAlimentoSelecionado(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Escolha o alimento
                                            </option>
                                            {grupoSelecionado.map(grupo => (
                                                <option key={grupo._id} value={grupo._id}>
                                                    {grupo.alimento}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    <button type="submit">
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                    : ''}

                    <ul className='alimentosDia'>
                        {dia.alimentos.map(alimentos => (
                            <li key={alimentos._id}>
                                <p>{alimentos.alimento}</p>
                                <IoIosClose 
                                    onClick={() => deletarAlimento(dia._id,alimentos._id)}
                                />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
