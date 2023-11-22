const vaz = document.getElementById('textoVaz');
const proCont = document.getElementById('Container');
proCont.innerHTML = '';
const cari = document.getElementById('CarinCont');
cari.innerHTML = '';

function buscarPorLetras(vem, produtos) {
  const letra = vem.toLowerCase();
  const resultados = [];
  const resultadosInicio = [];
  const resultadosContem = [];

  for (let i = 0; i < produtos.length; i++) {
    const titulo = produtos[i].title.toLowerCase();
    if (titulo.startsWith(letra)) {
      resultadosInicio.push(produtos[i]);
    } else if (titulo.includes(letra)) {
      resultadosContem.push(produtos[i]);
    }
  }

  resultadosInicio.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  resultadosContem.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  resultados.push(...resultadosInicio, ...resultadosContem);

  return resultados;
}
var CSSTEST=localStorage.getItem('CSSPESQ') === 'true';
async function pes2() {
  const p = localStorage.getItem('p');
  if (p) {
    document.getElementById('bPp').value = p;
    const vem = document.getElementById('bPp').value;
    const baseResponse = await fetch('/api/products');
    const base = await baseResponse.json();
    const produtos = base.itens;
    const resultados = buscarPorLetras(vem, produtos);
    if(CSSTEST){
      const ADMProds= produtos.slice(0, 11)
      serPag(ADMProds, vem);
    }
    else{
      serPag(resultados, vem);
    }
    localStorage.removeItem('p');
  } else {
    hide();
    const t = document.getElementById('bPp').value;
    if (t) {
      pes3();
    }
    else if(CSSTEST){
      const baseResponse = await fetch('/api/products');
      const base = await baseResponse.json();
      const produtos = base.itens;
      const ADMProds= produtos.slice(0, 11)
      serPag(ADMProds);
    }
  }
}

async function pes3() {
  const vem = document.getElementById('bPp').value;
  const response = await fetch('/api/products');
  const base = await response.json();
  const produtos = base.itens;
  const resultados = buscarPorLetras(vem, produtos);
  if(CSSTEST){
    const ADMProds= produtos.slice(0, 11)
    serPag(ADMProds, vem);
  }
  else{
    serPag(resultados, vem);
  }
}

function show(pesq) {
  const pesq2 = pesq.length;
  vaz.style.visibility = pesq2 === 0 ? 'visible' : 'hidden';
  document.querySelector('html').style.overflowY = 'visible';

  if (pesq2 > 10) {
    const proPagButton = document.getElementById('ProPag');
    if (!proPagButton) {
      const proPagButton = document.createElement('button');
      proPagButton.id = 'ProPag';
      proPagButton.classList.add('PP');
      proPagButton.textContent = 'Próxima página';
      proCont.appendChild(proPagButton);
      proPagButton.addEventListener('click', function() {
        pesq.splice(0, 10);
        proCont.removeChild(document.getElementById('ProPag'));
        serPag(pesq);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

function serPag(produtos, vem) {
  proCont.innerHTML = '';

  const letterResults = [];
  const otherResults = [];
  for (let i = 0; i < produtos.length; i++) {
    const prode = produtos[i];
    const titulo = prode.title.toLowerCase();
    if (titulo.startsWith(vem)) {
      letterResults.push(prode);
    } else {
      otherResults.push(prode);
    }
  }

  for (let i = 0; i < letterResults.length; i++) {
    const prode = letterResults[i];
    const prodCont = document.createElement('div');
    prodCont.classList.add('prodCont');
    prodCont.setAttribute('value', '1');

    prodCont.innerHTML = `
      <img class="prod" src="${prode.image}" alt="Produto ${i}">
      <p class="prodTit">${prode.title}</p>
      <p class="precoProd">R$${parseFloat(prode.price).toFixed(2)}</p>
      <button class="prodCa" id="ca${i}">Adicionar ao Carrinho</button>
      <button class="prodDe" id="pr${i}">Detalhes</button>
    `;

    const prodDeButton = prodCont.querySelector(`#pr${i}`);
    prodDeButton.addEventListener('click', function() {
      const id = prode.id;
      localStorage.setItem('d', id);
      trocarPagina2();
    });

    const prodCaButton = prodCont.querySelector(`#ca${i}`);
    prodCaButton.addEventListener('click', function() {
      const Item = prode.id;
      localStorage.setItem('CA', JSON.stringify(Item));
      IniciarCarin();
    });

    proCont.appendChild(prodCont);
  }
  const message = document.createElement('p');
  message.classList.add("Divide")
  message.textContent = 'Outros produtos que você possa querer';
  proCont.appendChild(message);

  const maxOtherProducts = (10-letterResults.length);
  const numOtherProducts = Math.min(maxOtherProducts, otherResults.length);
  for (let i = 0; i < numOtherProducts; i++) {
    const prode = otherResults[i];
    const prodCont = document.createElement('div');
    prodCont.classList.add('prodCont');
    prodCont.setAttribute('value', '1');

    prodCont.innerHTML = `
      <img class="prod" src="${prode.image}" alt="Produto ${i}">
      <p class="prodTit">${prode.title}</p>
      <p class="precoProd">R$${parseFloat(prode.price).toFixed(2)}</p>
      <button class="prodCa" id="ca${i}">Adicionar ao Carrinho</button>
      <button class="prodDe" id="pr${i}">Detalhes</button>
    `;

    const prodDeButton = prodCont.querySelector(`#pr${i}`);
    prodDeButton.addEventListener('click', function() {
      const id = prode.id;
      localStorage.setItem('d', id);
      trocarPagina2();
    });

    const prodCaButton = prodCont.querySelector(`#ca${i}`);
    prodCaButton.addEventListener('click', function() {
      const Item = prode.id;
      localStorage.setItem('CA', JSON.stringify(Item));
      IniciarCarin();
    });

    proCont.appendChild(prodCont);
  }

  show(produtos);
}

function hide() {
  document.querySelector('html').style.overflowY = 'hidden';
}

document.getElementById('bPp').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    pes2();
  }
});


function trocarPagina2() {
  window.location.href = '/detalhes/detail.html';
}

/* function buscarPorLetras(vem, produtos) {
  const letras = vem.toLowerCase();
  const resultados = produtos.filter((resus) => {
    const titulo = resus.title.toLowerCase();
    return titulo.includes(letras);
  });
  return resultados;
} */