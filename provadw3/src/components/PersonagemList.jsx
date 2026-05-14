function PersonagemList({ personagens, onDelete, onEdit }) {
    return (
      <div className="list">
        <h2>Personagens cadastrados</h2>
  
        {personagens.length === 0 && <p>Nenhum personagem ainda.</p>}
  
        <ul>
          {personagens.map((personagem, index) => (
            <li key={personagem.id || index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {personagem.imageUrl && (
                  <img 
                    src={personagem.imageUrl} 
                    alt={personagem.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                )}
                <div>
                  <strong>{personagem.name}</strong>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onEdit(personagem)}
                  style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer', backgroundColor: '#f0ad4e', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(personagem.id)}
                  style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default PersonagemList;
