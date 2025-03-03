import { Link } from "react-router-dom"
import './SideBar.css'
import { FaRegCalendarCheck, FaWrench } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaClipboardUser,FaGear } from "react-icons/fa6";

export const SideBar = () => {
    return (
        <div className="container side-bar">
            <ul className="side-bar__menu">
                <li><Link className="side-bar__item" to={"/agenda"}><FaRegCalendarCheck size={26} /><p className="side-bar__texto">Agenda</p></Link></li>
                <li><Link className="side-bar__item" to={"/chat"}><IoIosChatboxes size={26} /><p className="side-bar__texto">Chat</p></Link></li>
                <li><Link className="side-bar__item" to={"/funcionários"}><FaClipboardUser size={26} /><p className="side-bar__texto">Funcionários</p></Link></li>
                <li><Link className="side-bar__item" to={"/clientes"}><CiUser size={26} /><p className="side-bar__texto">Clientes</p></Link></li>
                <li><Link className="side-bar__item" to={"/serviços"}><FaWrench size={26} /><p className="side-bar__texto">Serviços</p></Link></li>
                <li><Link className="side-bar__item" to={"/serviços"}><FaGear size={26} /><p className="side-bar__texto">Configurações</p></Link></li>
            </ul>
        </div>
    )
}
