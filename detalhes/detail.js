async function detail() {
  const Proid = localStorage.getItem('d');

  const response = await fetch('/base.json');
  const base = await response.json();
  const produto = base.itens.find((item) => item.id === parseInt(Proid));

  change(produto);
}

function change(prod) {
  const { id, rating, description, image, price, title, gender, year, brandName } = prod;

  const stars2 = stCount(rating.rate);
  document.getElementById('Est').innerHTML = stars2;

  document.getElementById('count').textContent = `Votos ${rating.count.toLocaleString()}`;
  document.getElementById('gen').textContent = `Gêneros: ${gender.join(", ")}`;
  document.getElementById('ye').textContent = `Ano de lançamento: ${year}`;
  document.getElementById('brand').textContent = `Autor: ${brandName}`;
  document.getElementById('descr').textContent = description;
  document.getElementById('im').src = image;
  document.getElementById('titl').textContent = title;
  document.getElementById('preco').textContent = `R$${parseFloat(price).toFixed(2)}`;

  const CAR = document.querySelector('#Carin');
  CAR.addEventListener('click', function() {
    localStorage.setItem('CA', JSON.stringify(id));
    IniciarCarin();
    alert('Produto adicionado com sucesso!');
  });
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

function pes4() {
  localStorage.setItem('p', document.getElementById('detP').value);
}
