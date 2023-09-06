function pes() {
  localStorage.setItem('p', document.getElementById('impPT').value);
}

function filtro() {
  const fi = document.getElementById('f1').value;
  const fc = document.getElementById('f2').value;
  const fe = document.getElementById('f3').value;
  const fa = document.getElementById('f4').value;
  ler(fi, fc, fe, fa);
}

async function ler(filtro = "", filtro2 = "", filtro3 = "", filtro4 = "") {
  const response = await fetch('/base.json');
  const base = await response.json();
  let produtos = base.itens;
  var letra = filtro4;
  produtos = produtos.filter(product => {
    const { gender, displayCategories, season, articleType } = product;
    const desiredGender = filtro.toLowerCase();
    const desiredCategory = filtro2.toLowerCase();
    const desiredSeason = filtro3.toLowerCase();
    product.category = [displayCategories, articleType];
    return (
      (!filtro || (gender && gender.some(g => g.toLowerCase().includes(desiredGender)))) &&
      (!filtro2 || (displayCategories && displayCategories.toLowerCase() === desiredCategory)) &&
      (!filtro3 || (season && season.toLowerCase() === desiredSeason))
    );
  });
  produtos = FiltroLetra(produtos, letra);
  changeCard(produtos);
}
function FiltroLetra(p, l){
  const res = []
  for (let i = 0; i < p.length; i++) {
    const titulo = p[i].title.toUpperCase();
    if (titulo.startsWith(l)) {
      res.push(p[i]);
    }
  }
  return res;
}
function loadCard() {
  const fb = document.getElementById('fb');
  const ft = document.getElementById('fl');
  const fil = document.getElementById('filters');
  fil.innerHTML = '';

  ft.style.visibility = "visible";
  
  const filterOptions = [
    { id: 'f1', label: 'Gênero', options: ['Ação', 'Artes Marciais', 'Aventura', 'Comédia', 'Comédia dramática', 'Drama', 'Detetive', 'Ecchi', 'Fantasia', 'Fantasia Científica', 'Fantasia Sombria', 'Ficção Científica', 'Harem', 'Horror', 'Isekai', 'Magia', 'Maturo', 'Mistério', 'Mistério de assassinato', 'Romance', 'Seinen', 'Shounen', 'Slice of Life', 'Sobrenatural', 'Sobrevivência', 'Super-herói', 'Suspense', 'Terror', 'Thriller', 'Tragédia', 'Xuanhuan'] },
    { id: 'f2', label: 'Categoria', options: ['Manga', 'Manhwa', 'Light Novel', 'Web Novel'] },
    { id: 'f3', label: 'Estação/Temporada', options: ['Primavera', 'Verão', 'Outono', 'Inverno'] },
    { id: 'f4', label: 'Letra', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] }
  ];

  filterOptions.forEach((option) => {
    const select = document.createElement('select');
    select.classList.add('form-select', 'mb-2', 'form-select-sm');
    select.setAttribute('aria-label', 'Default select example');
    select.id = option.id;

    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('selected', 'true');
    defaultOption.setAttribute('value', '');
    defaultOption.textContent = option.label;
    select.appendChild(defaultOption);

    option.options.forEach((value) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', value);
      optionElement.textContent = value;
      select.appendChild(optionElement);
    });

    fil.appendChild(select);
  });

  fb.style.visibility = "visible";
  ler();

  const selects = document.querySelectorAll('.filter-container select');
  selects.forEach((select) => {
    select.addEventListener('mouseover', () => {
      select.size = 5;
    });
    select.addEventListener('click', () => {
      select.size = 1;
    });
    select.addEventListener('mouseout', () => {
      select.size = 1;
    });
  });
}

function changeCard(produtos) {
  const carCont = document.getElementById('CardsCont');
  carCont.innerHTML = '';

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container', 'ajuste2');
  carCont.appendChild(rowContainer);

  const emptyCont = document.createElement('div');
  emptyCont.classList.add('empty');

  const main = document.querySelector('html');
  main.style['overflow-y'] = 'visible';
  const body = document.querySelector('body');
  body.style['position']= 'relative';

  for (let i = 0; i < produtos.length; i += 4) {
    const cardline = document.createElement('div');
    cardline.classList.add('row', 'mt-4');
    cardline.classList.add('ajuste');
    rowContainer.appendChild(cardline);

    for (let j = i; j < i + 4; j++) {
      if (j >= produtos.length) {
        break;
      }

      const produto = produtos[j];
      const cardIndex = j + 1;
      const stars = stCount(produto.rating.rate);

      const cardElement = document.createElement('div');
      cardElement.classList.add('col-4', 'card-item');
      cardElement.innerHTML = `
        <div class="card" id="Cards">
          <img src="${produto.image}" value="" class="card-img-top" alt="Imagem produto ${cardIndex}" id="imCa">
          <div class="card-body">
            <a href="/detalhes/detail.html" id="b${cardIndex}">
              <h5 class="card-title" id="TiCr">${produto.title}</h5>
            </a>
            <p class="card-text">R$${parseFloat(produto.price).toFixed(2)}</p>
            <p class="estrelasCard">
              ${stars}
            </p>
          </div>
        </div>
      `;

      cardline.appendChild(cardElement);

      const linkElement = document.getElementById(`b${cardIndex}`);
      linkElement.addEventListener('click', function () {
        const id = produto.id;
        localStorage.setItem('d', id);
      });
    }
  }

  if (produtos.length === 0) {
    carCont.appendChild(emptyCont);
    emptyCont.innerHTML = `Nenhum resultado encontrado`;
    main.style['overflow-y'] = 'hidden';
    body.style['position']= 'static';
  }
}

function stCount(rate) {
  let stars = '';

  if (rate >= 1 && rate <= 10) {
    const fullStars = Math.floor(rate / 2);
    const halfStar = rate % 2 === 1;

    for (let i = 0; i < fullStars; i++) {
      stars += `<i class='fas fa-star'></i>`;
    }

    if (halfStar) {
      stars += `<i class='fa-regular fa-star-half-stroke'></i>`;
    }

    const remainingStars = 5 - Math.ceil(rate / 2);

    for (let i = 0; i < remainingStars; i++) {
      stars += `<i class='fa-regular fa-star'></i>`;
    }
  } else {
    stars = `<i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>`;
  }

  return stars;
}


window.addEventListener('DOMContentLoaded', function () {
  const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
  if (loggedInUser) {
    userName = loggedInUser.name;
    userTel = loggedInUser.telephone;
    userEm = loggedInUser.email;
    Login = true;
  }
  LO();
});