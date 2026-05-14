import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonagemForm from "../components/PersonagemForm";
import PersonagemList from "../components/PersonagemList";

function Home() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPersonagem, setEditingPersonagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica autenticação
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    // Escuta mudanças na coleção 'personagens' do Firestore, ordenando pelo mais recente
    const q = query(collection(db, "personagens"), orderBy("createdAt", "desc"));
    const unsubscribeDb = onSnapshot(q, (querySnapshot) => {
      const personagensArray = [];
      querySnapshot.forEach((document) => {
        personagensArray.push({ id: document.id, ...document.data() });
      });
      setPersonagens(personagensArray);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, [navigate]);

  async function addPersonagem(personagem) {
    try {
      await addDoc(collection(db, "personagens"), {
        name: personagem.name,
        imageUrl: personagem.imageUrl || null,
        createdAt: new Date()
      });
    } catch (e) {
      console.error("Erro ao adicionar personagem: ", e);
      alert("Houve um erro ao adicionar o personagem. Tente novamente.");
    }
  }

  async function updatePersonagem(id, updatedData) {
    try {
      await updateDoc(doc(db, "personagens", id), updatedData);
      setEditingPersonagem(null);
    } catch (e) {
      console.error("Erro ao atualizar personagem: ", e);
      alert("Erro ao atualizar.");
    }
  }

  async function deletePersonagem(id) {
    if (window.confirm("Tem certeza que deseja excluir este personagem?")) {
      try {
        await deleteDoc(doc(db, "personagens", id));
      } catch (e) {
        console.error("Erro ao deletar personagem: ", e);
        alert("Erro ao excluir.");
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="top-nav">
        <Header />
        <button 
          onClick={handleLogout} 
          className="btn-danger"
        >
          Sair
        </button>
      </div>

      <div className="main-content">
        <div className="banner-container">
          <img
            src="public/marvel_universe.png"
            alt="marvel universe"
            className="banner"
          />
        </div>

        <PersonagemForm 
          onAdd={addPersonagem} 
          onUpdate={updatePersonagem} 
          editingPersonagem={editingPersonagem} 
          onCancelEdit={() => setEditingPersonagem(null)} 
        />
        <PersonagemList 
          personagens={personagens} 
          onDelete={deletePersonagem} 
          onEdit={setEditingPersonagem} 
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
