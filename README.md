# Talk And Draw Projesi
## Proje URL
https://benefeoral.github.io/talkanddraw/

## Proje Tanımı

Bu proje, kullanıcıların birbirleriyle konuşarak birlikte çizim yapabilmelerini sağlayan bir uygulamadır. Kullanıcılar, uygulamayı kullanarak birbirleriyle konuşabilir ve aynı anda birlikte çizim yapabilirler.

## Proje Nasil Kendi Bilgisayarınızda Çalıştırılır?

Proje, Python programlama dili kullanılarak geliştirilmiştir.
1-Projenin çalıştırılabilmesi için bilgisayarınızda Python yüklü olmalıdır. Python yüklü değilse, [Python'un resmi web sitesinden](https://www.python.org/downloads/) indirip yükleyebilirsiniz.
2-Python yüklendikten sonra, projenin bulunduğu dizine terminal üzerinden gidin.
3-Terminal üzerinden `pip install --user -r requirements.txt` komutunu çalıştırarak projenin içinde kullandığı paketleri yükleyin. Projenin içinde kullanılan paketlerin listesi `requirements.txt` dosyasında bulunmaktadır.
4-Paketler yüklendikten sonra, terminal üzerinden `python main.py` komutunu çalıştırarak projeyi başlatabilirsiniz. pytohn yazdıktan sonra hangi dosyanın çalıştırılacağını belirtiyoruz. Bizim ana dosyamız "main.py" olduğu için main.py yazdık.

## Proje Çalışma Mantığı

1- "/" dizinine GET isteği atıldığında, uygulama kullanıcıya `index.html` dosyasını döner. Bu dosya, kullanıcıya uygulamanın arayüzünü sunar. Bu arayüzde kullanıcılar, konuşma yaparak çizilmesini istediğimiz resmi anlatır.

2- Konuşmaya başlamadan önce "Dinlemeye başla" yazısı olan butona basarak konuşmaya başlayabilirler. Konuşma bittiğinde ve ya "Dinliyor..." yazısı olan butona basarak konuşmayı bitirebilirler.

3- Konuşmayı tarayıcıların SpeechSynthesisUtterance API'si ile dinleyip sonrasında yazıya çeviririz.

4- Yazıya çevrilen konuşmayı index.html içindeki "ciz" fonksiyonuna göndeririz. Bu fonksiyon, metni alır ve "/draw" dizinine POST isteği atarak metni ve resim çizilen kısmı(eğer ki ilk defa yapılmış ise boş , yoksa daha önceki fotoğrafların eklendiği son halini ) isteği BODY'sine ekleyip istek atılır.

5- "/draw" dizinine POST isteği atıldığında, BODY'e konulan veriler alınır ve "main.py" içindeki "get_image_from_prompt" fonksiyonuna dinlenin metnin yazıya döndürülmüş hali verilir. Bu fonksiyon, metni alır ve OpenAI istemcisini kullanarak DALL-E modelini çağırıyoruz ve resim üretiyoruz. Üretilen resmi boyutlandırıyoruz ve döndürüyoruz.

6- Oluşturulan resim index.html'e döner.

7- "ciz" fonksiyonu, dönen resmi alır ve eğer ilk defa resim çiziliyor ise resmin konulacağı alan temizlenir ve fabric aracılığı ile resim çizilir. Eğer daha önce resim çizilmiş ise, yeni resim eski resmin üzerine çizilir.

## Kelimelerin Anlamı

- **Python**: Genel amaçlı, yüksek seviyeli bir programlama dilidir. Python, nesne yönelimli, yorumlamalı, modüler, birçok platformda çalışabilen ve açık kaynak kodlu bir programlama dilidir.

- **Pip**: Python paketlerini yönetmek için kullanılan bir paket yöneticisidir.

- **Terminal**: Bilgisayar kullanıcılarının komutları girip çalıştırabildiği bir arayüzdür.

- **HTTP**: İnternet üzerinden bilgi alışverişi yapmak için kullanılan bir protokoldür.

- **SUNUCU**: İstemcilere hizmet veren, istemcilerin isteklerini karşılayan bilgisayar.

- **GET**: Sunucudan veri almak için kullanılan bir HTTP metodu. Bu metodu kullanarak sunucudan veri alabiliriz.

- **POST**: Sunucuya veri göndermek için kullanılan bir HTTP metodu. Bu metodu kullanarak sunucuya veri gönderebiliriz.

- **SpeechSynthesisUtterance API**: Tarayıcıların konuşma sentezleme özelliğini kullanmamızı sağlayan bir API.

- **BODY**: HTTP isteğinin içeriğini temsil eden kısım.

- **Fonksiyon**: Programlama dillerinde, belirli bir işi yapmak için kullanılan, adı olan ve parametre alabilen kod bloklarıdır.

- **OpenAI**: Yapay zeka ve dil modelleri geliştiren bir şirket.

- **DALL-E**: OpenAI'nin geliştirdiği, metin verisi alıp resim üreten bir model.

- **Fabric**: Resim çizmek için kullanılan bir kütüphane.
