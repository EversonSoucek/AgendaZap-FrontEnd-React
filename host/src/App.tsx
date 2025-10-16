import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmpresaProvider } from "./context/EmpresaContext";
import { CalendarioProvider } from "./context/CalendarioContext";

// Páginas
import LoginPage from "./pages/LoginPage/LoginPage";
import EsqueciSenhaPage from "./pages/EsqueciSenhaPage/EsqueciSenhaPage";
import { EsqueciSenhaConfirmacaoPage } from "./pages/EsqueciSenhaConfirmacaoPage/EsqueciSenhaConfirmacaoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { DashboardLayout } from "./components/DashboardLayout/DashboardLayout";
import FuncionariosListPage from "./pages/FuncionariosPage/FuncionariosListPage";
import FuncionariosEditPage from "./pages/FuncionariosPage/FuncionariosEditPage";
import FuncionariosCreatePage from "./pages/FuncionariosPage/FuncionariosCreatePage";
import ClienteListPage from "./pages/ClientesPage/ClienteListPage";

// Layout compartilhado

function App() {
	return (
		<Router>
			<EmpresaProvider>
				<Routes>
					{/* Rotas públicas (sem cabeçalho e sidebar) */}
					<Route path="/:idEmpresa" element={<LoginPage />} />
					<Route path="/:idEmpresa/esqueciSenha" element={<EsqueciSenhaPage />} />
					<Route path="/:idEmpresa/esqueciSenhaConfirma" element={<EsqueciSenhaConfirmacaoPage />} />

					{/* Rotas protegidas com layout compartilhado */}
					<Route element={<DashboardLayout />}>
						<Route
							path="/:idEmpresa/home"
							element={
								<CalendarioProvider>
									<HomePage />
								</CalendarioProvider>
							}
						/>
						<Route
							path="/:idEmpresa/funcionarios"
							element={
								<CalendarioProvider>
									<FuncionariosListPage />
								</CalendarioProvider>
							}
						/>
						<Route
							path="/:idEmpresa/funcionarios/adicionar"
							element={
								<CalendarioProvider>
									<FuncionariosCreatePage />
								</CalendarioProvider>
							}
						/>
						<Route
							path="/:idEmpresa/funcionarios/:id"
							element={
								<CalendarioProvider>
									<FuncionariosEditPage />
								</CalendarioProvider>
							}
						/>
						<Route
							path="/:idEmpresa/clientes"
							element={
								<CalendarioProvider>
									<ClienteListPage />
								</CalendarioProvider>
							}
						/>
					</Route>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</EmpresaProvider>
		</Router>
	);
}

export default App;
