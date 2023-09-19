document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o envio do formulário padrão
    if (validateForm()) {
      sendData();
    }
  });
});

function validateForm() {
  const name = document.getElementById("name").value;
  const products = [
    "amendoim",
    "bananada",
    "doceabobora",
    "doceamendoim",
    "pacoquita",
    "5star",
    "alpino",
    "baton",
    "bis",
    "caribe",
    "galak",
    "chockito",
    "crocante",
    "crunch",
    "kitkat",
    "lolo",
    "moca",
    "prestigio",
    "sensacao",
    "snicker",
    "talento",
    "trentoallegro",
    "trentobites",
    "trento",
    "twix",
    "nutela",
    "mentos",
    "halls",
    "jujuba",
    "mentostrident",
    "batata",
    "biscoitopolvilho",
    "doritos",
    "fofura",
    "skinny",
    "torcida",
    "bolinhoduo",
    "pipocafrank",
    "coca250ml",
    "guaravita290ml",
    "sprite200ml",
    "sucodelvale200ml",
    "portacracha",
    "puxacracha",
  ];

  // Verifique se o nome não está vazio
  if (name.trim() === "") {
    alert("Por favor, insira um nome.");
    return false;
  }

  // Verifique se pelo menos um produto foi selecionado
  let atLeastOneProductSelected = false;
  for (const product of products) {
    const quantity = parseInt(document.getElementById(product).value) || 0;
    if (quantity > 0) {
      atLeastOneProductSelected = true;
      break;
    }
  }

  if (!atLeastOneProductSelected) {
    alert("Selecione pelo menos um produto.");
    return false;
  }

  return true;
}

function sendData() {
  const name = document.getElementById("name").value;
  const products = [
    "amendoim",
    "bananada",
    "doceabobora",
    "doceamendoim",
    "pacoquita",
    "5star",
    "alpino",
    "baton",
    "bis",
    "caribe",
    "galak",
    "chockito",
    "crocante",
    "crunch",
    "kitkat",
    "lolo",
    "moca",
    "prestigio",
    "sensacao",
    "snicker",
    "talento",
    "trentoallegro",
    "trentobites",
    "trento",
    "twix",
    "nutela",
    "mentos",
    "halls",
    "jujuba",
    "mentostrident",
    "batata",
    "biscoitopolvilho",
    "doritos",
    "fofura",
    "skinny",
    "torcida",
    "bolinhoduo",
    "pipocafrank",
    "coca250ml",
    "guaravita290ml",
    "sprite200ml",
    "sucodelvale200ml",
    "portacracha",
    "puxacracha",
  ];

  const data = {
    name,
  };

  for (const product of products) {
    const quantity = parseInt(document.getElementById(product).value) || 0;
    data[product + "Quantity"] = quantity;
  }

  fetch("/https://api.sheetmonkey.io/form/xuCL3Q9ZZdMQkGoVp6fXWu", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Resultado:", result);

      // Exibir mensagem de feedback usando Toastr
      if (result.success) {
        toastr.success(result.message);
      } else {
        toastr.error(result.message);
      }

      // Limpar os campos do formulário após o envio
      document.getElementById("name").value = "";
      for (const product of products) {
        document.getElementById(product).value = "";
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function incrementaValor(valorMaximo, id) {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value >= valorMaximo) {
    value = valorMaximo;
  } else {
    value++;
  }
  document.getElementById(id).value = value;
}

function decrementaValor(valorMinimo, id) {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value <= valorMinimo) {
    value = 0;
  } else {
    value--;
  }
  document.getElementById(id).value = value;
}
console.log("Executando...");
