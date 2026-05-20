const data = {
  "produtos": [
    {
      "id": 1,
      "nome": "Kindle",
      "preco": 699.90,
      "categoria": "Smartphones",
      "imagem": "imgs/Kindle.png",
      "descricao": "Usado para ler.",
      "emEstoque": true
    },
    {
      "id": 2,
      "nome": "Bicicleta",
      "preco": 4599.00,
      "categoria": "Veiculos",
      "imagem": "imgs/bike.jpg",
      "descricao": "Usado para andar.",
      "emEstoque": false
    },
    {
      "id": 3,
      "nome": "Raquete",
      "preco": 199.89,
      "categoria": "Esportes",
      "imagem": "imgs/raquete.jpg",
      "descricao": "Raquete para praticar esportes.",
      "emEstoque": false
    },
    {
      "id": 4,
      "nome": "Fiat Strada",
      "preco": 98999.99,
      "categoria": "Veiculos",
      "imagem": "imgs/Strada.jpg",
      "descricao": "Veiculo motorizado para uso cotidiano.",
      "emEstoque": false
    }
  ]
};

function price(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function base_produto(array, valor){
  let divProduto;
  let divInterna;
  
  if (valor === false) {
    divProduto = document.createElement("div");
    divProduto.setAttribute("id", array.nome);
    divProduto.classList.add(`${array.id}`);
    document.getElementById("product-list").appendChild(divProduto);

    divInterna = document.createElement("div");
    divInterna.classList.add("product");
    divProduto.appendChild(divInterna);
  } else {
    divProduto = document.getElementById(array.nome);
    divInterna = divProduto.querySelector("div");
  }

  const img = document.createElement("img");
  img.classList.add("img_config");
  img.src = array.imagem;
  divInterna.appendChild(img);

  const pNome = document.createElement("p");
  pNome.classList.add("font_config");
  pNome.innerText = array.nome;
  divInterna.appendChild(pNome);

  const pPreco = document.createElement("p");
  pPreco.classList.add("font_config");
  pPreco.innerText = price(array.preco);
  divInterna.appendChild(pPreco);
  
  return {divProduto, divInterna};
}

function createProduct(array, index) {
  const {divProduto} = base_produto(array, false);
  
  const btn = document.createElement("button");
  btn.classList.add("font_config", "botao_pos", "btn", "btn-dark");
  btn.innerText = "Ver Detalhes";
  divProduto.appendChild(btn);

  btn.addEventListener('click', function(){
    window.location.href = `ver_detalhes.html?id=${index}`;
  });
  
  return divProduto;
}

function renderProducts(table) {
  dsp_prod.innerHTML = "";
  table.produtos.forEach((v, index) => {
      if (dsp_prod.querySelector(`#${v.nome}`) === null){
        const novoProduto = createProduct(v, index);
        dsp_prod.appendChild(novoProduto);
      }
    });
}

function renderCategories(table) {
  table.produtos.forEach(v => {
      if (categoria.querySelector(`#${v.categoria}`) === null) {
        categoria.innerHTML += `<option id="${v.categoria}" value="${v.categoria}"> ${v.categoria}</option>`;
      }
    });
}

function filterProducts(busca, _categoria) {
  if (texto.trim().length !== 0){
    data.produtos.forEach(element => {
      if (!element.nome.toLowerCase().includes(texto.toLowerCase())) {
        const el = document.getElementById(element.nome);
        if(el) el.remove();
      }
    });
  }
  if (selectedCat !== "Todas") {
    data.produtos.forEach(element => {
      if (element.categoria !== selectedCat) {
        const el = document.getElementById(element.nome);
        if(el) el.remove();
      }
    });
  } 
}

const categoria = document.getElementById("category");
const dsp_prod = document.getElementById("product-list");

renderCategories(data);
renderProducts(data);

var texto = "";
const procurar_por = document.querySelector("#search");
procurar_por.addEventListener('input', function(evento){
  texto = evento.target.value;
});

var selectedCat = "Todas";
const categoriaProcura = document.querySelector("#category");
categoriaProcura.addEventListener('change', function(evento){
  selectedCat = evento.target.value;
});

const pesquisa_button = document.getElementById("btnRender");
pesquisa_button.addEventListener('click', function(e) {
  renderProducts(data);
  filterProducts(texto, selectedCat);
});