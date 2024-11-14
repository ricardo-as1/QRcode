import QRCode from "qrcode";

function gerarQRCode() {
  const canvas = document.getElementById("qrcode");
  const link = document.getElementById("link").value;

  if (link.trim() === "") {
    alert("⚠️ Por favor, insira um link válido.");
    return;
  }

  QRCode.toCanvas(canvas, link, { width: 250, height: 250 }, function (error) {
    if (error) console.error(error);
    console.log("QR Code gerado com sucesso!");
  });
}

window.gerarQRCode = gerarQRCode;