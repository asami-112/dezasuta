var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#fff', '#fff', '#fff',]);//重ねる波線の色設定
    
	
		// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波線を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 0.8, 3, 0);
	drawWave(canvas, color[1], 0.5, 4, 0);
	drawWave(canvas, color[2], 0.3, 1.6, 0);
	drawWave(canvas, color[3], 0.2, 3, 100);
	drawWave(canvas, color[4], 0.5, 1.6, 250);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
	var context = canvas.contextCache;
    context.strokeStyle = color;//線の色
	context.lineWidth = 1;//線の幅
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.stroke(); //線
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

// // 動きのきっかけの起点となるアニメーションの名前を定義
// function moveAnimation(){

//     //読み込まれたらすぐにランダムに出現 
//     var randomElm = $(".about__img-left");//親要素取得
//     var randomElmChild = $(randomElm).children();//親の子要素を取得
//       if(!$(randomElm).hasClass("play")){ //親要素にクラス名playが付いてなければ処理をおこなう
//         randomAnime();  
//     }
    
//     function randomAnime(){
//         $(randomElm).addClass("play");//親要素にplayクラスを付与
//         var rnd = Math.floor(Math.random() * randomElmChild.length); //配列数からランダム数値を取得
//         var moveData = "fadeUp";//アニメーション名＝CSSのクラス名を指定
//         $(randomElmChild[rnd]).addClass(moveData);//アニメーションのクラスを追加
//         randomElmChild.splice(rnd,1);//アニメーション追加となった要素を配列から削除
//         if(randomElmChild.length == 0 ){//配列の残りがあるか確認
//         $(randomElm).removeClass("play");//なくなった場合は親要素のplayクラスを削除
//         }else{
//           setTimeout(function(){randomAnime();},500); //0.5秒間隔でアニメーションをスタートさせる。※ランダムのスピード調整はこの数字を変更させる  
//         }
        
//     }
    
//     //スクロールしたらランダムに出現 
//     var randomElm2 = $(".randomScroll");//親要素取得
//       var randomElm2Child = $(randomElm2).children(); //親の子要素を取得
//     randomScrollAnime();
//     function randomScrollAnime(){
//         var elemPos = $(".randomScroll").offset().top-50;//要素より、50px上まで来たら
//         var scroll = $(window).scrollTop();
//         var windowHeight = $(window).height();
//         if (scroll >= elemPos - windowHeight){
//           if(randomElm2Child.length >0 ){ //配列数以上であれば処理をおこなう
//             var rnd = Math.floor(Math.random() * randomElm2Child.length);//配列数から表示する数値をランダムで取得
//             var moveData ="fadeUp";//アニメーション名＝CSSのクラス名を指定
//             if(animeFlag){//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにする
//             animeFlag = false;//アニメーション処理が終わるまで一時的にfalseにする
//             $(randomElm2Child[rnd]).addClass(moveData);//アニメーションのクラスを追加
//             setTimeout(function(){
//                 animeFlag = true;//次の処理をおこなうためにtrueに変更
//                 randomScrollAnime();//自身の処理を繰り返す
//               },500); //0.5秒間隔で。※ランダムのスピード調整はこの数字を変更させる
//             randomElm2Child.splice(rnd,1);//アニメーション追加となった要素を配列から削除
//             }
//         }
        
//         }else{
//         animeFlag = true;
//         }
        
//     }
//     }
    
//     var animeFlag = true;//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにするための定義
    
//     // 画面をスクロールをしたら動かしたい場合の記述
//     $(window).scroll(function (){
//         moveAnimation();/* アニメーション用の関数を呼ぶ*/
//     });// ここまで画面をスクロールをしたら動かしたい場合の記述
    
//     // 画面が読み込まれたらすぐに動かしたい場合の記述
//     $(window).on('load', function(){
//         moveAnimation();/* アニメーション用の関数を呼ぶ*/
//     });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述