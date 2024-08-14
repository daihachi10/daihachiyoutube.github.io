let currentEngine = "google";

function search() {
    const query = document.getElementById("search-box").value;
    let url;

    if (currentEngine === "google") {
        url = "https://www.google.com/search?q=" + encodeURIComponent(query);
    } else if (currentEngine === "youtube") {
        url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
    }

    window.location.href = url;
    toggleSearchEngine(); // 検索実行後に検索エンジンを切り替える
}

// エンターキーで検索を実行する
document.getElementById("search-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

// ページ読み込み時に検索窓にフォーカスを当てる
window.onload = function() {
    document.getElementById("search-box").focus();
};

function toggleSearchEngine() {
    if (currentEngine === "google") {
        currentEngine = "youtube";
        document.getElementById("search-logo").src = "https://daihachi10.github.io/search/img/youtube-logo.png";
    } else {
        currentEngine = "google";
        document.getElementById("search-logo").src = "https://daihachi10.github.io/search/img/google-logo.png";
    }
}
