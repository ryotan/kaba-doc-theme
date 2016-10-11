import $ from './js/load-jquery';
import 'bootstrap-sass';

function initializeJS() {
  //sidebar dropdown menu
  const sidebar = $('#sidebar');


  // sidebar menu toggle
  jQuery(function() {
    function responsiveView() {
      var wSize = jQuery(window).width();
      if (wSize <= 768) {
        jQuery('#container').addClass('sidebar-close');
        sidebar.find('> ul').hide();
      }

      if (wSize > 768) {
        jQuery('#container').removeClass('sidebar-close');
        sidebar.find('> ul').show();
      }
    }

    jQuery(window).on('load', responsiveView);
    jQuery(window).on('resize', responsiveView);
  });

  jQuery('.toggle-nav').click(function() {
    if (sidebar.find('> ul').is(":visible") === true) {
      jQuery('#main-content').css({
        'margin-left': '0px'
      });
      sidebar.css({
        'margin-left': '-180px'
      });
      sidebar.find('> ul').hide();
      jQuery("#container").addClass("sidebar-closed");
    } else {
      jQuery('#main-content').css({
        'margin-left': '180px'
      });
      sidebar.find('> ul').show();
      sidebar.css({
        'margin-left': '0'
      });
      jQuery("#container").removeClass("sidebar-closed");
    }
  });

  //bar chart
  if (jQuery(".custom-custom-bar-chart")) {
    jQuery(".bar").each(function() {
      var i = jQuery(this).find(".value").html();
      jQuery(this).find(".value").html("");
      jQuery(this).find(".value").animate({
        height: i
      }, 2000)
    })
  }

}

$(() => {
  //tool tips
  $('.tooltips').tooltip();

  //sidebar dropdown menu
  const $sidebar = $('#sidebar');
  $sidebar.find('.sub-menu > a').click(event => {
    const $elm = $(event.currentTarget);

    // Close previous open submenu
    let candidate = $sidebar.find('.sub-menu.menu-open > .sub');
    const $last = candidate.filter(idx => !$.contains(candidate[idx], event.currentTarget));
    $last.slideUp(200);
    $last.removeClass("menu-open");
    $last.parent().find('.menu-arrow').addClass('fa-angle-right').removeClass('fa-angle-down');

    // Toggle current submenu
    const $next = $elm.next();
    const $nextArrow = $elm.find('.menu-arrow');
    if ($next.is(":visible")) {
      $nextArrow.addClass('fa-angle-right').removeClass('fa-angle-down');
      $next.slideUp(200);
      $next.removeClass("menu-open");
      $elm.removeClass("menu-open").addClass("menu-closed");
    } else {
      $nextArrow.addClass('fa-angle-down').removeClass('fa-angle-right');
      $next.slideDown(200);
      $next.addClass("open");
      $elm.addClass("menu-open").removeClass("menu-closed");
    }

    // Center menu on screen
    const o = $elm.offset();
    const diff = 200 - o.top;
    if (diff > 0)
      $sidebar.scrollTo("-=" + Math.abs(diff), 500);
    else
      $sidebar.scrollTo("+=" + Math.abs(diff), 500);
  });

  initializeJS()
});
