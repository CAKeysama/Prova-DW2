import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

    // Escuta mudanças na coleção 'products' do Firestore, ordenando pelo mais recente
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribeDb = onSnapshot(q, (querySnapshot) => {
      const produtosArray = [];
      querySnapshot.forEach((doc) => {
        produtosArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(produtosArray);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, [navigate]);

  async function addProduct(product) {
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: product.price,
        createdAt: new Date()
      });
    } catch (e) {
      console.error("Erro ao adicionar produto: ", e);
      alert("Houve um erro ao adicionar o produto. Tente novamente.");
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
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="ecommerce"
            className="banner"
          />
        </div>

        <ProductForm onAdd={addProduct} />
        <ProductList products={products} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
