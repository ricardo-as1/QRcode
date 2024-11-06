function gerarQRCode() {
  document.getElementById("qrcode").innerHTML = "";

  const link = document.getElementById("link").value;

  if (link.trim() === "") {
    alert("⚠️ Por favor, insira um link válido.");
    return;
  }

  new QRCode(document.getElementById("qrcode"), {
    text: link,
    width: 200,
    height: 200
  });
}
