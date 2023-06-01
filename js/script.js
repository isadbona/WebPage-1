const pandaImg = document.querySelector('.panda');
const pinkDot = document.querySelector('.pink-dot');
const blueDot = document.querySelector('.blue-dot');
const purpleDot = document.querySelector('.purple-dot');

pinkDot.addEventListener('click', () => {
  pandaImg.src = 'images/panda.png';
});

blueDot.addEventListener('click', () => {
  pandaImg.src = 'images/pardo.png';
});

purpleDot.addEventListener('click', () => {
  pandaImg.src = 'images/polar.png';
});

const barContainer = document.querySelector(".bar-container");
const barDot = document.querySelector(".bar-dot");
const dotWidth = barDot.offsetWidth;
const bottleSizeDisplay = document.querySelector(".bottle-size");

const sizes = [
  { value: 500, label: "500ml" },
  { value: 1000, label: "1L" },
  { value: 1500, label: "1.5L" },
  { value: 2000, label: "2L" },
  { value: 2500, label: "2.5L" },
];

const stepSize = barContainer.clientWidth / (sizes.length - 1);

barContainer.addEventListener("click", (event) => {
  const barOffsetLeft = barContainer.getBoundingClientRect().left;
  const mouseX = event.pageX - barOffsetLeft;


  let stepIndex = Math.round(mouseX / stepSize);


  stepIndex = Math.max(0, Math.min(stepIndex, sizes.length - 1));


  const dotPosition = stepIndex * stepSize - dotWidth / 2;

  barDot.style.left = `${dotPosition}px`;

  const size = sizes[stepIndex];
  bottleSizeDisplay.textContent = size.label;
});

let isDragging = false;

barDot.addEventListener("mousedown", (event) => {
  event.preventDefault();
  isDragging = true;
  document.body.style.userSelect = "none";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const barOffsetLeft = barContainer.getBoundingClientRect().left;
    const mouseX = event.pageX - barOffsetLeft;

    // Identificar step próximo
    let stepIndex = Math.round(mouseX / stepSize);


    stepIndex = Math.max(0, Math.min(stepIndex, sizes.length - 1));

    // Calcula a posição do ponto baseado no step
    const dotPosition = stepIndex * stepSize - dotWidth / 2;

    barDot.style.left = `${dotPosition}px`;

    const size = sizes[stepIndex];
    bottleSizeDisplay.textContent = size.label;
  }
});

barContainer.addEventListener("mouseover", () => {
  barContainer.style.cursor = "pointer";
});

barContainer.addEventListener("mouseout", () => {
  barContainer.style.cursor = "initial";
});

document.addEventListener('DOMContentLoaded', function () {
  var quantityInput = document.querySelector('.quantity-input');
  const priceElement = document.getElementById('price');
  const bottlePrice = 20; // Valor por garrafa
  const discountThreshold = 4; // 
  const discountPercentage = 10; // desconto em porcentagem

  // atualizador baseado em qt
  function updatePrice() {
    const quantity = parseInt(quantityInput.value);

    // Checar qt
    if (isNaN(quantity) || quantity <= 0) {
      priceElement.textContent = 'R$ 0,00';
    } else {
      let totalPrice = quantity * bottlePrice;

      // desconto pra 4 ou mais
      if (quantity >= discountThreshold) {
        const discountAmount = totalPrice * (discountPercentage / 100);
        totalPrice -= discountAmount;
      }

      priceElement.textContent = 'R$ ' + totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  quantityInput.value = 1;

  updatePrice();

  quantityInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
    updatePrice();
  });
});

const nameInput = document.querySelector('.name-input');

// mensagem padrão
nameInput.setCustomValidity('Insira seu nome');

nameInput.addEventListener('input', function () {
  const name = this.value.trim();

  if (name === '') {
    // Vazio
    nameInput.setCustomValidity('Informe seu nome');
  } else {
    // Valido
    nameInput.setCustomValidity('');
  }
});

nameInput.addEventListener('invalid', function () {
  if (!nameInput.validity.valid && nameInput.value !== '') {
    // Invalido
    nameInput.setCustomValidity('Informe seu nome');
  }
});

nameInput.addEventListener('focus', function () {
  nameInput.setCustomValidity('');
});


const emailInput = document.getElementById('email-input');

// Set default validation message
emailInput.setCustomValidity('Insira seu e-mail');

emailInput.addEventListener('input', function () {
  const email = this.value.trim();

  if (email === '') {
    // Vazio
    emailInput.setCustomValidity('Informe seu e-mail');
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Valido
    emailInput.setCustomValidity('');
  } else {
    // Invalido
    emailInput.setCustomValidity('Formato de e-mail inválido');
  }
});

emailInput.addEventListener('invalid', function () {
  if (!emailInput.validity.valid && emailInput.value !== '') {
    // Invalido
    emailInput.setCustomValidity('Formato de e-mail inválido');
  }
});

