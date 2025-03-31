import egLogo from "../../assets/EgLogo.png"
import "./Cabecalho.css"
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

type Cabecalho = {
	abreSideBar : () => void
}

export const Cabecalho: React.FC<Cabecalho> = ({abreSideBar}) => {
	return (
		<header className="cabecalho">
			<div className="cabecalho__burger" onClick={abreSideBar}><IoMdMenu size={30} /></div>
			<div className="cabecalho__logo">
				<img className="cabecalho__eg" src={egLogo} alt="Logo com a letra E e a letra G" />
				<p className="cabecalho__texto">
					Sistemas de<br /> Agendamento
				</p>
			</div>
			<div className="cabecalho__usuario"><FaRegUserCircle size={20} /> <p>Olá</p></div>
		</header >
	)
}
