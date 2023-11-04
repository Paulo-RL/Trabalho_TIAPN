function validateForm() {
  const name = document.getElementById('name').value;
  const cardNumber = document.getElementById('cartao').value;
  const expiration = document.getElementById('validade').value;
  const cvv = document.getElementById('cvv').value;

  if (name === '' || cardNumber === '' || expiration === '' || cvv === '') {
    alert('Por favor, preencha todos os campos do formulário.');
    return false;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiration)) {
    alert('Formato de validade inválido. Use o formato MM/AA.');
    return false;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    alert('O CVV deve ter 3 ou 4 dígitos.');
    return false;
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    alert('Número do cartão de crédito inválido. Deve ter 16 dígitos.');
    return false;
  }

  return true;
}

function updateParcelamento() {
  const parcelamentoSelect = document.getElementById('parcelamento');
  const selectedOption = parcelamentoSelect.options[parcelamentoSelect.selectedIndex];
  const parcelamentoValue = selectedOption.value;

  alert(`Você escolheu pagar em ${parcelamentoValue} parcela(s).`);
}

document.getElementById('form').addEventListener('submit', function (event) {
  if (!validateForm()) {
    event.preventDefault();
  } else {
    alert('Pagamento efetuado com sucesso!');
  }
});

document.getElementById('parcelamento').addEventListener('change', updateParcelamento);


document.addEventListener('DOMContentLoaded', function () {
  var botaoMostrarJson = document.getElementById('mostrarJson');

  if (botaoMostrarJson) {
    botaoMostrarJson.addEventListener('click', function () {
      var exemploJson = {
        nome: 'João da Silva',
        numeroCartao: '**** **** **** 1234',
        validade: '12/25',
        cvv: '***',
        parcelamento: 'À vista'
      };

      var jsonFormatado = JSON.stringify(exemploJson, null, 2);

      alert('Exemplo de Dados JSON:\n' + jsonFormatado);
    });
  }
});
