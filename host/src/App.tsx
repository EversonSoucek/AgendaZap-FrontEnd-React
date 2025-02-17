import { EsqueciSenhaPage } from "./pages/EsqueciSenhaPage/EsqueciSenhaPAge";
import LoginPage from "./pages/LoginPage/LoginPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:idEmpresa" element={<LoginPage />} />
        <Route path="/:idEmpresa/esqueciSenha" element={<EsqueciSenhaPage />} />
        <Route path="/notfound" element={<NotFoundPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
