numQuestions = 10;
mainText = ""
curbg = 0
liked = []
disliked = []
cnt = 0
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
Array.prototype.shuffle = function() {
  var i = this.length,
    j, temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}
$(document).ready(function() {
  $(".userTextArea").hide()
})
panel3transitionProtocol = function() {
  $(".questionArea").fadeTo(1000, 0)
  setTimeout(function() {
    $(".userText").animate({
      left: "50%",
      width: "50%"
    }, 500)
  }, 750)
  setTimeout(function() {
    $(".userTextArea").show();
    $(".userTextArea").html("&nbsp;&nbsp;&nbsp;&nbsp;")
    $(".userTextArea").attr("value", mainText)
    $(".userPad").remove();
    $("#agr1").fadeTo(500, 1, function() {
      $("#agr2").fadeTo(500, 1, function() {
        $("#agr3").fadeTo(500, 1, function() {
          $("#agr3").click(function() {
            mainText = $(".userTextArea").val();
            analyzeData();
            goToPanel3()
          })
        })
      })
    })
  }, 1250)
}
displayResults = function(data) {
  //chart
  console.log(data)
  var ctx = document.getElementById('valueChart').getContext('2d');
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["Sentiment", "Conservative", "Green", "Liberal", "Libertarian",
        "Agreeableness", "Conscientiousness", "Extraversion", "Openness", "Anger", "Fear", "Joy", "Sadness", "Surprise"
      ],
      datasets: [{
        data: data["userAnalysis"],
        backgroundColor: "rgba(0, 0, 128, 1)"
      }]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    }
  });

  //push articles properly
  liked = data["goodArticles"]
  disliked = data["badArticles"]
  articles = liked;

  populateWithArticles($("#toLike"), liked, 10)
  populateWithArticles($("#toDislike"), disliked, 10)

  console.log(liked)
  console.log(disliked)


  return;
  for(i = 0; i < articles.length; i++){
    $(".articlePanel").append(makeArticle(articles[i]["url"], articles[i]["text"], i + "article"));
    $("#" + i + "article").click(function(){
      openInNewTab($(this).attr("href"))
    })
  }
}
populateWithArticles = function(div, art, num){
  art = art.shuffle();
  div.empty();
  for(i = 0; i < num; i++){
    div.append(makeArticle(art[i]["url"], art[i]["text"], cnt + "article"));
    $("#" + cnt + "article").click(function(){
      openInNewTab($(this).attr("href"))
    })
    cnt++;
  }
}
makeArticle = function(url, body, id){
  body = body.substring(0, 150) + "..."
  actualurl = url
  try{
    url = toTitleCase(url.split("/")[7].split(".")[0].replaceAll("-", " "))
  } catch (err) {
    url = "No Title Detected"
  }
  return "<div class = 'article' href = "+ actualurl + "id = '"+id+"'>" +
    "<h4>" + url + "</h4>" +
    "<p>"+ body +"</p>" +
  "</div>"
}
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
analyzeData = function() {
  $.post("/php/compareAndReturn.php", {
    toAnalyze: mainText
  }, function(data, status) {
    console.log(data)
    data = JSON.parse(data);
    (JSON.stringify(data));

    setTimeout(function(){
      displayResults(data);
      goToPanel4();
    }, 3000);
  })
}
goToPanel3 = function() {
  $("#panel1").animate({
    top: "-200%"
  }, 500)
  $("#panel2").animate({
    top: "-100%"
  }, 500)
  $("#panel3").animate({
    top: "0%"
  }, 500)
  $("#panel4").animate({
    top: "100%"
  }, 500, function(){kills2=true;console.log(kills2)});
}
goToPanel2 = function() {
  $("#panel1").animate({
    top: "-100%"
  }, 500)
  $("#panel2").animate({
    top: "0%"
  }, 500)
  $("#panel3").animate({
    top: "100%"
  }, 500)
  $("#panel4").animate({
    top: "200%"
  }, 500, function(){kills1=true;console.log(kills1)})

  //load all the questions
  questions.shuffle()
  loadQuestion(0)
}
goToPanel4 = function() {
  $("#panel1").animate({
    top: "-300%"
  }, 500)
  $("#panel2").animate({
    top: "-200%"
  }, 500)
  $("#panel3").animate({
    top: "-100%"
  }, 500)
  $("#panel4").animate({
    top: "0%"
  }, 500, function(){curbg=3})
}
loadQuestion = function(id) {
  if (id == numQuestions) {
    panel3transitionProtocol();
    return;
  }
  $("#questionSubmit").show()
  curQuestion = questions[id]
  //("next question with" + id)
  //load into form
  $("#questionBody").text(curQuestion["question"])
  $("#questionBody").css({
    opacity: 0
  })
  $("#questionBody").fadeTo(1000, 1)

  $("#op1").text(" " + curQuestion["options"][0])
  $("#op2").text(" " + curQuestion["options"][1])
  $("#op3").text(" " + curQuestion["options"][2])
  $("#op4").text(" " + curQuestion["options"][3])

  $("#op1").css({
    opacity: 0
  })
  $("#op2").css({
    opacity: 0
  })
  $("#op3").css({
    opacity: 0
  })
  $("#op4").css({
    opacity: 0
  })
  $(".left-column").css({
    opactiy: 0
  })
  $(".right-column").css({
    opactiy: 0
  })


  $("#op1").fadeTo(1000, 1)
  $("#op2").fadeTo(1000, 1)
  $("#op3").fadeTo(1000, 1)
  $("#op4").fadeTo(1000, 1)
  $(".left-column").fadeTo(1000, 1)
  $(".right-column").fadeTo(1000, 1)


  $("#questionSubmit").off("click")
  $("#questionSubmit").click(function() {
    $("#questionSubmit").off("click") //important
    chosenOption = $('input[name=op]:checked', '#mcForm').val()
    toAdd = " " + curQuestion["effects"][chosenOption][(Math.floor(Math.random() * curQuestion["effects"][chosenOption].length))]
    mainText += " " + toAdd
    constructedHTML = "<span style = 'opacity: 0'id = 'questionText" + id + "'>" + toAdd + "</span>"
    $(".userPad").append(constructedHTML)
    $("#questionText" + id).fadeTo(1000, 1, function() {
      loadQuestion(id + 1)
    })
  })

}
