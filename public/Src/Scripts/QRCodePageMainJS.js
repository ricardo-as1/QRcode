import { Canvg } from 'https://cdn.skypack.dev/canvg@^4.0.0'; // Importanto a biblioteca Canvg para o SVG

let lastQuery = 'https://google.com';
const size = document.getElementById('imgSize');
const imgType = document.getElementById('imgType');

// Gerar download SVG
function genSvg(val) {
    return new QRCode({
        content: val,
        container: 'svg-viewbox',
        join: true,
        width: size.value,
        height: size.value
    }).svg();
}

// Função para gerar o PNG do QRcode a partir do SVG
function genPng(val) {
    const canvas = document.getElementById('canv');
    canvas.width = size.value;
    canvas.height = size.value;

    const ctx = canvas.getContext('2d');
    const svg = genSvg(val)

    const rend = Canvg.fromString(ctx, svg);
    rend.start();

    return canvas.toDataURL('image/png');
}

// Pagina de geração do QR
window.onload = () => {
    const btn = document.getElementById('genBtn');
    const linkBox = document.getElementById('linkBox');
    const qrcode = document.getElementById('qrcode');
    const genWifiBtn = document.getElementById('genWifiBtn');
    const ssidBox = document.getElementById('ssidBox');
    const pwdBox = document.getElementById('pwdBox');
    const downloadBtn = document.getElementById('downloadBtn');
    const eyeIcon = document.getElementById("eyeIcon");

    // Renderizar QR inicial para "https://google.com"
    qrcode.innerHTML = genSvg(lastQuery);

    // Gerar QR padrão
    btn.onclick = () => {
        qrcode.innerHTML = genSvg(linkBox.value);
        lastQuery = linkBox.value;
    };

    // Generar WiFi QR
    genWifiBtn.onclick = () => {
        const wifi = `WIFI:S:${ssidBox.value};T:WPA2;P:${pwdBox.value};;`;
        qrcode.innerHTML = genSvg(wifi);
        lastQuery = wifi;
    };

    // Download
    downloadBtn.onclick = () => {
        const type = imgType.value;
        if (type === 'png') {
            const link = document.createElement('a');
            link.download = `${encodeURI(lastQuery)}.png`;
            link.href = genPng(lastQuery);
            link.click();
        } else if (type === 'svg') {
            const svgBlob = new Blob([genSvg(lastQuery)], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);
            const link = document.createElement('a');
            link.download = `${encodeURI(lastQuery)}.svg`;
            link.href = svgUrl;
            link.click();
        }
    };

    // Visibilidade da senha
    eyeIcon.addEventListener("click", () => {
        if (pwdBox.type === "password") {
            pwdBox.type = "text";
            eyeIcon.classList.remove("fa-eye");
            eyeIcon.classList.add("fa-eye-slash");
        } else {
            pwdBox.type = "password";
            eyeIcon.classList.remove("fa-eye-slash");
            eyeIcon.classList.add("fa-eye");
        }
    });
};
