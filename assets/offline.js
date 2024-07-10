<link href="https://daihachi10.github.io/assets/style.css?v=3" rel="stylesheet">

<style>
@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');

.mochiy-pop-one-regular {
  font-family: "Mochiy Pop One", sans-serif;
  font-weight: 400;
  font-style: normal;
}
  
#notification {
    font-family: "Mochiy Pop One";
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 600px;
    height: 150px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 15px; /* 角を丸くする */
    z-index: 900;
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 0.5s ease, transform 0.5s ease; /* フェードインとスライドインのトランジション */
    text-align: center; /* 中央揃え */
}
/* バツボタンのスタイル */
.popup-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
}

.cancel-btn {
    font-family: "FortniteSmall", "FortniteJP", "Mochiy Pop One", "ＭＳ Ｐゴシック", "UD デジタル 教科書体 N-R", "Meiryo UI", "MS UI Gothic", sans-serif;
    background-color: #f5f5f5;
    color: #333;
    font-size: 150%;
    border-radius: 100px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s ease-in-out;
    margin: 20px;
}

.site-open-btn {
    font-family: "FortniteSmall", "FortniteJP", "Mochiy Pop One", "ＭＳ Ｐゴシック", "UD デジタル 教科書体 N-R", "Meiryo UI", "MS UI Gothic", sans-serif;
    background-color: #333;
    color: #fff;
    font-size: 150%;
    border-radius: 100px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s ease-in-out;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log("pwa");
    } else {
        console.log("not pwa");
        showNotification('notification');
    }

    if (!navigator.onLine) {
        console.log("off");
        showNotification('off');
    } else {
        console.log("on");
    }

    function showNotification(id) {
        setTimeout(function() {
            var notification = document.getElementById(id);
            notification.style.display = 'block';
            setTimeout(function() {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10); // トランジションを有効にするための短い遅延
        }, 1000);
    }

    window.closeNotification = function() {
        closePopup('notification');
    }

    window.closeoff = function() {
        closePopup('off');
    }

    function closePopup(id) {
        var element = document.getElementById(id);
        element.style.opacity = '0'; /* フェードアウト開始 */
        element.style.transform = 'translateX(100px)'; /* スライドアウト開始 */
        setTimeout(function() {
            element.style.display = 'none';
        }, 500); /* フェードアウトの時間と一致させる */
    }
});
</script>

<div id="notification">
    <span class="popup-close-btn" onclick="closeNotification()">×</span>
    <p>アプリをインストールしてください</p>
    <button class="cancel-btn" onclick="closeNotification()">キャンセル</button>
    <button class="site-open-btn" onclick="location.href='https://daihachi10.github.io/assets/install/'">windows版をインストール</button>
</div>

<div id="off">
    <span class="popup-close-btn" onclick="closeoff()">×</span>
    <p>現在オフラインです。</p>
</div>
