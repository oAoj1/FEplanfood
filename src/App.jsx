import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Inicio from './paginas/inicio'
import Alimentos from "./paginas/alimentos"
import Refeicoes from "./paginas/refeicoes"

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/alimentos' element={<Alimentos/>}/>
        <Route path='/refeicoes' element={<Refeicoes/>}/>
      </Routes>
    </Router>
     
  )
}