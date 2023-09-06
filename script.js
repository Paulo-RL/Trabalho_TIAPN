function pes() {
  localStorage.setItem('p', document.getElementById('impPT').value);
}

function filtro() {
  const filtro1 = document.getElementById('f1').value;
  const filtro2 = document.getElementById('f2').value;
  ler(filtro1, filtro2);
}

async function ler(filtro1 = "", filtro2 = "") {
  const response = await fetch('base.json');
  const base = await response.json();
  var produtos = base.itens;
  const carrossa = base.carr;
  const produtos2 = base.itens;
  produtos = produtos.filter(prods=>{
    const { gender, displayCategories, articleType } = prods;
      const desiredGender = filtro1.toLowerCase();
      const desiredCategory = filtro2.toLowerCase();
      prods.category = [displayCategories, articleType];
      return(
        (!filtro1 || (gender && gender.some(g => g.toLowerCase().includes(desiredGender))))&&
        (!filtro2 || (displayCategories && displayCategories.toLowerCase() === desiredCategory))
      );
  });
  changeCard(produtos);
  changeCar(carrossa);
  changeMP(produtos2);
}

async function loadCard() {
  document.getElementById(`carossa`).style.visibility = "hidden";
  const fb = document.getElementById(`fb`);
  fb.style.visibility = "hidden";
  const ft = document.getElementById(`fl`);
  ft.style.visibility = "hidden";
  const fil = document.getElementById('filters');
  fil.innerHTML = '';

  ft.style.visibility = "visible";
  
  const filterOptions = [
    { id: 'f1', label: 'Gênero', options: ['Ação', 'Artes Marciais', 'Aventura', 'Comédia', 'Comédia dramática', 'Drama', 'Detetive', 'Ecchi', 'Fantasia', 'Fantasia Científica', 'Fantasia Sombria', 'Ficção Científica', 'Harem', 'Horror', 'Isekai', 'Magia', 'Maduro', 'Mistério', 'Mistério de assassinato', 'Romance', 'Seinen', 'Shounen', 'Slice of Life', 'Sobrenatural', 'Sobrevivência', 'Super-herói', 'Suspense', 'Terror', 'Thriller', 'Tragédia', 'Xuanhuan'] },
    { id: 'f2', label: 'Categoria', options: ['Manga', 'Manhwa', 'Light Novel', 'Web Novel'] },
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

function changeMP(produtos) {
  const mp = document.getElementById('mpCont');
  mp.innerHTML = '';

  let lowestID = Infinity;
  produtos.forEach(product => {
    if (product.id < lowestID) {
      lowestID = product.id;
    }
  });

  for (let i = 0; i < 6; i++) {
    const itemID = lowestID + i + 12;
    const selectedItem = produtos.find(item => item.id === itemID);
    const stars = stCount(selectedItem.rating.rate);

    const mpiHTML = `
      <div class="col-3 col-md-5 col-lg-3 border-bottom border-danger" id="MPI${i + 1}">
        <img src="${selectedItem.image}" height="110px" width="80px" class="imgMP" alt="Imagem melhores produtos ${selectedItem.title}">
      </div>
      <div class="col-9 col-md-7 col-lg-9 border-bottom border-danger" id="MPC${i + 1}">
        <a href="detalhes/detail.html" id="g${selectedItem.id}">
          <p class="tituloMP">${selectedItem.title}</p>
        </a>
        <p class="estrelasMP">
          ${stars}
        </p>
        <p>R$${parseFloat(selectedItem.price).toFixed(2)}</p>
      </div>
    `;

    mp.insertAdjacentHTML('beforeend', mpiHTML);

    const linkElement2 = document.getElementById(`g${selectedItem.id}`);
    linkElement2.addEventListener("click", function() {
      const id = selectedItem.id;
      localStorage.setItem('d', id);
    });
  }
}


function changeCar(produtos) {
  const ind = document.getElementById('cInd');
  ind.innerHTML = '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';

  const ins = document.getElementById('cIns');
  ins.innerHTML = `
    <div class="carousel-item active">
      <a href="detalhes/detail.html" id="c0">
        <img src="${produtos[0].image}" height="400px" width="600px" class="d-block w-100" alt="Imagem carrossel 0">
      </a>
    </div>
  `;

  for (let i = 1; i < produtos.length; i++) {
    const produto = produtos[i];
    ins.insertAdjacentHTML('beforeend', `
      <div class="carousel-item" data-bs-interval="3000" data-bs-pause="hover">
        <a href="detalhes/detail.html" id="c${i}">
          <img src="${produto.image}" height="400px" width="600px" class="d-block w-100" alt="Imagem carrossel ${i}">
        </a>
      </div>
    `);

    ind.insertAdjacentHTML('beforeend', `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>
    `);
  }

  for (let i = 0; i < produtos.length; i++) {
    const linkElement = document.getElementById(`c${i}`);
    linkElement.addEventListener('click', function() {
      const id = produtos[i].id;
      localStorage.setItem('d', id);
    });
  }

  document.getElementById('carossa').style.visibility = "visible";
}

function changeCard(produtos) {
  const carCont = document.getElementById('CardsCont');
  carCont.innerHTML = '';

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container', 'ajuste2');
  carCont.appendChild(rowContainer);

  const maxCards = 12;
  const filteredProducts = produtos.slice(0, maxCards);

  for (let i = 0; i < maxCards; i += 3) {
    const cardline = document.createElement('div');
    cardline.classList.add('row', 'mt-4');
    cardline.classList.add('ajuste');
    rowContainer.appendChild(cardline);

    for (let j = i; j < i + 3; j++) {
      if (j >= filteredProducts.length) {
        break;
      }

      const produto = filteredProducts[j];
      const cardIndex = j + 1;
      const stars = stCount(produto.rating.rate);

      const cardElement = document.createElement('div');
      cardElement.classList.add('col-4', 'card-item');
      cardElement.innerHTML = `
        <div class="card" id="Cards">
          <img src="${produto.image}" value="" class="card-img-top" alt="Imagem produto ${cardIndex}" id="imCa">
          <div class="card-body">
            <a href="detalhes/detail.html" id="b${cardIndex}">
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
      linkElement.addEventListener('click', function() {
        const id = produto.id;
        localStorage.setItem('d', id);
      });
    }
  }
  if (filteredProducts.length > 1 && filteredProducts.length <= 3) {
    rowContainer.classList.add('single-card');
  }
  if (filteredProducts.length === 1) {
    rowContainer.classList.add('single-card');
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