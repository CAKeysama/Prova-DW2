import React, { useState } from 'react';
import { useSupabaseUpload } from '../hooks/useSupabaseUpload';

export const ImageUploaderExample = () => {
  const { uploadImage, isUploading, error } = useSupabaseUpload();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Você pode adicionar validações de tamanho/tipo aqui (ex: if (file.size > 5MB) ...)

    const publicUrl = await uploadImage(file);
    
    if (publicUrl) {
      setUploadedUrl(publicUrl);
      // Aqui você anexaria esta publicUrl ao objeto do usuário
      // para então salvar no Firebase na etapa final do cadastro.
      console.log('Imagem enviada com sucesso! URL pública pronta para o Firebase:', publicUrl);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>Upload de Foto de Perfil</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <p style={{ color: '#0066cc', fontWeight: 'bold' }}>Enviando imagem, por favor aguarde...</p>
      )}

      {error && (
        <p style={{ color: 'red' }}>Erro: {error}</p>
      )}

      {uploadedUrl && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: 'green', fontWeight: 'bold' }}>Upload concluído com sucesso!</p>
          <img 
            src={uploadedUrl} 
            alt="Preview do Upload" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} 
          />
          <div style={{ marginTop: '10px', fontSize: '12px', wordBreak: 'break-all' }}>
            <strong>URL Pública:</strong> <br/>
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
          </div>
        </div>
      )}
    </div>
  );
};
