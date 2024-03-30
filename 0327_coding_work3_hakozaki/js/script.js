let num = 0;
//   i=1; 1回目から回す  i<=10; 10になるまで回す
//   ↓
for (i=1; i<=10; i++){
    num = num + i;
}
console.log(num);
// ↑
// num 0  + 1回目回す  = 1
// num 1  + 2回目回す  = 3
// num 2  + 3回目回す  = 6
// num 6  + 4回目回す  = 10
// num 10 + 5回目回す  = 15
// num 15 + 6回目回す  = 21
// num 21 + 7回目回す  = 28
// num 28 + 8回目回す  = 36
// num 36 + 9回目回す  = 45
// num 45 + 10回目回す = 55

if(num > 20){
    console.log("20以上");
}else{
    console.log("20以下");
}