$(document).ready(function() {
  // reset code 
  $("#clear").click(function() {
    $("#textarea").val("");
    $("#box").toggle();
  });


//trigger search
  $("#textarea").keypress(function(e) {
    var searchval = $("#textarea").val();

    if (e.which == "13") {
      $("#box").show();

      $.ajax({
        url:
          "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrsearch=" +
            searchval +
            "&gsrnamespace=0&gsrwhat=text",
        dataType: "jsonp",
        success: function(data) {
          var html = "";
          var arr = [];
          for (var x in data.query.pages) {
            arr.push(data.query.pages[x]);
          }

          arr.forEach(function(val) {
            var keys = Object.keys(val);

            html +=
              "<a target='_blank' href='https://en.wikipedia.org/wiki/" +
              val[keys[2]] +
              "'><p>" +
              val[keys[2]] +
              "<br>" +
              val[keys[4]] +
              "</p></a>";
          });

          $("#box").html(html);
        }
        ////////////////////////
      });
    }
  });
});

