import { Link } from 'react-router-dom'
import "./BotaoLink.css"

type TBotaoLink = {
    children: string;
    url: string
}

export const BotaoLink: React.FC<TBotaoLink> = ({ children, url }) => {
    return (
        <Link className='BotaoLink' to={url}>{children}</Link>
    )
}
