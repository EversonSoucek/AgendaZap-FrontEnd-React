import "./NavegacaoCalendario.css"

export const NavegacaoCalendario = () => {
    return (
        <div className="container navegacao-calendario">
            <div className="navegacao-calendario__itens">
                <select className="navegacao-calendario__funcionario">
                    <option value="1">Funcionario 1</option>
                    <option value="2">funcionario 2</option>
                    <option value="3">funcionario 3</option>
                </select>
                <h2 className="navegacao-calendario__data">03 de Março</h2>

                <div className="navegacao-calendario__botoes">
                    <p>&lt;</p>
                    <button className="navegacao-calendario__botao">Dia</button>
                    <button className="navegacao-calendario__botao">Semana</button>
                    <button className="navegacao-calendario__botao selecionado">Mês</button>
                    <p>&gt;</p>
                </div>
            </div>
        </div>
    )
}
