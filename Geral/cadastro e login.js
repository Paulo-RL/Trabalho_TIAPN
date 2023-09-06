function OpenCad() {
  OpenBox();
  OpenCad2();
}

function OpenLog() {
  OpenBox();
  OpenLog2();
}

function OpenBox() {
  const lcc = document.getElementById('LCC');
  lcc.classList.toggle('active');

  const elementsToToggle = document.querySelectorAll('header, main, footer');
  elementsToToggle.forEach(element => {
    element.classList.toggle('hidden');
  });
}

function OpenCad2() {
  document.getElementById('LC').innerHTML = `
    <img src="/imagens/close.png" id="cl" alt="Fechar login ou cadastro" onclick="OpenBox()">
    <div>
      <p class="LCT">Cadastro</p>

        <form class="FLC" onsubmit="event.preventDefault(); CADSAV()">
            <div class="INM">
                Nome completo:
                <input type="text" id="INM">
            </div>
            <div class="ITL">
                Telefone:
                <input type="tel" id="ITL">
            </div>
            <div class="IEM">
                Email:
                <input type="email" id="IEM">
            </div>
            <div  class="IPS">
                Senha:
                <input type="password" id="IPS">
            </div>
            <button type="submit" class="IBC">Cadastrar</button>
        </form>
    </div>`;
}

function OpenLog2() {
  document.getElementById('LC').innerHTML = `
    <img src="/imagens/close.png" id="cl" alt="Fechar login ou cadastro" onclick="OpenBox()">
    <div>
        <p class="LCT">Login</p>

        <form class="FLC" onsubmit="event.preventDefault(); LOG()">
            <div class="IEML">
                Email:
                <input type="email" id="IEML">
            </div>
            <div  class="IPSL">
                Senha:
                <input type="password" id="IPSL">
            </div>
            <button type="submit" class="IBL">Login</button>
        </form>
    </div>`;
}

const userList = JSON.parse(localStorage.getItem('userList')) || [];

if (userList.length === 0) {
  userList.push({ name: 'Paulo Leite', telephone: '31999999999', email: 'prleitebiot@gmail.com', password: '0000', status: 1 });
}
if (userList.length === 1) {
  userList.push({ name: '', telephone: '', email: '', password: '', status: 0});
}
if (userList.length === 2) {
  userList.push({ name: 'Paulo', telephone: '31999999991', email: 'prleitebiot@gmail.com', password: '1111', status: 1 });
}
localStorage.setItem('userlist',JSON.stringify(userList))

function getLoggedInUserIndex() {
  var loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));

if (!loggedInUser) {
  localStorage.setItem('LoggedInUser', JSON.stringify({ index: 1 }));
  loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
}
  return loggedInUser ? loggedInUser.index : -1;
}

function getLoggedInUserCart() {
  const loggedInUserIndex = getLoggedInUserIndex();
  if (loggedInUserIndex !== -1) {
    const cartItems = JSON.parse(localStorage.getItem('DE')) || [];
    return cartItems[loggedInUserIndex] || [];
  }
  return [];
}

function CADSAV() {
  const Name = document.getElementById('INM').value;
  const Tel = document.getElementById('ITL').value;
  const Email = document.getElementById('IEM').value;
  const Password = document.getElementById('IPS').value;
  const status=2;

  if (!Name || !Tel || !Email || !Password) {
    displayErrorMessage("Por favor, preencha todos os campos");
    return;
  }

  const userInfo = {
    name: Name,
    telephone: Tel,
    email: Email,
    password: Password,
    status: status
  };

  const isDuplicate = userList.some(user => (
    user.name === Name &&
    user.email === Email
  ));

  if (isDuplicate) {
    displayErrorMessage("Usuário já cadastrado");
    return;
  }

  userList.push(userInfo);
  localStorage.setItem('userList', JSON.stringify(userList));

  OpenBox();
}

var userName = '';
var userTel = '';
var userEm = '';
var userSt = 0;
var Login = false;

function LOG() {
  const Email = document.getElementById('IEML').value;
  const Password = document.getElementById('IPSL').value;

  if (!Email || !Password) {
    displayErrorMessage("Por favor, preencha todos os campos");
    return;
  }

  const userIndex = userList.findIndex(user => (
    user.password === Password &&
    user.email === Email
  ));

  if (userIndex === -1) {
    displayErrorMessage("Login inválido");
    return;
  }

  userName = userList[userIndex].name;
  userTel = userList[userIndex].telephone;
  userEm = userList[userIndex].email;
  userSt= userList[userIndex].status;
  Login = true;
  localStorage.setItem('LoggedInUser', JSON.stringify({ index: userIndex, name: userName, telephone: userTel, email: userEm, status: userSt}));
  localStorage.setItem('CSSPESQ', 'false');
  location.reload()
  LO()
}

function displayErrorMessage(message) {
  const LogCad = document.getElementById('LC');
  if (!LogCad) {
    console.error("LogCadCont element not found");
    return;
  }
  const c2 = document.getElementById('ErM');
  if (c2) {
    c2.textContent = message;
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.id = 'ErM';
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    LogCad.appendChild(errorMessage);
  }
}

function ADM() {
  const UN = document.getElementById('un');
  const UN2 = document.getElementById('un2');
  UN2.innerHTML = `
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="ll()">Limpar lista</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="CP()">CSS pesquisa</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenPerf()">Perfil</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="LOUT()">Logout</button>`;
  UN.innerHTML = `
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="ll()">Limpar lista</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="CP()">CSS pesquisa</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenPerf()">Perfil</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="LOUT()">Logout</button>`;
  console.log('Administrator mode activated');
  document.getElementById('SP').innerHTML = 'Status: Administrador';
  document.getElementById('IP').src = "/imagens/imagem%20logo.png";
}

