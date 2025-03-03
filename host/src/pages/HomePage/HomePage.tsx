import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { SideBar } from "../../components/SideBar/SideBar";
import "./HomePage.css"
import { Calendario } from "../../components/Calendario/Calendario/Calendario";

export const HomePage = () => {
	const { idEmpresa } = useParams<{ idEmpresa: string }>();

	if (idEmpresa) {
		UseVerificaEmpresa(idEmpresa);
	}

	return (
		<div className="home-page">
			<div className="home-page__cabecalho">
				<Cabecalho />
			</div>
			<div className="home-page__side-bar">
				<SideBar />
			</div>
			<div className="home-page__calendario">
				<Calendario/>
			</div>
			<div className="home-page__agendamentos">
				Próximos agendamentos
			</div>
		</div>
	);
};
