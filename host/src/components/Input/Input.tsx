import "./Input.css"

type Tinput = {
    placeholder: string;
    tipo: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Tinput> = ({ placeholder, tipo, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }

    return (
        <input className="input" placeholder={placeholder} type={tipo} onChange={e => handleChange(e)} />
    )
}
