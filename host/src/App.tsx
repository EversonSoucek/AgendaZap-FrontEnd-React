import LoginPage from "./pages/LoginPage/LoginPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { EsqueciSenhaPage } from "./pages/EsqueciSenhaPage/EsqueciSenhaPage";
import { EmpresaProvider } from "./context/EmpresaContext";

function App() {
	return (
		<Router>
			<EmpresaProvider>
				<Routes>
					<Route path="/:idEmpresa" element={<LoginPage />} />
					<Route path="/:idEmpresa/esqueciSenha" element={<EsqueciSenhaPage />} />
					<Route path="/notfound" element={<NotFoundPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</EmpresaProvider>
		</Router >
	)
}

export default App
