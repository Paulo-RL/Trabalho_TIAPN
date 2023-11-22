function IniciarCarin(remover = '') {
  const existingItems = JSON.parse(localStorage.getItem('DE')) || [];
  const preItems = JSON.parse(localStorage.getItem('SA')) || [];

  let cartItems = existingItems.length > 0 ? existingItems : preItems;
  let remItems = preItems;

  const loggedInUserIndex = getLoggedInUserIndex();
  if (loggedInUserIndex !== -1) {
    if (!Array.isArray(cartItems[loggedInUserIndex])) {
      cartItems[loggedInUserIndex] = [];
      remItems[loggedInUserIndex] = [];
    }

    if (remover) {
      const indexToRemove = cartItems[loggedInUserIndex].findIndex(item => item === remover);
      if (indexToRemove !== -1) {
        cartItems[loggedInUserIndex].splice(indexToRemove, 1);
        remItems[loggedInUserIndex].splice(indexToRemove, 1);
      }
    } else {
      const newItemID = localStorage.getItem('CA');
      if (newItemID) {
        cartItems[loggedInUserIndex].push(newItemID);
      }
    }
  } else {
    if (!Array.isArray(cartItems[0])) {
      cartItems[0] = [];
      remItems[0] = [];
    }

    if (remover) {
      const indexToRemove = cartItems[0].findIndex(item => item === remover);
      if (indexToRemove !== -1) {
        cartItems[0].splice(indexToRemove, 1);
        remItems[0].splice(indexToRemove, 1);
      }
    } else {
      const newItemID = localStorage.getItem('CA');
      if (newItemID) {
        cartItems[0].push(newItemID);
      }
    }
  }

  localStorage.setItem('DE', JSON.stringify(cartItems));
  localStorage.setItem('SA', JSON.stringify(remItems));
  prenCar();
  pageSave(existingItems, preItems);
}

localStorage.removeItem('DE');

function removerItem(itemID) {
  IniciarCarin(itemID);
}

async function fetchItemDetails(itemID) {
  const response = await fetch('/base.json');
  const base = await response.json();
  let it = base.itens.find(item => item.id === parseInt(itemID));
  return it;
}

async function fetchItemPrices(itemIDs) {
  try {
    const response = await fetch('/base.json');
    const base = await response.json();

    const prices = itemIDs.map(itemID => {
      const item = base.itens.find(item => item.id === parseInt(itemID));
      return item.price;
    });
    return prices;
  } catch (error) {
    console.error('Error fetching item prices:', error);
    return [];
  }
}

function togCar() {
  document.getElementById('CC').classList.toggle('active');
}

async function addItemToCart(userId, itemId) {
  const response = await fetch('/cart_operations.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          action: 'addItemToCart',
          userId: userId,
          itemId: itemId,
      }),
  });
  const result = await response.json();

  return result.success;
}

async function removeItemFromCart(userId, itemId) {
  const response = await fetch('/cart_operations.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          action: 'removeItemFromCart',
          userId: userId,
          itemId: itemId,
      }),
  });
  const result = await response.json();

  return result.success;
}

function pageSave(existingItems, preItems) {
  let cartItems = existingItems.length > 0 ? existingItems : preItems;
  const loggedInUserIndex = getLoggedInUserIndex();
  if (loggedInUserIndex !== -1) {
    if (!Array.isArray(cartItems[loggedInUserIndex])) {
      cartItems[loggedInUserIndex] = [];
    }
  } else {
    if (!Array.isArray(cartItems[0])) {
      cartItems[0] = [];
    }
  }
  let savedItems;
  savedItems = cartItems;
  localStorage.setItem('LO', JSON.stringify(savedItems));
}

async function pageLoad() {
  localStorage.setItem('DE', localStorage.getItem('LO'));
  const saved = getLoggedInUserCart();
  prenCar(saved);
}

async function prenCar(cartItems2) {
  const cari = document.getElementById('CarinCont');
  const PFContainer = document.getElementById('PrecoFinal');
  const OIContainer = document.getElementById('OutrosItens');
  var cartItems;
  if (cartItems2) {
    cartItems = cartItems2;
  } else {
    cartItems = getLoggedInUserCart();
  }
  cari.innerHTML = '';
  PFContainer.textContent = '';
  OIContainer.textContent = '';
  var precoF = 0;

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const limitedItems = cartItems.slice(0, 4);
  var userI = getLoggedInUserIndex()
  for (const itemID of limitedItems) {
    const item = await fetchItemDetails(itemID);
    cari.innerHTML += `
      <div class="caripro">
        <img src="${item.image}" class="imCari">
        <p class="ticari">${item.title}</p>
        <p class="pecari">R$${parseFloat(item.price).toFixed(2)}</p>
        <button class="recari" onclick="removeItemFromCart('${userI ,item.id}')">Remover produto</button>
      </div>
    `;
    precoF += parseFloat(item.price);
  }

  if (cartItems.length > 4) {
    const oiContainer = document.createElement('p');
    oiContainer.classList.add('OI');
    oiContainer.textContent = `Outros itens: ${cartItems.length - 4}`;
    OIContainer.appendChild(oiContainer);
    const ofLimit = cartItems.splice(4);
    const prices = await fetchItemPrices(ofLimit);

    prices.forEach(price => {
      precoF += parseFloat(price);
    });
  }

  PFContainer.textContent = `Preço final: R$${precoF.toFixed(2)}`;
}


function send(){
  localStorage.setItem('PaymentItens', localStorage.getItem('DE'));
  window.location.href= "/Compra/Compra.html"
}