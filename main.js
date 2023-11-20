//!htmlden gelenler
const placeholder = document.querySelector(".placeholder");
const editableInput = document.querySelector(".editable");
const tweetButton = document.querySelector(".button");
const counter = document.querySelector(".counter");
const readOnly = document.querySelector(".readonly");
const privacy = document.querySelector(".privacy");
const privacySpan = document.querySelector("#privacy");

//!Olay izleyicisi
/* tıklama olaylarını dinliyoruz */

privacy.addEventListener("click", () => {
  privacySpan.innerText = "Takip Ettiğin Hesaplar";
});

privacy.addEventListener("dblclick", () => {
  privacySpan.innerText = "Herkes Cevaplayabilir";
});

//* input alanına tıklandığında placeholder renk değiştirir
editableInput.addEventListener("click", () => {
  placeholder.style.color = "#ccc";
});

//* input harici bir yere tıklandığında renk eski haline döner
editableInput.onblur = () => {
  placeholder.style.color = "#333";
};

//* klavyeye basılma anını dinliyor basıldığında placeholder kalksın
editableInput.onkeypress = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

//* elini klavyeden kaldırdığın anı dinliyor kaldırınca placeholder kalksın
editableInput.onkeyup = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

//* inputtakini sildiğimde placeholderin geri gelmesi
//* yazılan tweetin karekter kontrolü
//** inputta yazdığım karekterler toplam karekter limitimi geçerse counteri kırmızı yap
const inputValidate = (tweet) => {
  /* dışarıdan gelen input verisinin uzunluğu */
  const tweetLength = tweet.length;

  const tweetLimit = 10;
  /* Kalan karekter limiti */
  const currentlimit = tweetLimit - tweetLength;

  /* karekter var mı ? */
  if (tweetLength <= 0) {
    //karekter yoksa sorgusu
    //placeholder görünür hale gelir.
    placeholder.style.display = "block";
    //tweet butonunun active özelliğini silme
    tweetButton.classList.remove("active");
    /* sayacın görünürlüğünü kaldırma sayacı yoketme */
    counter.style.display = "none";
  } else {
    //Karekter varsa durumu else
    //tweet butonunu active hale getirme
    tweetButton.classList.add("active");
    //sayacı görünür yapma
    counter.style.display = "block";
    //sayacın değerine hesaplanan değeri atama
    counter.innerText = currentlimit;
  }
  let newTweet;
  //Karekter sınırı aşıldı mı ?
  if (tweetLength > tweetLimit) {
    //karekter sınırı aşıldığı durum
    //substr ile başlangıç(tweet limiti) ve
    //bitiş(girilen toplam karekter sayısı) noktası belirleyerek taşan karekteri bulma
    let overTweet = tweet.substr(tweetLimit, tweetLength);
    //taşan karekterlerin arka planını kırmızı yapmak için span oluşturma
    let overTweetElement = `<span class="overTweet">${overTweet}</span>`;

    //inputtan gelen karekterleri ve taşan karekterleri birleştirip yeni bir tweet oluşturma
    newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
    //yeni tweet readonlyde göstereceğim için zIndex ile görünür yaptık
    readOnly.style.zIndex = "1";
    //sayacın sınırı aşan karekterlerini kırmızı gösterme
    counter.style.color = "red";
    // sınır aşıldıysa butonun active özelliğini silme
    tweetButton.classList.remove("active");
  } else {
    //* karekter sınırının aşılmadığı durum
    // sayacın kendi normal değeri
    counter.style.color = "#333";
    //taşma işlemi oluştuğunda görünür yapılan yapıyı görünmez yapma
    readOnly.style.zIndex = "-5";
  }
  //oluşan yeni tweeti göstermek için html tarafına gönderme
  readOnly.innerHTML = newTweet;
};
