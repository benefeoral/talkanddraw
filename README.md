# Talk And Draw Projesi

## Proje URL

[talkanddraw.online](https://talkanddraw.online/)

## Proje Tanımı

Bu proje, kullanıcıların birbirleriyle konuşarak birlikte çizim yapabilmelerini sağlayan bir uygulamadır. Kullanıcılar, uygulamayı kullanarak birbirleriyle konuşabilir ve aynı anda birlikte çizim yapabilirler.

## Proje Çalışma Mantığı

1 - Proje ilk olarak index.html dosyası ile başlar.

2 - OpenAI'a istek atarken kullanmak için apikey istenir. Eğerki apikey yok ise apikey'i almak için OpenAI sitesine gidilir ve apikey alınır.

2 - Konuşmaya başlamadan önce "Dinlemeye başla" yazısı olan butona basarak konuşmaya başlayabilirler. Konuşma bittiğinde ve ya "Dinliyor..." yazısı olan butona basarak konuşmayı bitirebilirler.

3 - Konuşmayı tarayıcıların SpeechSynthesisUtterance API'si ile dinleyip sonrasında yazıya çeviririz.

4 - Yazıya çevrilen konuşmayı komutlar alt başlığının altında sırasıyla listeleriz. Bu sayede öncesinde söylediklerimizi de görüntüleyebiliriz.

5 - Yazıyı "ciz" fonksiyonuna göndeririz. Bu fonksiyon, metni alır ve OpenAI istek atarak metni,fotoğrafın boyutunu,kalitesini ve modeli belirtiriz. Daha sonra gelen resmi image'in src'sine koyarız.
