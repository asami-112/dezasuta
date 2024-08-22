// ハンバーガーメニュー
$(function(){
    $(".hamburger").on("click", function(){   //ハンバーガーをクリックしたら、
        $(".hamburger").toggleClass("open");  //ハンバーガーメニューが開く
        $(".header__nav-sp").fadeToggle();    //sp版のnavを表示させる。
    });
});


//テキストのカウントアップの設定
var bar = new ProgressBar.Line(splash_text, {//id名を指定
	strokeWidth: 0,//進捗ゲージの太さ
	duration: 1000,//時間指定(1000＝1秒)
	trailWidth: 0,//線の太さ
	text: {//テキストの形状を直接指定	
		style: {//天地中央に配置
			position:'absolute',
			left:'50%',
			top:'50%',
			padding:'0',
			margin:'0',
			transform:'translate(-50%,-50%)',
			'font-size':'1.2rem',
			color:'#f694ae',
		},
		autoStyleContainer: false //自動付与のスタイルを切る
	},
	step: function(state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
	}
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
	$("#splash").delay(500).fadeOut(800);//アニメーションが終わったら#splashエリアをフェードアウト
});  

var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報


/**
 * 初期化関数
 * 変数を初期化し、アニメーションを開始します。
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];

    // クラス 'waveCanvas' を持つ全てのキャンバスを選択
    document.querySelectorAll('.waveCanvas').forEach((canvas, index) => {
        canvasList.push(canvas);
        colorList.push(['#fff', '#fff', '#fff']); // 各波線の色設定
        canvas.width = document.documentElement.clientWidth; // Canvasの幅をウィンドウ幅に設定
        canvas.height = 200; // 波の高さを設定
        canvas.contextCache = canvas.getContext("2d");
    });


    // アニメーションを開始
    update();
}


function update() {
    canvasList.forEach((canvas, index) => {
        // 各キャンバスの描画
        draw(canvas, colorList[index]);
    });
    // 共通の描画情報の更新
    info.seconds += 0.014;
    info.t = info.seconds * Math.PI;
    // 再帰的に自身を呼び出す
    setTimeout(update, 35);
}


/**
 * アニメーション描画関数
 * 一フレームのアニメーションを描画し、20ms待機してから再度呼び出します。
 */
function draw(canvas, color) {
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);


    // 波線を描画
    drawWave(canvas, color[0], 0.8, 3, 0);
    drawWave(canvas, color[1], 0.5, 4, 0);
    drawWave(canvas, color[2], 0.3, 1.6, 0);
    drawWave(canvas, color[3], 0.2, 3, 100);
    drawWave(canvas, color[4], 0.5, 1.6, 250);
}


/**
 * 波を描画する関数
 *
 * @param {HTMLCanvasElement} canvas - キャンバス要素
 * @param {string} color - 波の色
 * @param {number} alpha - 波の透明度
 * @param {number} zoom - 波の幅のズーム
 * @param {number} delay - 波の開始位置の遅れ
 */
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.strokeStyle = color; // 線の色を設定
    context.lineWidth = 1; // 線の幅を設定
    context.globalAlpha = alpha;
    context.beginPath(); // パスの開始
    drawSine(canvas, info.t / 2, zoom, delay);
    context.stroke(); // 線を描画
}


/**
 * サイン波を描画する関数
 *
 * @param {HTMLCanvasElement} canvas - キャンバス要素
 * @param {number} t - 時間変数
 * @param {number} zoom - 波の幅のズーム
 * @param {number} delay - 波の開始位置の遅れ
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height / 2);
    var yAxis = 0;
    var context = canvas.contextCache;
    var x = t; // 時間をx位置とする
    var y = Math.sin(x) / zoom;
    context.moveTo(yAxis, unit * y + xAxis); // スタート位置にパスを置く


    // セグメントを描画するループ
    for (var i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
    }
}

//fv_アニメーション
// blurTriggerにblurというクラス名を付ける定義
function BlurTextAnimeControl() {
	$('.blurTrigger').each(function(){ //blurTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('blur');// 画面内に入ったらblurというクラス名を追記
		}else{
		$(this).removeClass('blur');// 画面外に出たらblurというクラス名を外す
		}
		});
}
// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	BlurTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


// eachTextAnimeにappeartextというクラス名を付ける定義
function EachTextAnimeControl() {
    $('.eachTextAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
        $(this).addClass("appeartext");
        } else {
        $(this).removeClass("appeartext");
        }
    });
    }
  // 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    //spanタグを追加する
    var element = $(".eachTextAnime");
    element.each(function () {
        var text = $(this).text();
        var textbox = "";
        text.split('').forEach(function (t, i) {
            if (t !== " ") {
            if (i < 10) {
            textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
            } else {
            var n = i / 10;
            textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
            }
        } else {
            textbox += t;
        }
        });
        $(this).html(textbox);
    });

    EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
    });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


// 動きのきっかけの起点となるアニメーションの名前を定義
function moveAnimation(){
    //スクロールしたらランダムに出現	
        var randomElm2 = $(".randomScroll");//親要素取得
        var randomElm2Child = $(randomElm2).children();	//親の子要素を取得
        randomScrollAnime();
        function randomScrollAnime(){
            var elemPos = $(".randomScroll").offset().top-50;//要素より、50px上まで来たら
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight){
                if(randomElm2Child.length >0 ){ //配列数以上であれば処理をおこなう
                    var rnd = Math.floor(Math.random() * randomElm2Child.length);//配列数から表示する数値をランダムで取得
                    var moveData ="fadeUp";//アニメーション名＝CSSのクラス名を指定
                    if(animeFlag){//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにする
                        animeFlag = false;//アニメーション処理が終わるまで一時的にfalseにする
                        $(randomElm2Child[rnd]).addClass(moveData);//アニメーションのクラスを追加
                        setTimeout(function(){
                            animeFlag = true;//次の処理をおこなうためにtrueに変更
                            randomScrollAnime();//自身の処理を繰り返す
                        },500);	//0.5秒間隔で。※ランダムのスピード調整はこの数字を変更させる
                        randomElm2Child.splice(rnd,1);//アニメーション追加となった要素を配列から削除
                    }
                }
            }else{
                animeFlag = true;
            }
        }
    }
        var animeFlag = true;//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにするための定義
    // 画面をスクロールをしたら動かしたい場合の記述
        $(window).scroll(function(){
            moveAnimation();/* アニメーション用の関数を呼ぶ*/
        });// ここまで画面をスクロールをしたら動かしたい場合の記述

// アニメーションを初期化
init();


function slideAnime(){
	//====左に動くアニメーションここから===
		$('.leftAnime').each(function(){ 
			var elemPos = $(this).offset().top-50;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight){
				//左から右へ表示するクラスを付与
				//テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
				$(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
				$(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
			}else{
				//左から右へ表示するクラスを取り除く
				$(this).removeClass("slideAnimeLeftRight");
				$(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");
				
			}
		});
		
	}
	
	// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
		slideAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

	// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
		slideAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

