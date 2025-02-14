import "./LoginPage.css"
import calendario from "../../assets/Timeline-rafiki (2) 1.png"

export default function LoginPage() {
	return (
		<div className="login">
			<div className="container">
				<div className="login__container">
				<div className="login__container__imagem">
					<img alt="Duas pessoas organizando um calendário" src={calendario} />
				</div>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: "<!-- https://storyset.com/event>Event illustrations by Storyset -->" }} />
		</div>
	)
}
