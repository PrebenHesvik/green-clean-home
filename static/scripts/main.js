//HAMBURGER ICON THAT TOGGLES MOBILE-NAVBAR
jQuery(document).ready(function () {
  jQuery('.toggle-nav').click(function (e) {
    $('.navbar-mobile').slideToggle('slow');
    $('.toggle-nav').toggleClass('fixed');
    $('.toggle-nav').toggleClass('white');
    $('html').toggleClass('overflow');
    e.preventDefault();
  });
});

//=================  ADDS ACTIVE CLASS TO LINK ON CURRENT PAGE  =================
$(function () {
  var domain = location.pathname;
  if (domain === '/') {
    $('.navbar-home').addClass('active');
  } else {
    $('.navbar__link a[href^="/' + location.pathname.split('/')[1] + '"]')
      .not('.disabled')
      .addClass('active');
  }
});

//=========================  CSRF TOKEN  =========================
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

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
      // Only send the token to relative URLs i.e. locally.
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    }
  },
});

//=================  AJAX CALL FOR UPDATING PRICE   =================
$('.get-quote').click(function () {
  event.preventDefault();
  var house_type = $('#house-type').find(':selected').text();
  var bathrooms = $('#bathroom').find(':selected').text();
  var cleaning_type = $('#cleaning-type').find(':selected').text();
  var csrftoken = getCookie('csrftoken');

  $.ajax({
    type: 'POST',
    url: '/calc-price/',
    dataType: 'json',
    data: {
      house_type: house_type,
      bathrooms: bathrooms,
      cleaning_type: cleaning_type,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (data) {
      $('.price-box').slideDown().delay(2000).html(data['html']);
    },
    error: function (xhr, errmsg, err) {
      console.log('filter projects: Ajax Error:');
      console.log(xhr.status + ': ' + xhr.responseText); // provide a bit more info about the error to the console
    },
  });
});

//============  DYNAMICALLY CHANGE BACKGROUND COLOR OF NAVAR ELEMENTS DEPENDING ON BACKGROUND COLOR   =========
var rgb = $('.container-faq')
  .css('background-color')
  .replace('rgb(', '')
  .replace(')', '')
  .split(',')
  .map(Number);
var o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
if (o > 125) {
  $('.navbar ul > li > a').css('color', 'black');
  $('nav > .toggle-nav').css('color', 'black');
} else {
  $('.navbar ul > li > a').css('color', 'white');
  $('.navbar-default .navbar-toggle .icon-bar').css('color', 'white');
}

//============  SET SELECT TAGS IN PRICING TO ORIGINAL VALUES WHEN REFRESHING   =========
document.getElementsByTagName('select')[0].selectedIndex = 0;
document.getElementsByTagName('select')[1].selectedIndex = 0;
document.getElementsByTagName('select')[2].selectedIndex = 0;
