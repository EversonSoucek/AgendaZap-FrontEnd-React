import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { SideBar } from "../../components/SideBar/SideBar";
import "./HomePage.css"
import { Calendario } from "../../components/Calendario/Calendario/Calendario";
import { useState } from "react";

export const HomePage = () => {
	const { idEmpresa } = useParams<{ idEmpresa: string }>();
	const [isOpen, setIsOpen] = useState(false)

	const InterageSideBar = () => {
		setIsOpen(!isOpen)
		console.log(isOpen);
		
	}

	if (idEmpresa) {
		UseVerificaEmpresa(idEmpresa);
	}
	//todo: Caso estiver no mobile desativar a sidebar e alterar para o desktop fica sem sidebar
	// Menor que 770px tirar o sidebar
	return (
		<div className="home-page">
			<div className="home-page__cabecalho">
				<Cabecalho abreSideBar={InterageSideBar} />
			</div>
			<div className={`home-page__side-bar ${isOpen ? "aberto" : "fechado"}`}>
				<SideBar FechaSideBar={InterageSideBar} />
			</div>
			<div className="container home-page__calendario">
				<Calendario />
			</div>
		</div>
	);
};
