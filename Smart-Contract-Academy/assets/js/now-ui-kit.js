/*!

 =========================================================
 * Now-ui-kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit/blob/master/LICENSE.md)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
    toggle_initialized = false;

$(document).ready(function() {
    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Popovers and set color for popovers
    $('[data-toggle="popover"]').each(function() {
        color_class = $(this).data('color');
        $(this).popover({
            template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        });
    });

    // Activate the image for the navbar-collapse
    nowuiKit.initNavbarImage();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

    if ($('.navbar[color-on-scroll]').length != 0) {
        nowuiKit.checkScrollForTransparentNavbar();
        $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
    }

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Activate bootstrapSwitch
    $('.bootstrap-switch').each(function() {
        $this = $(this);
        data_on_label = $this.data('on-label') || '';
        data_off_label = $this.data('off-label') || '';

        $this.bootstrapSwitch({
            onText: data_on_label,
            offText: data_off_label
        });
    });

    if ($(window).width() >= 992) {
        big_image = $('.page-header-image[data-parallax="true"]');

        $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
    }

    // Activate Carousel
    $('.carousel').carousel({
        interval: 4000
    });

    $('.date-picker').each(function() {
        $(this).datepicker({
            templates: {
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if (datepicker_color.length != 0) {
                $('.datepicker').addClass('datepicker-' + datepicker_color + '');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
    });


});

$(window).on('resize', function() {
    nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);

    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function() {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function() {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});

nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    initNavbarImage: function() {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');

        if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }
        } else if (background_image != undefined) {
            $navbar.css('background', "")
                .attr('data-nav-image', '' + background_image + '')
                .css('background-size', "")
                .removeClass('has-image');
        }
    },

    initSliders: function() {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


//Populate user list

jQuery(document).ready(function($) {
  var sheetId = "1ShPIj68OfdKHluWX2bXGlC5BW8axwtK47TFTLmynZhM";
  var apiKey = "AIzaSyBJbrne6qbs2d6qjZYA2LWy0PSjdhEenxs";
  var api = "https://content-sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/values/A1:Z100?key="+apiKey;

  $.getJSON(api, function(data) {

    // console.log(data);
    var values = data.values;
    console.log(values);

    var html_content = "";
    var imgId = 0;
    var socials = [
      {
        id: 7,
        name: "envelope",
        title: "Email"
      },
      {
        id: 8,
        name: "facebook",
        title: "facebook"
      },{
        id: 9,
        name: "twitter",
        title: "twitter"
      },{
        id: 10,
        name: "github",
        title: "github"
      },{
        id: 11,
        name: "meetup",
        title: "meetup"
      },{
        id: 12,
        name: "slack",
        title: "slack"
      }

    ];


    var html_content_top = "";
    var html_website = "";
    var html_socials = "";
    var html_content_bot = "";

    values.shift();
    values = shuffle(values);

    for (var i = 0; i < values.length; i++) {

        if(!values[i][0]) {
          break;
        }

        html_content_top = "";
        html_website = "";
        html_socials = "";
        html_content_bot = "";
        // if( values[i][5] ) {
        //   imgId = values[i][5].substr(33);
        // }

        // var imageLink = "https://drive.google.com/uc?export=view&id="+imgId;

          html_content_top +=
          "<div class=\"col-md-3 \">"+
                "<div class=\"\">"+
                    // <img src="./assets/img/avatar.jpg" alt="Thumbnail Image" class="rounded-circle img-fluid img-raised">
                    "<h4 class=\"title\">"+values[i][1] + " " + values[i][0] +"</h4>"+
                    "<p class=\"category \">"+values[i][2]+"</p>";
                    // <p class="description">You can write here details about one of your team members. You can give more details about what they do. Feel free to add some
                    //     <a href="#">links</a> for people to be able to follow them outside the site.</p>
                    // <a href="#pablo" class="btn btn-primary btn-icon btn-round"><i class="fa fa-twitter"></i></a>
                    // <a href="#pablo" class="btn btn-primary btn-icon btn-round"><i class="fa fa-instagram"></i></a>
                    // <a href="#pablo" class="btn btn-primary btn-icon btn-round"><i class="fa fa-facebook-square"></i></a>

          // "<div class=\"project_container\">"+
          //   "<div class=\"project\">"+
          //     "<div class=\"project_text\" >"+
          //       "<div class=\"project_title\">"+
          //         "<h2>"+values[i][0]+"</h2>"+
          //       "</div>"+
          //       "<hr>"+
          //       "<div class=\"project_description\">"+
          //         "<p>"+values[i][1]+"</p>"+
          //         "<div class=\"hideLongDescription\"></div>"+
          //       "</div>"+
          //     "</div>"+
          //     "<div class=\"center\">"+
          //       "<img max-height=\"200\" width=\"100%\" src=\""+imageLink+"\">"+
          //     "</div>"+
          //     "<div class=\"website center\">";


              // if(values[i][6]) {
              //   html_website += "<a target=\"_blank\" href=\""+values[i][6]+"\">"+
              //       "Site Web"+
              //     "</a>";
              // }
              // html_website += "</div>";

              // html_socials += "<div class=\"socialNetworks\">";
              // for (var j = 0; j < socials.length; j++) {
              //   if(values[i][socials[j].id]) {
              //     html_socials += "<div class=\""+socials[j].name+"\" >"+
              //                       "<a title=\""+socials[j].title+"\"  target=\"_blank\" href=\""+values[i][socials[j].id]+"\">"+
              //                         "<i class=\"fa fa-"+socials[j].name+"\" aria-hidden=\"true\"></i>"+
              //                       "</a>"+
              //                     "</div>";
              //   }
              // }

              // html_socials += "</div>";

          html_content_bot += "</div>"+
                            "</div>";


    html_content += html_content_top + html_website + html_socials + html_content_bot;
    }
    $("#participants").html(html_content);

    // $(".envelope a").click(function(e){
    //   e.preventDefault();
    //   var $temp = $("<input>");
    //  $("body").append($temp);
    //  $temp.val($(this).attr("href")).select();
    //  document.execCommand("copy");
    //  $temp.remove();
    // });


  });


  function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
      return a;

  }



});
