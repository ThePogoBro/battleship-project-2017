$(document).ready(function(){
  
var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]; // grid letter coordinates

for(var i = 1; i <= 12; i++) {
  
  for (var j = 0; j < letterArray.length; j++){
    
    //console.log(i+""+letterArray[j]);
    
    var grid =
    
    "<div id ='" + (i+""+letterArray[j]) + "' class='col-md-1'>" +
      "<button onclick='validate(" + [i] + ", &quot;" + letterArray[j] + "&quot;);'>"+
      (i+""+letterArray[j]) +
      "</button>" +
    "</div>";
    
    $("#battle_stage").append(grid);
  }
} // creates the grid


$.get("battle.json", function(data, status){
  //console.log(data);
  shipPositions = data.positions;
}, "json"); // gets json file

});

var shipPositions = {};

var miss = 0; // number of misses

var hit = 0; // number of hits

function validate(numberParams, letterParams){
  var ship = shipPositions.indexOf((numberParams+""+letterParams));// coordinate finder
  
  $("#" + (numberParams+""+letterParams)).css("padding", "3px", "8px"); // 2. adds padding so that cell size remains consistent,
  
    if (ship > -1) {
      $("#" + (numberParams+""+letterParams)).html("HIT!"); // 1. removes button to prevent cheating,
      $("#" + (numberParams+""+letterParams)).css("color", "blue"); // 2. adds a contrasting color to text,
      $("#" + (numberParams+""+letterParams)).css("background-color", "red"); // 3. cell color changes to red.
      hit ++; // number of hits increment
    } else {
        $("#" + (numberParams+""+letterParams)).html("MISS!"); // 1. removes button to prevent cheating,
        $("#" + (numberParams+""+letterParams)).css("color", "red"); // 2. adds a contrasting color to text,
        $("#" + (numberParams+""+letterParams)).css("background-color", "blue"); // 3. cell color changes to blue.
        miss ++; // number of misses increment
      }
    
   
    if (miss == 12) {
      var gameLoseText = "Congratulations, you've lost the game; Hitting " + hit + " ship section" + sCheck(hit) + ", now get back to work";
      $(".container").html(gameLoseText);
    } // when miss var increments to condition number, div is overwritten with the gameLoseText var.
    
    if (hit == shipPositions.length) {
      var gameWinText = "Wow you're a winner, proud of yourself? You missed " + miss + " time" + sCheck(miss);
      $(".container").html(gameWinText);
    } // when hit var increments to the length of the provided json, div is overwritten with the gameWinText var.
  
    
    $("#hit_var").html(hit); // updates hitcounter
  
    $("#miss_var").html(miss); // updates misscounter
  

} // validates coordinate against provided json,
    //changes color of the cell clicked and increments the "hit" or "miss" var,
    //checks each time run if the "hit" or "miss" var meets the win or lose conditions,
    //then either ends or continues game.
function sCheck(numberParams) {
    if (numberParams == 1) {
      return "";
    } // if the numberParam is equal to 1, function returns an empty string.
      else {
        return "s";
      } // if the numberParam is any number other than 1, function returns an "s" as a string.
  }
// to do:
  // multiplayer?
  // animations
  // graphics
  // sound effect (make them real cheesy)
  // other very ambitious thing/feature