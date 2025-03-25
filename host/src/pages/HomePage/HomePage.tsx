import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { SideBar } from "../../components/SideBar/SideBar";
import "./HomePage.css"
import { Calendario } from "../../components/Calendario/Calendario/Calendario";
import { ProximosAgendamentos } from "../../components/ProximosAgendamentos/ProximosAgendamentos";
import { useMediaQuery } from "react-responsive";

export const HomePage = () => {
	const { idEmpresa } = useParams<{ idEmpresa: string }>();
	const apresentaProximosAgendamentos = useMediaQuery({ query: '(min-width: 990px)' });
	if (idEmpresa) {
		UseVerificaEmpresa(idEmpresa);
	}

	if(apresentaProximosAgendamentos) {
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
			</div>
		);
	}
	if(!apresentaProximosAgendamentos) {
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
			</div>
		);
	}
};
