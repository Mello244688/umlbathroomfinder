$(function () {
    AddEventListeners();
    SetUpStarRatings();
    setupValidation();
    setupPage();

});

function AddEventListeners() {
   
   $('#review_form').submit(function(e) {
      
      var red = '#a94442';
      
      if (isStarSet()) {
         //submits form
         e.preventDefault(); //remove once server side is ready
         var in1 = $('#input1').val(); //remove once server side is ready
         var in2 = $('#input2').val(); //remove once server side is ready
         var in3 = $('#input3').val(); //remove once server side is ready
         AddUserReview(in1, in2, in3); //remove once server side is ready
         $('#submitButton').attr("disabled","disabled"); //remove once server side is ready
         $('#formContainer').hide(); //remove once server side is ready
      } else {
         e.preventDefault();
         $('#your_rating_div br').remove();
         $('#your_rating_div label').remove();
         $("#your_rating_div").append("</br><label display='inline-block' for='your_rating'>This field is required.</label>");
         $('#your_rating_div').prev().prev().prev().css('color', red);
      }
   });
   
   $('#input1').one('change', function() {
      var green = '#3c763d';
      
      if ($(this).val() > 0) {
         $('#your_rating_div br').remove();
         $('#your_rating_div label').remove();
         $('#your_rating_div').prev().prev().prev().css('color', green);
      }
   });
}

function SetUpStarRatings() {
   
   $('#your_rating_div').addClass('bigstars')
   
   $('#your_rating_div').rateit({
      step : 0.5,
      resetable : false,
      backingfld: '#input1',
      starwidth : 32,
      starheight : 32
   });
   
}

function setupValidation() {
   
   var span = '<span class="glyphicon glyphicon-ok form-control-feedback">';
   
   $('#review_form').validate({
      rules: {
         input2: {
            minlength: 2,
            required: true
         },
         input3: {
            minlength: 2,
            required: true
         }
      },
      highlight: function (element) {
         $(element).closest('.form-group').removeClass('has-success has-feedback').addClass('has-error has-feedback');
      },
      success: function (element) {
         $(element).closest('.form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback');
      }
   });
}

function isStarSet() {
   return $('#input1').val() > 0;
}

function setupPage() {
   // background: image-url("star-red32.png");
   // var staticImg = image-url("OLN_3FM.png");
   // var staticImg = '<%= asset_path("./assets/OLN_3FM.png") %>';
   // var staticImg = "<%= image-url("OLN_3FM.png")%>";
   var staticImg = "./assets/OLN_3FM.png";
   var staticFloor = "Olsen 3F Men's";
   var numStars = 1.5;
   
$('#logo').attr({ src: "<%= asset_path('logo.png') %>" });
   $('#imageContainer').append('<img src="' + staticImg 
                              +'" class="img-rounded center-block img-responsive" alt="bathroom" width="460" height="345">')
   
   $('#reviewHeader .row div:first').text("Avg rating: " + numStars).next().text(staticFloor);

   AddReadOnlyStars($('#reviewHeader .col-sm-12'), numStars, 32);
   
   AddUserReview(1.5, "Very Disappointing", "This was a huge disappointment! I have a really bad case of irritable bowel syndrome, so having access to a nice bathroom is crucial. I heard that UMass Lowell had really nice bathrooms, and that's why i chose to come here. That just isn't the case.!");
   
}

function AddReadOnlyStars(div, nStars, size) {
   
   if (size == 32) {
      div.addClass('bigstars');
      div.attr('data-rateit-starheight', 32);
      div.attr('data-rateit-starwidth', 32);
   }
   
   div.rateit({
      readonly : true,
      isPreset : true,
      value : nStars,
   });
} 

function AddUserReview(numInput1, strInput2, strInput3) {
   
   //var divIndex = $('#reviewsContainer div').length;
   //console.log(divIndex);
   
   $('#reviewsContainer').append('<div class="row"></div>');
   
   var div = $('#reviewsContainer').children().last();
   div.css('padding-top', "25px");
   
   div.append('<div class="col-sm-1 col-sm-offset-1"></div>');
   div.append('<div class="col-sm-10"></div>');
   div.append('<div class="col-sm-10 col-sm-offset-1"></div>');
   
   
   var div1 = div.children().first();
   var div2 = div.children().eq(1);
   var div3 = div.children().eq(2);
   
   AddReadOnlyStars(div1, numInput1, null);
   div2.append('<p><b>' + strInput2 + '</b></p>');
   div3.append('<p>' + strInput3 + '</p>'); 
   
}