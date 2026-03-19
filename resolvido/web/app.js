const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const soma = (lista) => lista.reduce((acc, atual) => acc + atual, 0);

const totalPorCategoria = (lista) =>
  lista.reduce(
    (acc, item) => ({ ...acc, [item.categoria]: (acc[item.categoria] || 0) + item.valor }),
    {}
  );

const ordenarPorValor = (lista) => [...lista].sort((a, b) => b.valor - a.valor);

const resumir = (lista) =>
  lista.map(({ produto, valor, categoria }) => ({ produto, valor, categoria }));

const filtrarPorCategoria = (categoria) => (lista) =>
  categoria === 'todas' ? lista : lista.filter((item) => item.categoria === categoria);

const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input);

const selecionar = (selector) => document.querySelector(selector);

const refs = {
  categoria: selecionar('#categoria'),
  totalVendas: selecionar('#kpi-total-vendas'),
  faturamento: selecionar('#kpi-faturamento'),
  ticketMedio: selecionar('#kpi-ticket-medio'),
  topProdutos: selecionar('#top-produtos'),
  receitaCategoria: selecionar('#receita-categoria'),
};

const criarOpcoesCategoria = (vendas) => {
  const categorias = ['todas', ...Object.keys(totalPorCategoria(vendas)).sort()];
  refs.categoria.innerHTML = categorias
    .map((categoria) => `<option value="${categoria}">${categoria}</option>`)
    .join('');
};

const renderKPIs = (vendas) => {
  const faturamento = soma(vendas.map((item) => item.valor));
  const ticketMedio = vendas.length ? faturamento / vendas.length : 0;

  refs.totalVendas.textContent = String(vendas.length);
  refs.faturamento.textContent = formatarMoeda(faturamento);
  refs.ticketMedio.textContent = formatarMoeda(ticketMedio);
};

const renderTopProdutos = (vendas) => {
  const top5 = pipe(ordenarPorValor, resumir, (lista) => lista.slice(0, 5))(vendas);

  refs.topProdutos.innerHTML = top5
    .map(
      (item) => `
      <li>
        <span>${item.produto}</span>
        <strong>${formatarMoeda(item.valor)}</strong>
      </li>
    `
    )
    .join('');
};

const renderReceitaPorCategoria = (vendas) => {
  const agrupado = totalPorCategoria(vendas);
  const totalGeral = soma(Object.values(agrupado));

  refs.receitaCategoria.innerHTML = Object.entries(agrupado)
    .sort((a, b) => b[1] - a[1])
    .map(([categoria, total]) => {
      const percentual = totalGeral ? (total / totalGeral) * 100 : 0;
      return `
        <li>
          <div class="bar-meta">
            <span>${categoria}</span>
            <strong>${formatarMoeda(total)}</strong>
          </div>
          <div class="bar-track">
            <span class="bar-fill" style="width:${percentual.toFixed(2)}%"></span>
          </div>
        </li>
      `;
    })
    .join('');
};

const render = (vendas, categoriaSelecionada) => {
  const vendasFiltradas = filtrarPorCategoria(categoriaSelecionada)(vendas);
  renderKPIs(vendasFiltradas);
  renderTopProdutos(vendasFiltradas);
  renderReceitaPorCategoria(vendasFiltradas);
};

const iniciar = async () => {
  const resposta = await fetch('/api/vendas');
  const vendas = await resposta.json();

  criarOpcoesCategoria(vendas);
  render(vendas, 'todas');

  refs.categoria.addEventListener('change', (evento) => {
    render(vendas, evento.target.value);
  });
};

iniciar();
