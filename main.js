let apiToken = "";
// Gerekli HTML elementlerini seçme
const anahtariOnaylaButonu = document.querySelector("#anahtariOnaylaButonu");
const apiKeyInput = document.querySelector("#apikey");
const sifreDiv = document.querySelector("#divPass");
const komutYazisi = document.querySelector("#command");
const baslaButonu = document.querySelector("#start-btn");
const cizmeAnimasyonu = document.querySelector("#drawGif");
const komutListesi = document.querySelector("#commandText");
const sonucImage = document.querySelector("#sonucImage");
apiKeyInput.value = localStorage.getItem("apikey") || "";
// Başlangıç değerleri ve değişken tanımları
let komutDinleniyor = false; // Konuşma tanıma dinleniyor mu?
let sesTanima = new webkitSpeechRecognition() || new SpeechRecognition(); // Konuşma tanıma nesnesi
sesTanima.continuous = false; // Sürekli tanıma devam edecek mi?
sesTanima.lang = "tr-TR"; // Tanınacak dil
sesTanima.interimResults = false; // Arada sonuçlar gösterilecek mi?
sesTanima.maxAlternatives = 1; // Alınacak en fazla alternatif sayısı

// Boşluk tuşuna basıldığında konuşma tanıma işlemini başlatma/durdurma
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    dinlemeyiAcKapa();
  }
};

anahtariOnaylaButonu.addEventListener("click", anahtariOnayla);

// Başlatma butonuna tıklama olayını dinleme
baslaButonu.addEventListener("click", dinlemeyiAcKapa);

function anahtariOnayla() {
  var girilenSifre = apiKeyInput.value;
  if (!girilenSifre.startsWith("sk-")) {
    alert("Hatalı OpenAI api key girildi.");
    return;
  }
  apiToken = girilenSifre;
  baslaButonu.style.display = "block";
  baslaButonu.style.pointerEvents = "inherit";
  sifreDiv.style.display = "none";
  localStorage.setItem("apikey", apiToken);
}

// Konuşma tanıma işlemini başlatma/durdurma işlevi
function dinlemeyiAcKapa() {
  if (komutDinleniyor) {
    sesTanima.stop();
    komutDinleniyor = false;
    baslaButonu.classList.remove("listening");
  } else {
    sesTanima.start();
    baslaButonu.classList.add("listening");
    baslaButonu.textContent = "Dinliyor...";
    komutDinleniyor = true;
  }
}

// Konuşma tanıma sonuçlarını işleme
sesTanima.onresult = (event) => {
  const soylenenMetin = event.results[event.resultIndex][0].transcript;

  let speechSynthesis = window.speechSynthesis;
  let komutTekrari = new SpeechSynthesisUtterance(soylenenMetin);
  komutTekrari.lang = "tr-TR";
  speechSynthesis.speak(komutTekrari);

  // Tanınan komutları ekrana yazdırma
  var yeniKomut = document.createElement("li");
  yeniKomut.textContent = soylenenMetin;
  komutListesi.style.display = "block";
  komutYazisi.appendChild(yeniKomut);

  // Tanınan komuta göre çizim yapma
  ciz(soylenenMetin);
};

// Konuşma tanıma işlemi sonlandığında
sesTanima.onend = () => {
  baslaButonu.classList.remove("listening");
  baslaButonu.textContent = "Dinlemeye başla";
  komutDinleniyor = false;
};

// Konuşma sonucuna göre çizim yapma işlevi
async function ciz(soylenenMetin) {
  // Çizim işlemi sırasında gösterilecek animasyon
  cizmeAnimasyonu.style.display = "block";
  baslaButonu.style.display = "none";
  try {
    // Sunucuya POST isteği gönderme
    const sonuc = await fetch("https://api.openai.com/v1/images/generations", {
      headers: {
        accept: "*/*",
        "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Authorization: "Bearer " + apiToken,
        "Content-Type": "application/json",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "POST",
      body: JSON.stringify({
        prompt:
          "WITHOUT ANY DETAILS, DRAW THIS PROMPT WITHOUT A BACKGROUND: " +
          soylenenMetin,
        model: "dall-e-3",
        n: 1,
        response_format: "b64_json",
        size: "1024x1024",
        style: "vivid",
        quality: "standard",
      }),
    });
    const gelenSonuc = await sonuc.json();
    let gelenImage = gelenSonuc.data[0].b64_json;
    //create image from b64
    const base64Img = "data:image/jpeg;base64," + gelenImage;
    sonucImage.src = base64Img;

    sonucImage.style.visibility = "visible";
    // Çizim animasyonu ve başlatma butonunu yeniden gösterme
    cizmeAnimasyonu.style.display = "none";
    baslaButonu.style.display = "block";
  } catch (error) {
    // Hata durumunda konsola hata mesajı yazdırma
    console.error("İşlem sırasında bir hata oluştu:", error);
    cizmeAnimasyonu.style.display = "none";
    baslaButonu.style.display = "block";
  }
}
