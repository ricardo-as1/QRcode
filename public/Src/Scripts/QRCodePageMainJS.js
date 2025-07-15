    import { Canvg } from 'https://cdn.skypack.dev/canvg@^4.0.0';

    let lastQuery = 'https://google.com';
    const size = document.getElementById('imgSize');
    const imgType = document.getElementById('imgType');

    function genSvg(val) {
      return new QRCode({
        content: val,
        container: 'svg-viewbox',
        join: true,
        width: size.value,
        height: size.value
      }).svg();
    }

    async function genPng(val) {
      const canvas = document.getElementById('canv');
      canvas.width = size.value;
      canvas.height = size.value;

      const ctx = canvas.getContext('2d');
      const svg = genSvg(val);

      const v = await Canvg.from(ctx, svg);
      await v.render();

      return canvas.toDataURL('image/png');
    }

    function sanitizeFilename(name) {
      return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    window.onload = () => {
      const btn = document.getElementById('genBtn');
      const linkBox = document.getElementById('linkBox');
      const qrcode = document.getElementById('qrcode');
      const genWifiBtn = document.getElementById('genWifiBtn');
      const ssidBox = document.getElementById('ssidBox');
      const pwdBox = document.getElementById('pwdBox');
      const downloadBtn = document.getElementById('downloadBtn');
      const eyeIcon = document.getElementById("eyeIcon");

      qrcode.innerHTML = genSvg(lastQuery);

      btn.onclick = () => {
        qrcode.innerHTML = genSvg(linkBox.value);
        lastQuery = linkBox.value;
      };

      genWifiBtn.onclick = () => {
        const wifi = `WIFI:S:${ssidBox.value};T:WPA2;P:${pwdBox.value};;`;
        qrcode.innerHTML = genSvg(wifi);
        lastQuery = wifi;
      };

      downloadBtn.onclick = async () => {
        const type = imgType.value;
        const fileName = sanitizeFilename(lastQuery);

        if (type === 'png') {
          const pngData = await genPng(lastQuery);
          const link = document.createElement('a');
          link.download = `${fileName}.png`;
          link.href = pngData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (type === 'svg') {
          const svgData = genSvg(lastQuery);
          const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
          const svgUrl = URL.createObjectURL(svgBlob);

          const link = document.createElement('a');
          link.download = `${fileName}.svg`;
          link.href = svgUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(svgUrl);
        }
      };

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