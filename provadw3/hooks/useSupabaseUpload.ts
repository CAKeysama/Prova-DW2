import { useState } from 'react';
import { supabase } from '../utils/supabase';

export const useSupabaseUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      // 1. Gera um UUID único nativo do navegador
      const uuid = crypto.randomUUID();
      
      // 2. Extrai a extensão do arquivo original
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuid}.${fileExt}`;
      // Caminho dentro do bucket (raiz)
      const filePath = `${fileName}`;

      // 3. Faz o upload para o bucket 'fotos-cadastro' no Supabase
      const { error: uploadError } = await supabase.storage
        .from('fotos-cadastro')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Evita sobrescrever arquivos caso ocorra uma raríssima colisão
        });

      if (uploadError) {
        throw uploadError;
      }

      // 4. Recupera a URL pública gerada
      const { data } = supabase.storage
        .from('fotos-cadastro')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error('Erro ao fazer upload da imagem no Supabase:', err);
      setError(err.message || 'Ocorreu um erro ao enviar a imagem.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
};
