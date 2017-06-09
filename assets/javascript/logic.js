var topics = ["doors","windows","sesame","eyes","hands","arms"];

$(document).ready(function(){



var makeButtons = function(){
  $("#buttons").empty();
for(var x=0;x<topics.length;x++){
  var btn = $("<button class='btn btn-default gifButton'>");

  btn.html(topics[x]);
  btn.attr("value", topics[x]);
  $("#buttons").append(btn);
}
};

$("#addBtn").on("click", function(){
  var nTopic = $("#nTopic").val();
  topics.push(nTopic);
  makeButtons();
});

$(document.body).on("click", ".gifButton", function(){
  getGif($(this).attr("value"));
});

$(document.body).on("click", ".nGif", function(){
  event.preventDefault();
  var  tGif = $(this).children("img");
  //console.log(tGif.attr("animate_url"));
  console.log(tGif.attr("animate"));

  if(tGif.attr("animated") == "false"){
    tGif.attr("src", tGif.attr("animate_url"));
    tGif.attr("animated", "true");
    console.log("Is Animated: " + tGif.attr("animated"));
  }
  else{
    tGif.attr("src", tGif.attr("still_url"));
    tGif.attr("animated", "false");
  }

});


var getGif = function(query){
  var limit = 10;
  var betaKey = "dc6zaTOxFJmzC";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=open+" + query + "&api_key=" + betaKey + "&limit=" + limit;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(result){

    $("#gDiv").empty();
    var gifs = result.data;

    for(var i = 0; i < gifs.length;i++){
      var nGif = $("<a class='thumbnail nGif'>");
      var img = $("<img class='thumbnail'>");
      console.log(gifs[i].images.original.url);
      img.attr("src", gifs[i].images.original_still.url);
      img.attr("still_url", gifs[i].images.original_still.url);
      img.attr("animate_url", gifs[i].images.original.url);
      img.attr("animate", "false");
      nGif.append(img);
      $("#gDiv").append(nGif);


    }


  });
};

makeButtons();
});
