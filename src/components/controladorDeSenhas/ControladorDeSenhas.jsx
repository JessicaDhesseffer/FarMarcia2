import React, { useState } from 'react';
import './ControladorDeSenhas.css';

function ControladorDeSenhas() {
  const [filaNormal, setFilaNormal] = useState([]);
  const [filaPreferencial, setFilaPreferencial] = useState([]);
  const [senhaAtual, setSenhaAtual] = useState(null);

  const gerarSenha = (tipo) => {
    const novaSenha = {
      tipo,
      numero: tipo === 'Preferencial' ? filaPreferencial.length + 1 : filaNormal.length + 1,
    };

    if (tipo === 'Preferencial') {
      setFilaPreferencial([...filaPreferencial, novaSenha]);
    } else {
      setFilaNormal([...filaNormal, novaSenha]);
    }
  };

  const chamarSenha = () => {
    let proximaSenha = null;

    if (filaPreferencial.length > 0) {
      proximaSenha = filaPreferencial[0];
      setSenhaAtual(proximaSenha);
      setFilaPreferencial(filaPreferencial.slice(1));
    } else if (filaNormal.length > 0) {
      proximaSenha = filaNormal[0];
      setSenhaAtual(proximaSenha);
      setFilaNormal(filaNormal.slice(1));
    } else {
      alert('Não há mais senhas na fila para chamar!');
      setSenhaAtual(null);
    }
  };

  return (
    <div className="controlador-container">
      <div className="lado-esquerdo">
        <button onClick={() => gerarSenha('Normal')} className="botao-senha">Gerar Senha Normal</button>
        <button onClick={() => gerarSenha('Preferencial')} className="botao-senha">Gerar Senha Preferencial</button>
      </div>

      <div className="telão">
        <div className="lista-senhas">
          {filaPreferencial.length > 0 || filaNormal.length > 0 ? (
            <>
              {filaPreferencial.concat(filaNormal).map((senha, index) => (
                <div key={index} className="senha-item">
                  {senha.tipo} - {senha.numero.toString().padStart(2, '0')}
                </div>
              ))}
            </>
          ) : (
            <div className="mensagem-vazia">Não há senhas na fila.</div>
          )}
        </div>
        <div className="display-senha">
          {senhaAtual ? (
            <>
              <span>Senha Chamada:</span>
              <div className="senha-item chamada">
                {senhaAtual.tipo} - {senhaAtual.numero.toString().padStart(2, '0')}
              </div>
            </>
          ) : (
            <span>...</span>
          )}
        </div>
      </div>

      <div className="lado-direito">
        <button onClick={chamarSenha} className="botao-chamar">
          Chamar Próxima Senha
        </button>
      </div>
    </div>
  );
}

export default ControladorDeSenhas;
