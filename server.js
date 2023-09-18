const express = require("express");
const bodyParser = require("body-parser");
const exceljs = require("exceljs");
const fs = require("fs");
const moment = require("moment");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
  const data = req.body;

  const productsInfo = {
    amendoim: { name: "Amendoim", price: 1.0 },
    bananada: { name: "Bananada", price: 1.0 },
    doceabobora: { name: "Doce de Abóbora", price: 1.7 },
    doceamendoim: { name: "Doce de Amendoim", price: 1.7 },
    pacoquita: { name: "Paçoquita", price: 0.5 },
    "5star": { name: "5 Star", price: 2.5 },
    alpino: { name: "Alpino", price: 2.2 },
    baton: { name: "Baton", price: 1.3 },
    bis: { name: "Bis", price: 2.5 },
    caribe: { name: "Caribe", price: 2.2 },
    galak: { name: "Galak", price: 2.2 },
    chockito: { name: "Chockito", price: 2.2 },
    crocante: { name: "Crocante", price: 2.2 },
    crunch: { name: "Crunch", price: 2.2 },
    kitkat: { name: "Kitkat", price: 3.0 },
    lolo: { name: "Lolo", price: 2.2 },
    moca: { name: "Moça", price: 2.5 },
    prestigio: { name: "Prestígio", price: 2.2 },
    sensacao: { name: "Sensação", price: 2.5 },
    snicker: { name: "Snickers", price: 2.5 },
    talento: { name: "Talento", price: 2.2 },
    trentoallegro: { name: "Trento Allegro", price: 2.5 },
    trentobites: { name: "Trento Bites", price: 2.5 },
    trento: { name: "Trento", price: 2.2 },
    twix: { name: "Twix", price: 2.5 },
    nutela: { name: "Nutella", price: 3.5 },
    mentos: { name: "Mentos", price: 2.0 },
    halls: { name: "Halls", price: 1.5 },
    jujuba: { name: "Jujuba", price: 1.0 },
    mentostrident: { name: "Mentos Trident", price: 2.0 },
    batata: { name: "Batata", price: 1.3 },
    biscoitopolvilho: { name: "Biscoito de Polvilho", price: 1.2 },
    doritos: { name: "Doritos", price: 1.3 },
    fofura: { name: "Fofura", price: 1.3 },
    skinny: { name: "Skinny", price: 2.0 },
    torcida: { name: "Torcida", price: 2.0 },
    bolinhoduo: { name: "Bolinho Duo Bauducco", price: 1.2 },
    pipocafrank: { name: "Pipoca Frank", price: 1.7 },
    coca250ml: { name: "Coca-Cola 250ml", price: 2.5 },
    guaravita290ml: { name: "Guaravita 290ml", price: 1.5 },
    sprite200ml: { name: "Sprite 200ml", price: 2.0 },
    sucodelvale200ml: { name: "Suco Del Valle 200ml", price: 2.0 },
    portacracha: { name: "Porta Crachá", price: 1.5 },
    puxacracha: { name: "Puxa-Crachá", price: 2.5 },
  };

  const filePath = "data.xlsx";
  const exists = fs.existsSync(filePath);

  const upperCaseName = data.name.toUpperCase();
  const formattedDate = moment().format(" DD/MM/YYYY - HH:mm:ss");

  if (exists) {
    const workbook = new exceljs.Workbook();
    workbook.xlsx
      .readFile(filePath)
      .then(() => {
        const worksheet = workbook.getWorksheet("Dados");
        Object.keys(productsInfo).forEach((productKey) => {
          const productInfo = productsInfo[productKey];
          const productName = productInfo.name;
          const productPrice = productInfo.price;
          const productQuantity = data[productKey + "Quantity"];
          if (productQuantity > 0) {
            const totalAmount = productPrice * productQuantity;
            worksheet.addRow([
              upperCaseName,
              productName,
              productQuantity,
              totalAmount,
              formattedDate,
            ]);
          }
        });
        return workbook.xlsx.writeFile(filePath);
      })
      .then(() => {
        console.log("Dados adicionados ao arquivo existente:", filePath);
        res.json({ success: true, message: "Dados adicionados com sucesso." });
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados ao arquivo:", error);
        res
          .status(500)
          .json({ success: false, message: "Erro ao adicionar os dados." });
      });
  } else {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Dados");
    worksheet.addRow([
      "Nome",
      "Produto",
      "Quantidade",
      "Valor Total",
      "Data e Hora",
    ]);
    Object.keys(productsInfo).forEach((productKey) => {
      const productInfo = productsInfo[productKey];
      const productName = productInfo.name;
      const productPrice = productInfo.price;
      const productQuantity = data[productKey + "Quantity"];
      if (productQuantity > 0) {
        const totalAmount = productPrice * productQuantity;
        worksheet.addRow([
          upperCaseName,
          productName,
          productQuantity,
          totalAmount,
          formattedDate,
        ]);
      }
    });

    workbook.xlsx
      .writeFile(filePath)
      .then(() => {
        console.log("Novo arquivo Excel criado com os dados:", filePath);
        res.json({ success: true, message: "Dados salvos com sucesso." });
      })
      .catch((error) => {
        console.error("Erro ao salvar o novo arquivo:", error);
        res
          .status(500)
          .json({ success: false, message: "Erro ao salvar os dados." });
      });
  }
});

app.listen(port, () => {
  console.log(`🎲 Servidor rodando em http://localhost:${port}`);
});
