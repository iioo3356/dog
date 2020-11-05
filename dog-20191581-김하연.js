var n;//숨어있는 강아지의 수(입력 받을 예정)(n<8)
var dogs = new Array();//강아지의 위치를 담고 있음
var t;//남은 시간(입력 받을 예정)(t<30)
var timer;//시간 표시 객체
var remainNum;//남은 개수 = dogNum - 찾은 개수
var failNum = 0;//틀린 횟수는 0에서 시작.
var started = false;
//게임 시작 여부.

$(document).ready(function(){
  //jquery 사용.webpage 로드가 완료되면 호출.
    dogNum = prompt("강아지 몇 마리가 숨어있나요?","");
    //프롬프트 창으로 숨은 강아지 개수를 입력 받음
    while (dogNum== null || dogNum=="" || isNaN(dogNum) || dogNum<1 || dogNum>=8){
      dogNum = prompt("강아지 몇 마리가 숨어있나요?","");
      //올바른 값이 아닐 경우(취소를 누르거나 공백이거나 숫자가 아니거나 1보다 작거나 8보다 같거나 큰 경우)
      //올바른 값을 입력할 때까지 계속해서 값을 받아들임. 소수일 경우 정수 부분만 받음.
    }
    $("#bgm").prop("muted", "false");
    n = parseInt(dogNum);
    remainNum = n;//remainNum의 초기값은 dogNum
    $("#remainNum").text(n);
    //remainNum의 id를 가진 요소 텍스트 변경.
});

function start(obj){
  //start 버튼을 눌렀을 때 실행
  //시간을 입력받고 숨은 강아지의 위치를 10초 동안 보여줌.
  //started 는 false이므로 img들을 눌러도 변동 없음.
  var effect = document.getElementById("effect");
  effect.src = "chimes.mp3";
  effect.play();
  // 게임 시작 효과음("chimes.mp3")재생
  obj.style.visibility = "hidden";
  // start 버튼 숨김.
  document.getElementById("big").innerHTML = " ";
  // 게임을 재시작한 경우를 위해서 게임 마지막에 출력되는
  // "GAME CLEAR"나 "GAME OVER"를 빈 문자열로 바꿈.
  remainNum = n;
  document.getElementById("remainNum").innerHTML = remainNum;
  // 찾은 개수를 초기화 후 출력.
  failNum = 0;
  document.getElementById("failNum").innerHTML = failNum;
  // 실패한 회수 초기화 후 출력.
  t = prompt("제한 시간을 설정하십시오.","");
  //강아지를 찾는 시간 t를 사용자에게서 받아들임.
  while (t== null || t=="" || isNaN(t) || t<1 || t>=30){
    t = prompt("제한 시간을 설정하십시오.","");
    //올바른 값이 아닐 경우(취소를 누르거나 공백이거나 숫자가 아니거나 1보다 작거나 30보다 같거나 큰 경우)
    //올바른 값을 입력할 때까지 계속해서 값을 받아들임. 소수일 경우 정수 부분만 받음.
  }
  t = parseInt(t);
  for (var i=0; i<n; i++){
    var random = Math.floor(Math.random()*24);
    //random은 0~23의 난수.
    // while(dogs.indexOf(random)!== -1){
    // 브라우저가 인터넷 익스플로러일 경우 위 주석 해제, 밑 와일문 주석 처리하고 돌리기
    while(dogs.includes(random)==true){
      var random = Math.floor(Math.random()*24);
      //생성된 random이 기존 array 안 값과 중복이면 계속해서 생성
      // 중복이 아닐 때에만 while 문 벗어남.
    }
    dogs[i] = random;
    //완전히 새로운 난수(0~23) 값만 들어감.
  }
  dogs.sort(function(a,b){
    return a-b;
  });//dogs를 오름차순으로 정렬.

  var imgs = document.getElementsByTagName("img");
  var j=0;//j는 dogs의 인덱스
  for (var i=0;i<imgs.length;i++){
    //i는 imgs의 인덱스
    if (j<n){
      //j가 dogs의 인덱스 범위 내일 때.
      if (i==dogs[j]){
        imgs[i].src = "img2.gif";
        imgs[i].alt = "dog";
        j++;
        //i가 랜덤 위치(dogs[j])라면
        //"img2.gif"로 보여주고 alt 값을 dog로 바꿈.
        //다음 위치의 랜덤 위치를 보기 위해 j++
      }
      else{
        imgs[i].src = "img1.gif";
        imgs[i].alt = "egg";
        //i가 랜덤 위치(dogs[j])가 아니라면
        //"img1.gif"로 보여주고 alt 값을 egg로 바꿈.
      }
    }
    else{
      imgs[i].src = "img1.gif";
      imgs[i].alt = "egg";
      //j의 인덱스 범위를 벗어나면(가장 마지막 랜덤 위치보다 크면)
      //"img1.gif"로 보여주고 alt 값을 egg로 바꿈.
    }
  }
  document.getElementById("timeText").innerHTML = "남은 시간 : <span id='time'>"+t+"</span>";
  //입력 받은 t값을 보여줌 + timeText를 "남은 시간 : "으로 바꿈
  document.getElementById("msg").innerHTML = "숨은 그림을 보세요";
  //msg 바꿈.

  setTimeout("hide()",10000);
  //10초 후에 hide() 호출.
}

