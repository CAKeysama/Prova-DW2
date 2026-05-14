import { useState, useEffect } from "react";
import { useSupabaseUpload } from "../../hooks/useSupabaseUpload";

function PersonagemForm({ onAdd, onUpdate, editingPersonagem, onCancelEdit }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  
  const { uploadImage, isUploading, error } = useSupabaseUpload();

  useEffect(() => {
    if (editingPersonagem) {
      setName(editingPersonagem.name);
      setFile(null);
    } else {
      setName("");
      setFile(null);
    }
  }, [editingPersonagem]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    let newImageUrl = null;

    if (file) {
      newImageUrl = await uploadImage(file);
      if (!newImageUrl) {
        alert("Falha ao enviar a nova imagem. Verifique o console para mais detalhes.");
        return;
      }
    }

    if (editingPersonagem) {
      const updatedData = { name };
      if (newImageUrl) {
        updatedData.imageUrl = newImageUrl;
      }
      onUpdate(editingPersonagem.id, updatedData);
    } else {
      onAdd({
        name,
        imageUrl: newImageUrl,
      });
    }

    setName("");
    setFile(null);
    const fileInput = document.getElementById("personagem-image");
    if (fileInput) fileInput.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>{editingPersonagem ? "Editar Personagem" : "Novo Personagem"}</h3>
      <input
        type="text"
        placeholder="Nome do personagem"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isUploading}
      />

      <input 
        id="personagem-image"
        type="file" 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])} 
        disabled={isUploading}
      />

      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={isUploading} style={{ flex: 1 }}>
          {isUploading ? "Enviando..." : (editingPersonagem ? "Salvar Alterações" : "Adicionar personagem")}
        </button>
        {editingPersonagem && (
          <button type="button" onClick={onCancelEdit} disabled={isUploading} style={{ flex: 1, backgroundColor: '#888' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PersonagemForm;