function ll() {
  const userList = JSON.parse(localStorage.getItem('userList')) || [];
    const cartItems = JSON.parse(localStorage.getItem('DE')) || [];
    var userList2 = userList.filter(user =>user.status === 2);
    var userList3 = userList.filter(user =>user.status === 0 || user.status === 1);
    var userList4 = userList.filter(user => user.status === 2 || user.status === 0);
  
    if (userList2.length > 0) {
      userList2 = []
      const UL = [...userList3, ...userList2];
      localStorage.setItem('userList', JSON.stringify(UL));
    }
    userList4.forEach(user => {
      const userIndex = userList.indexOf(user);
      if (userIndex !== -1 && cartItems[userIndex]) {
        cartItems[userIndex] = [];
      }
    });
    localStorage.setItem('DE', JSON.stringify(cartItems));
    localStorage.setItem('LO', JSON.stringify(cartItems));
  }

function CP() {
  var t = localStorage.getItem('CSSPESQ');
  if (t && t === 'true') {
    localStorage.setItem('CSSPESQ', 'false');
  } else {
    localStorage.setItem('CSSPESQ', 'true');
  }
  console.log(localStorage.getItem('CSSPESQ'));
}



function LOUT() {
  var logIndex= JSON.parse(localStorage.getItem('LoggedInUser'))
  logIndex=logIndex.index
  if(logIndex !=1){
  userName = userList[1].name;
  userTel = userList[1].telephone;
  userEm = userList[1].email;
  var userSt = 0;
  localStorage.setItem('LoggedInUser', JSON.stringify({ index: 1, name: userName, telephone: userTel, email: userEm, status: userSt }));
  localStorage.setItem('CSSPESQ', 'false');
  location.reload()
  }
  const UN = document.getElementById('un');
  const UN2 = document.getElementById('un2');
  Login = false;
  UN2.innerHTML = `
    <button type="button" class="nav-link botaoLogCad" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>
    <button type="button" class="nav-link botaoLogCad" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>`;
  UN.innerHTML = `
    <button type="button" class="nav-link botaoLogCad" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>
    <button type="button" class="nav-link botaoLogCad" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>`;
}

function perfil(Login) {
  const infUser = JSON.parse(localStorage.getItem('LoggedInUser'));
  const pfl = document.getElementById('perfil');
  pfl.innerHTML = `
    <div class="perfilInfo">
      <img src="/imagens/close.png" id="cl" alt="Fechar perfil" onclick="OpenPerf()">
      <img src="" class="IP" id="IP" alt="">
      <p class="TP">Perfil do usuário</p>
      <p class="NP" id="NP">Nome do usuário</p>
      <p class="TlP" id="TlP">Telefone do usuário</p>
      <p class="EP" id="EP">E-mail do usuário</p>
      <p class="SP" id="SP">Status do usuário</p>
    </div>
  `;

  if (Login) {
    document.getElementById('NP').innerHTML = `Nome: ${infUser.name}`;
    document.getElementById('TlP').innerHTML = `Telefone: ${formatarNumero(infUser.telephone)}`;
    document.getElementById('EP').innerHTML = `E-mail: ${infUser.email}`;
    document.getElementById('SP').innerHTML = `Status: ${infUser.index === 0 ? 'Administrador' : 'Usuário'}`;
  }
}

function OpenPerf() {
  const pfl = document.getElementById('perfil');
  pfl.classList.toggle('active');

  setTimeout(function() {
    window.scrollTo({ top: 0 });

    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');

    if (pfl.classList.contains('active')) {
      htmlElement.style.overflow = 'hidden';
      bodyElement.style.overflow = 'hidden';
      htmlElement.style.scrollbarWidth = 'none';
    } else {
      htmlElement.style.overflow = '';
      bodyElement.style.overflow = '';
      htmlElement.style.scrollbarWidth = '';
    }
  }, 700);
}

function formatarNumero(number) {
  const formatado = /^\(\d{2}\) \d{5}-\d{4}$/.test(number);

  if (formatado) {
    return number;
  }

  const digitsOnly = number.replace(/\D/g, '');

  const formatar = digitsOnly.replace(
    /(\d{2})(\d{5})(\d{4})/,
    '($1) $2-$3'
  );

  return formatar;
}

function LO() {
  const UN = document.getElementById('un');
  const UN2 = document.getElementById('un2');
  var logIndex= JSON.parse(localStorage.getItem('LoggedInUser'))
  logIndex=logIndex.index
  if (Login && logIndex!=1) {
    UN2.innerHTML = `
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenPerf()">Perfil</button>
  
    <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="LOUT()">Logout</button>`;
    UN.innerHTML = `
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>

    
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>

    
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenPerf()">Perfil</button>

    
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="LOUT()">Logout</button>
`;
    perfil(Login);
    var userStatus=JSON.parse(localStorage.getItem('LoggedInUser'))
    userStatus = userStatus.status;
    if (userStatus === 1) {
      ADM();
      OpenBox();
      return;
    }
    document.getElementById('IP').src = "/imagens/perfiljpg.jpg";
    OpenBox();
  } else {
    UN.innerHTML = `
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>

    
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>
`;
    UN2.innerHTML = `
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenCad()">Cadastro</button>

    
      <button type="button" class="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onclick="OpenLog()">Login</button>
`;
  }
}
/* const Delete = 0;
if (Delete >= 0 && Delete < userList.length) {
  userList.splice(Delete, 1);
}
localStorage.setItem('userList', JSON.stringify(userList));
console.log(userList); *//* Limpador de lista */
/* if (cartItems.length > 2) {
    cartItems.splice(2);
    localStorage.setItem('DE', JSON.stringify(cartItems));
    localStorage.setItem('LO', JSON.stringify(cartItems));
  } */