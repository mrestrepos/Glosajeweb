
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
</head>
<body>

  <div id="result"></div>
  <button id="load-data">Get Data</button>
  
  <script>
    $(document).ready(function () {
      $("#load-data").click(function () {
        $.ajax({
          url: "data.json",
          dataType: "json",
          success: function (data) {
            let HTML = ""

            $.each(data, function(index, {name, email}) {
              HTML += `<p>${name}-${email}</p>`
            })

            $("#result").html(HTML)
          },

          error: function () {
            alert("An error occurred :(")
          }
        })
      })
    })
  </script>
</body>
</html>