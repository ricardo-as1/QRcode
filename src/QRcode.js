import QRCode from "qrcode";

function gerarQRCode() {
  const canvas = document.getElementById("qrcode");
  const link = document.getElementById("link").value;

  if (link.trim() === "") {
    alert("⚠️ Por favor, insira um link válido.");
    return;
  }

  // Torna a caixa do QR Code visível
  document.getElementById("qrcode").style.display = "flex";

  QRCode.toCanvas(canvas, link, { width: 250, height: 250 }, function (error) {
    if (error) {
      console.error(error);
      return;
    }
    console.log("QR Code gerado com sucesso!");
  });
}

function limparTexto() {
  document.getElementById('link').value = '';
  // Torna a caixa do QR Code invisível novamente
  document.getElementById("qrcode").style.display = "none";
}

document.getElementById('clearButton').addEventListener('click', limparTexto);

function updateDynamicStyles() {
  let style = document.getElementById("dynamic-styles");

  if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-styles";
    document.head.appendChild(style);
  }

  if (window.innerWidth <= 768) {
    style.textContent = `
      button {
        width: 80%;
        font-size: 0.9rem;
      }
    `;
  } else {
    style.textContent = `
      button {
        width: 160px;
        font-size: 1rem;
      }
    `;
  }
}

// Atualiza estilos ao carregar a página e ao redimensionar
window.addEventListener("resize", updateDynamicStyles);
window.addEventListener("load", updateDynamicStyles);
window.gerarQRCode = gerarQRCode;