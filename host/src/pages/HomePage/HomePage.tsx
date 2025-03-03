import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { SideBar } from "../../components/SideBar/SideBar";
import "./HomePage.css"

export const HomePage = () => {
	const { idEmpresa } = useParams<{ idEmpresa: string }>();

	if (idEmpresa) {
		UseVerificaEmpresa(idEmpresa);
	}

	return (
		<div className="home-page">
			<Cabecalho />
			<div className="home-page__side-bar">
				<SideBar />
			</div>
			
		</div>
	);
};
