import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbwE_P5elqMVOx9_0TJ06djpb_RbenqqFYyaFTDjt3zuT85TrUC1er-XiouK5zTFmhbEtg/exec"; // URL do Apps Script

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  // LISTAR
  async function listarProdutos() {
    const res = await fetch(`${API_URL}?action=list`);
    const data = await res.json();
    setProdutos(data.slice(1));
  }

  // CRIAR
  async function criarProduto(e) {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        nome,
        preco,
      }),
    });

    setNome("");
    setPreco("");
    listarProdutos();
  }

  // DELETAR
  async function deletarProduto(id) {
    await fetch(`${API_URL}?action=delete&id=${id}`);
    listarProdutos();
  }

  // CARREGAR AO INICIAR
  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Controle de Estoque</h1>

      <form onSubmit={criarProduto}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <hr />

      {produtos.map((produto, index) => (
        <div key={index} style={{ marginTop: 10 }}>
          <strong>{produto[1]}</strong> - R$ {produto[2]}
          <button onClick={() => deletarProduto(produto[0])}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;