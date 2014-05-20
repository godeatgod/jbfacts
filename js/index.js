var facts;

var images = [
  "img/image0.jpg"
];


var imageWidth = 620;
var imageHeight = 350;

Ext = {
  define:function(bla, bla2) {
    facts = bla2.data;
    

    $(window).ready(function() {
      
      $(".next").on('click', generateFact);
      $(".share").on('click', function() {
	renderImage(imageWidth, imageHeight);
      });
      
      generateFact();
    });
  }
};

/*
 Added jquery
 

function $(select) {
  return document.querySelector(select);
}
*/

function generateFact() {
  var fact = facts[Math.floor(Math.random() * facts.length)];
  var parts = disect(fact.fact);
  console.log("Hello", fact);

  
  $(".fact").css("backgroundImage", 'url(' + images[0] + ')');

  $(".setup").text(parts.setup);
  $(".punch").text(parts.punch);
}

function disect(text) {
  text = text.trim();

  // Discard trailing "."
  if (text.lastIndexOf(".") == text.length -1) {
    text = text.slice(0, -1);
  }

  var lastDot = Math.max(text.lastIndexOf("."), text.lastIndexOf("?"));

  // Both . and ? are missing

  if (lastDot < 0) {
    lastDot = text.lastIndexOf(",");
  }

  
  if (lastDot < 0) {
    lastDot = text.lastIndexOf(" ");
  }

  return {setup:text.slice(0, lastDot + 1), punch:text.slice(lastDot + 1)};
};



function renderImage(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  var img = new Image();
  $("#hidden").html("");
  $("#hidden").append($(".fact").clone());

  var svg = new Blob([$("#hidden").html()], {type: "image/svg+xml;charset=utf-8"});
  var DOMURL = self.URL || self.webkitURL || self;
  var url = DOMURL.createObjectURL(svg);
  console.log("Creating image " + url);
  img.onload = function() {
    console.log("Drawing image");

    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
    postPhotoToFacebook(canvas.toDataURL("image/png"));
  };

  img.onerror= function(e) {
    debugger;
    console.log("Error " + e);
  };
  img.src = url;

}

