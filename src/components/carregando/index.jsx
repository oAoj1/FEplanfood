import './Carregando.css'

import ClipLoader from "react-spinners/ClipLoader";

export default function Carregando(){
    return(
        <div className="carregando">
            <ClipLoader color="#000" size={50}/>
            <p>Carregando...</p>
        </div>
    )
}