function hide(){
  // 모든 img를 "img1.gif"로 변경
  started = true;
  //본격적인 게임 시작. img를 클릭하면 변동 시작.
  var imgs = document.getElementsByTagName("img");
  for (var i=0;i<imgs.length;i++){
    imgs[i].src = "img1.gif";
  }// 모든 img를 "img1.gif"로 변경
  document.getElementById("msg").innerHTML = "정답을 찾으세요";
  // msg 바꿈.
  timer = setInterval("showTime()",1000);
  // 1초마다 showTime() 호출.

}

function showTime(){
  t-=1;
  // t를 1씩 감소시켜 저장
  document.getElementById("time").innerHTML = t;
  // time 요소에 현재 t 값을 출력.
  if (t==5){
    document.getElementById("alarm").play();
    //남은 시간이 5초인 경우 alarm을 울림.
    //alarm은 loop 하므로 계속해서 울린다.
  }
  else if (t==0){
    fail();
    //남은 시간이 0이 되면 fail() 호출
  }
}


function eggClick(obj){
  //어떤 이미지이든지 클릭했을 때 실행
  var effect = document.getElementById("effect");
  if (started == true){
    if (obj.alt == "dog"){
      //클릭한 이미지의 alt가 "dog"일 때.(맞는 경우)
      remainNum -= 1;
      document.getElementById("remainNum").innerHTML = remainNum;
      //남은 개수에서 1을 빼고 그 값을 출력
      obj.src = "img2.gif";
      //해당 이미지를 강아지("img2.gif")로 출력
      obj.alt = "selected";
      //찾은 강아지는 다시 눌러도 remainNum에 변동이 없도록
      //selected로 alt를 바꿔줌.
      if (remainNum == 0){
        success();
        //remainNum이 0이 되면 success() 호출
      }
      else{
        effect.src = "tada.mp3";
        effect.load();
        effect.play();
        //그렇지 않으면 축하음("tada.mp3") 울림.
      }

    }
    else if (obj.alt == "egg"){
      //클릭한 이미지의 alt가 "egg"일 때.(틀린 경우)
      failNum +=1;
      document.getElementById("failNum").innerHTML = failNum;
      //틀린 횟수에 1을 더하고 그 값을 출력.
      if (failNum==5){
        fail();
        //failNum이 5가 되면 fail()호출.
      }
      else {
        effect.src = "bi.mp3";
        effect.load();
        effect.play();
        //그렇지 않으면 경고음("bi.mp3")을 울림.
      }
    }
  }
}

function fail(){ //실패
  // 시간 내에 강아지를 다 못 찾았을 때, failNum이 5가 됐을 때.
  clearInterval(timer);
  //timer를 멈춤(현재 남은 시간 고정)
  document.getElementById("alarm").pause();
  //alarm이 울리고 있다면 꺼버림.
  started = false;
  //게임이 끝남. img를 클릭해도 변동 없음.
  var effect = document.getElementById("effect");
  effect.src = "bad.mp3";
  effect.play();
  //effect 오디오의 src를 "bad.mp3"로 바꾸고 최종 실패음 울림.
  document.getElementById("msg").innerHTML="실패";
  //msg 값 바꾸기.
  document.getElementById("start").style.visibility = "visible";
  //게임 시작 메뉴 다시 보이게 함.
  var imgs = document.getElementsByTagName("img");
  var j=0;
  for (var i=0;i<imgs.length;i++){
    if (j<n){
      if (i==dogs[j]){
        imgs[i].src = "img2.gif";
        j++;
      }
    }
  }//찾지 못한 강아지까지 전체 출력
  document.getElementById("big").innerHTML = "GAME OVER";
  //"GAME OVER"를 크게 보여줌.
}

function success(){ //승리
  // 시간 내에 숨은 강아지를 모두 찾아냈을 때(remainNum==0, t>0)
  clearInterval(timer);
  //timer를 멈춤(남은 시간 고정)
  started == false;
  //게임이 끝남. img를 클릭해도 변동 없음.

  var effect = document.getElementById("effect");
  effect.src = "ending.mp3";
  effect.play();
  //승리했으므로 빵빠레("ending.mp3")를 울림.

  document.getElementById("msg").innerHTML="승리";
  //msg 값 바꾸기.
  document.getElementById("start").style.visibility = "visible";
  //게임 시작 메뉴 다시 보이게 함.
  document.getElementById("big").innerHTML = "GAME CLEAR";
  //"GAME OVER"를 크게 보여줌.
}
