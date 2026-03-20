// App.jsx
import { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://script.google.com/;

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [carregandoLista, setCarregandoLista] = useState(false);

  const listarProdutos = useCallback(async () => {
    try {
      setCarregandoLista(true);
      const res = await fetch(`${API_URL}?action=list`);
      const response = await res.json();

      if (response.success) {
        setProdutos(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Erro de conexão com o servidor");
    } finally {
      setCarregandoLista(false);
    }
  }, []);

  const criarProduto = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !preco.trim()) {
      toast.error("Preencha nome e preço");
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      toast.error("Preço inválido");
      return;
    }

    try {
      const res = await fetch(`${API_URL}?action=add&nome=${encodeURIComponent(nome)}&preco=${precoNum}`);
      const response = await res.json();
      if (response.success) {
        toast.success(response.message);
        setNome("");
        setPreco("");
        listarProdutos();
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro de conexão com o servidor");
    }
  };

  const deletarProduto = async (id) => {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;

    try {
      const res = await fetch(`${API_URL}?action=delete&id=${id}`);
      const response = await res.json();
      if (response.success && response.deleted) {
        toast.success(response.message);
        listarProdutos();
      } else {
        toast.error(response.message || "Erro ao excluir");
      }
    } catch {
      toast.error("Erro de conexão com o servidor");
    }
  };

  useEffect(() => {
    listarProdutos();
  }, [listarProdutos]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ textAlign: "center" }}>📦 Controle de Estoque</h1>

      <form onSubmit={criarProduto} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="Preço" type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} />
        <button type="submit">➕ Adicionar</button>
      </form>

      <button onClick={listarProdutos} disabled={carregandoLista}>
        {carregandoLista ? "🔄 Carregando..." : "🔄 Atualizar Lista"}
      </button>

      <div style={{ marginTop: 20 }}>
        {produtos.length === 0 ? (
          <div>Nenhum produto cadastrado</div>
        ) : (
          produtos.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #ddd" }}>
              <span>{p.nome} - R$ {p.preco.toFixed(2)}</span>
              <button onClick={() => deletarProduto(p.id)}>🗑️ Excluir</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
