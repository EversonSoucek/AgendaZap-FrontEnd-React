import "./Input.css"

type Tinput = {
    placeholder: string;
    tipo: string
}

export const Input: React.FC<Tinput> = ({ placeholder, tipo }) => {
    return (
        <input className="input" placeholder={placeholder} type={tipo} />
    )
}
