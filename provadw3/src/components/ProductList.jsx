function ProductList({ products }) {
    return (
      <div className="list">
        <h2>Produtos cadastrados</h2>
  
        {products.length === 0 && <p>Nenhum produto ainda.</p>}
  
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - R$ {product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ProductList;