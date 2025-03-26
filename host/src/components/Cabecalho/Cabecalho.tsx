import egLogo from "../../assets/EgLogo.png"
import "./Cabecalho.css"
import { IoMdMenu } from "react-icons/io";

export const Cabecalho = () => {
	return (
		<header className="cabecalho">
			<div className="cabecalho__logo">
				<div className="cabecalho__burger"><IoMdMenu size={20} /></div>
				<img className="cabecalho__eg" src={egLogo} alt="Logo com a letra E e a letra G" />
				<p className="cabecalho__texto">
					Sistemas de<br /> Agendamento
				</p>
			</div>
		</header >
	)
}
