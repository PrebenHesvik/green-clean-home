$('#contact-form').on('submit', function (event) {
  event.preventDefault();
  console.log('form submitted!'); // sanity check
  submit_form();
});

// using jQuery
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
  },
});

// AJAX for posting
function submit_form() {
  console.log('submit form is working!'); // sanity check

  var response = grecaptcha.getResponse();

  if (response.length == 0) {
    $('#recaptcha-failure-js').fadeIn(1000);
    console.log('no recaptcha'); // another sanity check
  } else {
    $.ajax({
      url: 'submit-form/', // the endpoint
      type: 'POST', // http method
      data: {
        name: $('#id_name').val(),
        phone: $('#id_phone').val(),
        email: $('#id_email').val(),
        message: $('#id_message').val(),
        recaptcha: $('#g-recaptcha-response').val(),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
      }, // data sent with the post request

      // handle a successful response
      success: function (json) {
        $('#id_name').val(''); // remove the value from the input
        $('#id_phone').val(''); // remove the value from the input
        $('#id_email').val(''); // remove the value from the input
        $('#id_message').val(''); // remove the value from the input
        $('#recaptcha-failure-js').hide();
        $('#form-success-js').fadeIn(3000).fadeOut(5000);
        console.log(json); // log the returned json to the console
        console.log('success'); // another sanity check
      },

      // handle a non-successful response
      error: function (xhr, errmsg, err) {
        $('#results').html(
          "<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " +
            errmsg +
            " <a href='#' class='close'>&times;</a></div>"
        ); // add the error to the dom
        console.log(xhr.status + ': ' + xhr.responseText); // provide a bit more info about the error to the console
      },
    });
  }
}
