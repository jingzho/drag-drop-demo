var orginial = true;
var droppable = false;
var redCnt = 0;
var greenCnt = 0;
var blueCnt = 0;
var data;
var arr = [];

$(document).ready(function() {

  // textboxs on the right
  $(".textbox").draggable({
    helper : "clone",
    stop: function(event, ui) {
        original = false;
    },
    start: function(event, ui) {
        original = true;   
    }
  });

  // canvas
  $("#drop-area").droppable({
      drop: function(event, ui) {
          droppable = true;
          if(original){
              ui.helper.removeClass("ui-draggable-dragging");
              var newDiv = $(ui.helper).clone();
              newDiv.draggable({
                  stop: function(event, ui) {
                      if(!droppable)
                          ui.helper.remove();
                  },
                  start: function(event, ui) {
                      droppable = false;    
                  }
              });
              $(this).append(newDiv);
        }
          else
              $(this).append(ui.helper);
      }  
  });


  // save data
  $(".save-btn").on("click", function() {

    // clean canvas
    $(".textbox").hide();
    $("#drop-area").css("background-color", "#f0f0f0");

    // generate data
    $("ol").append("<p>You have saved:</p>");
    $("input").keyup(function(index) {
      var value = $(this).val();
      var color = $(this)[0]["className"]
      var key;
      if (color == "red") {
        redCnt += 1;
        key = color + redCnt
        data = "<p>" + key + ": " + value + "</p>";
        $("ol").append(data);
        arr.push({key, value});

      }
      if (color == "green") {
        greenCnt += 1;
        key = color + greenCnt
        data = "<p>" + key + ": " + value + "</p>";
        $("ol").append(data);
        arr.push({key, value});
      }
      if (color == "blue") {
        blueCnt += 1;
        key = color + blueCnt
        data = "<p>" + key + ": " + value + "</p>";
        $("ol").append(data);
        arr.push({key, value});
      }
    })
    .keyup();

    // initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDcGZxhaUWWtj4DZywPQLQ055ipmv4Tfjc",
      authDomain: "dew-challenge.firebaseapp.com",
      databaseURL: "https://dew-challenge.firebaseio.com",
      projectId: "dew-challenge",
      storageBucket: "dew-challenge.appspot.com",
      messagingSenderId: "612104278132",
      appId: "1:612104278132:web:5e5dea31c17165d806c121",
      measurementId: "G-W64QTEB1CV"
    });

    now = new Date;
    time = now.getFullYear() + (now.getMonth()+1) + (now.getDate()+1);
    firebase.database().ref(time).set(arr);

  });
});

// click the textbox to add an input field only once
$(document).on("click", ".textbox", function(){
  var color = $(this)[0].classList[1];
  var html = '<input type="text" name="input" class="' + color + '">';
  $(this).append(html);
  $(this).prop("disabled", true);
});


// $(document).ready(function () {

// });