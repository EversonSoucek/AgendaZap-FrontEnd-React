import LoginPage from "./pages/LoginPage/LoginPage"
import EsqueciSenhaPage from "./pages/EsqueciSenhaPage/EsqueciSenhaPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmpresaProvider } from "./context/EmpresaContext";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
	return (
		<Router>
			<EmpresaProvider>
				<Routes>
					<Route path="/:idEmpresa" element={<LoginPage />} />
					<Route path="/:idEmpresa/esqueciSenha" element={<EsqueciSenhaPage />} />
					<Route path="/:idEmpresa/home" element={<HomePage />} />
				</Routes>
			</EmpresaProvider>
			<Routes>
				<Route path="/notfound" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router >
	)
}

export default App
