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

//ADDS ACTIVE CLASS TO LINK ON CURRENT PAGE
$(function () {
  var domain = location.pathname;
  if (domain === '/') {
    $('.navbar-home').addClass('active');
  } else {
    $('.navbar a[href^="/' + location.pathname.split('/')[1] + '"]')
      .not('.disabled')
      .addClass('active');
  }
});
