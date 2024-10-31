let odai = [
    "グアムとサイパンは近い",
    "卓球で脱臼",
    "有給休暇を使う",
    "シェフの気まぐれサラダ",
    "キャラメルポップコーン",
    // "ウサギをモフモフする",
    // "普段着はパジャマです",
    // "開いた口が塞がらない",
    // "窓の外は冷たい雨",
    // "アメリカンショートヘアー",
    // "ここで会ったが百年目",
];

let nihongo = [
    "guamutosaipanhatikai",
    "takkyuudedakkyuu",
    "yuukyuukyuukawotukau",
    "shehunokimaguresarada",
    "kyaramerupoppuko-n",
    // "usagiwomohumohusuru",
    // "hudangihapajamadesu",
    // "aitakutigahusagaranai",
    // "madonosotohatumetaiame",
    // "amerikansho-tohea-",
    // "kokodeattagahyakunenme",
];

let keycodes = [
    71, 85, 65, 77, 85, 84, 79, 83, 65, 73, 80, 65, 78, 72, 65, 84, 73, 75, 65, 73,
    84, 65, 75, 75, 89, 85, 85, 68, 69, 75, 75, 89, 85, 85,
    89, 85, 85, 75, 89, 85, 85, 75, 89, 85, 85, 75, 65, 87, 79, 84, 85, 75, 65, 85,
    83, 72, 69, 72, 85, 78, 79, 75, 73, 77, 65, 71, 85, 82, 69, 83, 65, 82, 65, 68, 65,
    75, 89, 65, 82, 65, 77, 69, 82, 85, 80, 79, 80, 80, 85, 75, 79, 189, 78,
]

let imanoyatu = 0;

let i = 0
function setup() {
    let canvasContainer = document.getElementById("p5-canvas-container");
    let canvas = createCanvas(400, 300);
    canvas.parent(canvasContainer); // コンテナにキャンバスを配置
    typing();
}

function draw() {
    // background(255);
    if (keyIsDown(keycodes[imanoyatu])) {
        i++
        if (i == nihongo[imanoyatu].length) {
            i == 0
            typing();
        }
    }
    console.log(i)

    // for (let i = 0; i < nihongo.length;) {
    // }
}

function typing() {
    imanoyatu = Math.floor(random(0, odai.length - 1));
    text(odai[imanoyatu], 10, 10);
    text(nihongo[imanoyatu], 10, 20);
}
