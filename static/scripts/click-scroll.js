//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5, 6];

$.each(sectionArray, function (index, value) {
  $(document).scroll(function () {
    var offsetSection = $('#' + 'section_' + value).offset().top;
    var docScroll = $(document).scrollTop();
    var docScroll1 = docScroll + 1;

    if (docScroll1 >= offsetSection) {
      $('.faq-category a').removeClass('active');
      $('.faq-category a:link').addClass('inactive');
      $('.faq-category a').eq(index).addClass('active');
      $('.faq-category a:link').eq(index).removeClass('inactive');
    }
  });

  $('.dropdown-item a')
    .eq(index)
    .click(function (e) {
      var offsetClick = $('#' + 'section_' + value).offset().top;
      e.preventDefault();
      $('.dropdown-items').toggleClass('dropped-down');
      $('html, body').animate(
        {
          scrollTop: offsetClick - 80,
        },
        600
      );
    });
});

$(document).ready(function () {
  $('li a:link').addClass('inactive');
  $('li a').eq(0).addClass('active');
  $('li a:link').eq(0).removeClass('inactive');
});

// FAQ toggle drop down
jQuery(document).ready(function () {
  jQuery('.toggle-me').click(function (e) {
    $('.nav-content').toggle();
    $('.dropdown-items').toggleClass('dropped-down');
    $('.questions').toggleClass('move-down');

    e.preventDefault();
  });
});

// OPENS UP ANSWER TO QUESTION
jQuery(document).ready(function () {
  jQuery('.question').click(function (e) {
    $(this).siblings('.answer').slideToggle('slow');
    $(this).parent().siblings('.answer').slideToggle('slow');
    e.preventDefault();
  });
});

// PLUS-ICON ANIMATION - TOGGLES TWO CLASSES WHEN THE PLUS-ICON IS CLICKED.
jQuery(document).ready(function () {
  jQuery('.question-icon').click(function (e) {
    $(this)
      .children('.plus-vertical-line')
      .toggleClass('vertical-open vertical-closed');
    e.preventDefault();
  });
});
