function pes() {
  localStorage.setItem('p', document.getElementById('impPT').value);
}

async function GetProduct(id) {
  const response = await fetch('/base.json');
  const base = await response.json();
  var produto = base.itens.find((item) => item.id === parseInt(id));
  return produto;
}

function stCount(rate) {
  let stars = '';

  if (rate >= 1 && rate <= 10) {
    const fullStars = Math.floor(rate / 2);
    const halfStar = rate % 2 === 1;

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
      stars += '<i class="fa-regular fa-star-half-stroke"></i>';
    }

    const remainingStars = 5 - Math.ceil(rate / 2);

    for (let i = 0; i < remainingStars; i++) {
      stars += '<i class="fa-regular fa-star"></i>';
    }
  } else {
    stars = '<i class="fa-regular fa-star"></i>'.repeat(5);
  }

  return stars;
}
/* Função para pegar as informações do pagamento */
function PaymentInformations(){
  const PAIS = document.getElementById("pais").value;
  const NOME = document.getElementById("nome").value;
  const TELEFONE = document.getElementById("telefone").value;
  const CEP = document.getElementById("cep").value;
  const ENDERECO = document.getElementById("endereco").value;
  const NUMERO_RESIDENCIA = document.getElementById("numeroresidencia").value;
  var COMPLEMENTO = document.getElementById("complemento").value;
  const BAIRRO = document.getElementById("bairro").value;
  const CIDADE = document.getElementById("cidade").value;
  const ESTADO = document.getElementById("estado").value;
  const PAYMET = document.getElementsByName("FormasPagamento");
  var escolhido;
  for (let i = 0; i < PAYMET.length; i++) {
    if(PAYMET[i].checked){
      escolhido = PAYMET[i].value;
    }   
  }
  console.log(PAIS, NOME, TELEFONE, CEP, ENDERECO, NUMERO_RESIDENCIA, COMPLEMENTO, BAIRRO, CIDADE, ESTADO, escolhido);
}


 /* Mostrar produtos da compra */
async function BuyingProducts() {
  var produtos = JSON.parse(localStorage.getItem('PaymentItens')) || [];
  produtos = produtos[getLoggedInUserIndex()];

  for (let i = 0; i < produtos.length; i++) {
    const produto = await GetProduct(produtos[i]);
    const stars2 = stCount(produto.rating.rate);

    // Crie um novo item do carrossel
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    // Crie o conteúdo do item do carrossel
    carouselItem.innerHTML = `
      <<div class="Product">
      <div class="IMAGE">
        <img alt="Imagem Produto" src="${produto.image}" class="ImgP" id="im">
      </div>
      <div class="Info">
        <p class="titulo" id="titl">${produto.title}</p>
        <div>
          <p class="estrelas" id="Est">${stars2}</p>
        </div>
        <p id="count">${produto.rating.count}</p>
        <p class="gen" id="gen">Generos: ${produto.gender}</p>
        <p class="ye" id="ye">Ano de lançamento: ${produto.year}</p>
        <p id="brand">${produto.brandName}</p>
        <p id="preco" alt="Preço">R$${parseFloat(produto.price).toFixed(2)}</p>

        <div class="desc">
          <p class="description" id="descr" alt="descrição">${produto.description}</p>
        </div>
      </div>
    </div>
    `;

    // Adicione o item ao carrossel
    document.getElementById('cIns').appendChild(carouselItem);

    // Crie um indicador para o item do carrossel
    const indicator = document.createElement('li');
    indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-bs-slide-to', i.toString());
    indicator.setAttribute('type', 'button')
    if (i === 0) {
      indicator.classList.add('active');
    }

    // Adicione o indicador aos indicadores do carrossel
    document.getElementById('cInd').appendChild(indicator);
  }
}