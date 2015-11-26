var pnw = 25*60;
var pnb = 5*60;
var flag = "work";
var audio = new Audio('http://res.cloudinary.com/di4cne8qn/video/upload/v1448470498/Metal_Gong-Dianakc-109711828_my6p9f.mp3');


$(document).ready(function(){
  $("#bbp").click(function(){
    var newValueBP = parseInt($("#setbreak").val()) + 1;
    $("#setbreak").val(newValueBP);
    pnb = parseInt($("#setbreak").val())*60;
   });
  $("#bbm").click(function(){
    var newValueBM = parseInt($("#setbreak").val()) - 1;
    $("#setbreak").val(newValueBM);
    pnb = parseInt($("#setbreak").val())*60;
   });
  $("#bwp").click(function(){
    var newValueWP = parseInt($("#setwork").val()) + 1;
    $("#setwork").val(newValueWP);
    $("#time").html($("#setwork").val()+":00");
    pnw = parseInt($("#setwork").val())*60;
   });
  $("#bwm").click(function(){
    var newValueWM = parseInt($("#setwork").val()) - 1;
    $("#setwork").val(newValueWM);
    $("#time").html($("#setwork").val()+":00");
    pnw = parseInt($("#setwork").val())*60;
   });
  $("#setwork").on("input",function(){
    $("#time").html($("#setwork").val()+":00");
    pnw = parseInt($("#setwork").val())*60;
  });
  $("#time").html($("#setwork").val()+":00");
  $("#what").html(flag);
  $("#clock").one("click", handler1);
});


function myTimer(){  
  if(pnw > 0){
    pnw=pnw-1;
    var rm = Math.floor(pnw/60);
    var rs = pnw-(rm*60);
    $("#time").html(rm+":"+("0" + rs).slice(-2));
  }else if(pnw === 0){
    if(pnb === parseInt($("#setbreak").val())*60){
      audio.play();
    };
    flag="break !";
    $("#what").html(flag);
    $("#clock").removeClass("clock-on").addClass("clock-on-break");
    if(pnb>0){
      pnb=pnb-1;
      var rm = Math.floor(pnb/60);
      var rs = pnb-(rm*60);
      $("#time").html(rm+":"+("0" + rs).slice(-2));
    }else if(pnb===0){
      audio.play();
      pnw = parseInt($("#setwork").val())*60;
      $("#time").html($("#setwork").val()+":00");
      pnb = parseInt($("#setbreak").val())*60;
      flag="work !";
      $("#what").html(flag);
      $("#clock").removeClass("clock-on-break").addClass("clock-on");
    }
  }
}

function handler1() {
    $(this).addClass("clock-on");
    $("#bbp").prop('disabled', true);
    $("#bbm").prop('disabled', true);
    $("#bwp").prop('disabled', true);
    $("#bwm").prop('disabled', true);
    timer_id = setInterval(myTimer,1000);
    $(this).one("click", handler2);
}

function handler2() {
    $(this).removeClass("clock-on");
    $("#bbp").prop('disabled', false);
    $("#bbm").prop('disabled', false);
    $("#bwp").prop('disabled', false);
    $("#bwm").prop('disabled', false);
    clearInterval(timer_id);
    $(this).one("click", handler1);
}