emailInput.addEventListener('focus', function () {
  emailInput.setCustomValidity('');
});


function formatCPF(input) {
  // Remove não digitos
  const cpf = input.value.replace(/\D/g, '');

  // Formato CPF ponto e hifen
  const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  input.value = formattedCPF;
}

function onlyDigits(event) {
  const keyCode = event.which || event.keyCode;
  if (keyCode < 48 || keyCode > 57) {
    event.preventDefault();
  }
}
const cpfInput = document.getElementById('cpf-input');

cpfInput.setCustomValidity('Informe seu CPF');

cpfInput.addEventListener('input', function () {
  const cpf = this.value.trim();

  if (cpf === '') {
    // Vazio
    cpfInput.setCustomValidity('Por favor, informe seu CPF');
  } else {
    // Valido
    cpfInput.setCustomValidity('');
  }
});

cpfInput.addEventListener('invalid', function () {
  if (!cpfInput.validity.valid && cpfInput.value !== '') {
    // Invalido
    cpfInput.setCustomValidity('Por favor, informe seu CPF');
  }
});

cpfInput.addEventListener('focus', function () {
  cpfInput.setCustomValidity('');
});


document.addEventListener('DOMContentLoaded', function () {
  var cvvCodeInput = document.getElementById('cvv-code');

  cvvCodeInput.addEventListener('input', function () {
    var inputValue = this.value;
    var sanitizedValue = inputValue.replace(/[^0-9]/g, ''); // Remove não numéricos
    this.value = sanitizedValue;
  });
});


document.addEventListener('DOMContentLoaded', function () {
  var cardDateInput = document.getElementById('card-date');

  cardDateInput.addEventListener('input', function () {
    var inputValue = this.value;
    var sanitizedValue = inputValue.replace(/[^0-9]/g, ''); // Remove não numéricos
    var formattedValue = formatCardDate(sanitizedValue);

    this.value = formattedValue;
  });

  function formatCardDate(inputValue) {
    var formattedValue = '';
    var month = inputValue.substr(0, 2);
    var year = inputValue.substr(2, 4);

    if (month) {
      if (parseInt(month) < 1) {
        month = '01';
      } else if (parseInt(month) > 12) {
        month = '12';
      }
      formattedValue += month;
    }

    if (year) {
      formattedValue += '/' + year;
    }

    return formattedValue;
  }
});

const cvvInput = document.getElementById('cvv-code');

// Set default validation message
cvvInput.setCustomValidity('Informe o CVV');

cvvInput.addEventListener('input', function () {
  const cvv = this.value.trim();

  if (cvv === '') {
    // vazio
    cvvInput.setCustomValidity('Por favor, informe o CVV');
  } else {
    // valido
    cvvInput.setCustomValidity('');
  }
});

cvvInput.addEventListener('invalid', function () {
  if (!cvvInput.validity.valid && cvvInput.value !== '') {
    // invalido
    cvvInput.setCustomValidity('Por favor, informe o CVV');
  }
});

cvvInput.addEventListener('focus', function () {
  cvvInput.setCustomValidity('');
});

const finalizarButton = document.getElementById('finalizar-button');

finalizarButton.addEventListener('click', function (event) {
  event.preventDefault(); // Previnir finalização

  // FORM
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const cpfInput = document.getElementById('cpf-input');
  const cvvInput = document.getElementById('cvv-code');

  let isValid = true;

  // NOME
  if (nameInput.value.trim() === '') {
    nameInput.setCustomValidity('Informe seu nome');
    isValid = false;
  } else {
    nameInput.setCustomValidity('');
  }

  // EMAIL
  const email = emailInput.value.trim();
  if (email === '') {
    emailInput.setCustomValidity('Informe seu e-mail');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.setCustomValidity('Formato de e-mail inválido');
    isValid = false;
  } else {
    emailInput.setCustomValidity('');
  }

  // CPF
  const cpf = cpfInput.value.trim();
  if (cpf === '') {
    cpfInput.setCustomValidity('Por favor, informe seu CPF');
    isValid = false;
  } else {
    cpfInput.setCustomValidity('');
  }

  // CVV
  const cvv = cvvInput.value.trim();
  if (cvv === '') {
    cvvInput.setCustomValidity('Por favor, informe o CVV');
    isValid = false;
  } else {
    cvvInput.setCustomValidity('');
  }

  // pop ups
  const successMessage = 'Pedido realizado com sucesso!';
  const errorMessage = 'Por favor, preencha os campos corretamente.';

  if (isValid) {
    alert(successMessage);
  } else {
    alert(errorMessage);
  }
});

function validateForm() {

  if (document.querySelector('form').checkValidity()) {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.textContent = 'Form filled successfully!';

    document.querySelector('form').reset();
  } else {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.textContent = 'Please fill the form correctly.';
  }
}
