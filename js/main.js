(function ($) {
  "use strict";
  $(window).on("load", function () {
    // makes sure the whole site is loaded
    //preloader
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.

    //masonry
    $(".grid").masonry({
      itemSelector: ".grid-item",
    });
  });

  $(document).ready(function () {
    //active menu
    $(document).on("scroll", onScroll);

    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash;
      var $target = $(target);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top + 2,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });

    //scroll js
    smoothScroll.init({
      selector: "[data-scroll]", // Selector for links (must be a valid CSS selector)
      selectorHeader: "[data-scroll-header]", // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: "easeInOutCubic", // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function (toggle, anchor) {}, // Function to run after scrolling
    });

    //menu
    var bodyEl = document.body,
      content = document.querySelector(".content-wrap"),
      openbtn = document.getElementById("open-button"),
      closebtn = document.getElementById("close-button"),
      isOpen = false;

    function inits() {
      initEvents();
    }

    function initEvents() {
      openbtn.addEventListener("click", toggleMenu);
      if (closebtn) {
        closebtn.addEventListener("click", toggleMenu);
      }

      // close the menu element if the target it´s not the menu element or one of its descendants..
      content.addEventListener("click", function (ev) {
        var target = ev.target;
        if (isOpen && target !== openbtn) {
          toggleMenu();
        }
      });
    }

    function toggleMenu() {
      if (isOpen) {
        classie.remove(bodyEl, "show-menu");
      } else {
        classie.add(bodyEl, "show-menu");
      }
      isOpen = !isOpen;
    }

    inits();

    //typed js
    $(".typed").typed({
      strings: [
        "Euclid NISP calibration and systematics",
        "Cosmology, simulations, and large-scale structure",
        "Artificial intelligence for astrophysics",
      ],
      typeSpeed: 70,
      backDelay: 500,
      // loop
      loop: true,
    });

    //owl carousel
    $(".owl-carousel").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds

      items: 1,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],

      // CSS Styles
      baseClass: "owl-carousel",
      theme: "owl-theme",
    });

    $(".owl-carousel2").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds

      items: 1,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],
      autoPlay: false,

      // CSS Styles
      baseClass: "owl-carousel",
      theme: "owl-theme",
    });

    //contact
    $("input").blur(function () {
      // check if the input has any value (if we've typed into it)
      if ($(this).val()) $(this).addClass("used");
      else $(this).removeClass("used");
    });

    //pop up porfolio
    $(".portfolio-image li a").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
      // other options
    });

    //Skill
    jQuery(".skillbar").each(function () {
      jQuery(this).appear(function () {
        jQuery(this)
          .find(".count-bar")
          .animate(
            {
              width: jQuery(this).attr("data-percent"),
            },
            3000
          );
        var percent = jQuery(this).attr("data-percent");
        jQuery(this)
          .find(".count")
          .html("<span>" + percent + "</span>");
      });
    });
  });

  //header
  function inits() {
    window.addEventListener("scroll", function (e) {
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 300,
        header = document.querySelector(".for-sticky");
      if (distanceY > shrinkOn) {
        classie.add(header, "opacity-nav");
      } else {
        if (classie.has(header, "opacity-nav")) {
          classie.remove(header, "opacity-nav");
        }
      }
    });
  }

  window.onload = inits();

  //nav-active
  function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $(".menu-list a").each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (
        refElement.position().top <= scrollPosition &&
        refElement.position().top + refElement.height() > scrollPosition
      ) {
        $(".menu-list a").removeClass("active");
        currentLink.addClass("active");
      } else {
        currentLink.removeClass("active");
      }
    });
  }
  function escapeHtml(value) { return String(value || "").replace(/[&<>\"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#039;"}[c];}); }
  function formatDate(value){if(!value)return "Present";var p=value.split("-");if(p.length===1)return p[0];var d=new Date(+p[0],+p[1]-1,p[2]?+p[2]:1);return d.toLocaleDateString("en-GB",{year:"numeric",month:"long",day:p[2]?"numeric":undefined});}
  function publicationById(id){return window.ACADEMIC_DATA.publications.filter(function(p){return p.id===id;})[0];}
  function renderPublications(){var items=window.ACADEMIC_DATA.publications.slice().sort(function(a,b){return b.year-a.year;});$("#publication-list").html(items.map(function(p){var authors=p.authors.map(function(a){return a==="Amirmohammad Chegeni"?"<strong>"+escapeHtml(a)+"</strong>":escapeHtml(a);}).join(", ");var links='<a href="'+escapeHtml(p.publisher)+'">Publisher</a> · <a href="https://doi.org/'+escapeHtml(p.doi)+'">DOI</a>'+(p.arxiv?' · <a href="'+escapeHtml(p.arxiv)+'">arXiv</a>':'')+(p.code?' · <a href="'+escapeHtml(p.code)+'">Code</a>':'');return '<article class="publication" id="pub-'+escapeHtml(p.id)+'"><p class="publication-year">'+p.year+'</p><h3>'+escapeHtml(p.title)+'</h3><p class="authors">'+authors+'</p><p class="citation"><em>'+escapeHtml(p.journal)+'</em>, '+escapeHtml(p.volume)+', '+escapeHtml(p.pages)+' ('+p.year+').</p><p class="publication-links">'+links+'</p></article>';}).join(""));}
  function renderTimeline(filter){var items=window.ACADEMIC_DATA.timeline.slice().sort(function(a,b){return b.date.localeCompare(a.date);}).filter(function(i){return filter==="all"||i.type===filter;});$("#timeline-list").html(items.map(function(i){var p=i.publicationId?publicationById(i.publicationId):null,title=p?p.title:i.title,place=p?p.journal:i.institution,links=p?[{label:"Publication",url:p.publisher},{label:"DOI",url:"https://doi.org/"+p.doi}]:(i.links||[]);return '<li class="timeline-item"><div class="timeline-date">'+formatDate(i.date)+(Object.prototype.hasOwnProperty.call(i,"endDate")?' → '+formatDate(i.endDate):'')+'</div><article><p class="timeline-type">'+escapeHtml(i.type)+'</p><h3>'+escapeHtml(title)+'</h3><p class="timeline-place">'+escapeHtml(place)+(i.location?' · '+escapeHtml(i.location):'')+'</p>'+(i.description?'<p>'+escapeHtml(i.description)+'</p>':'')+'<p class="timeline-links">'+links.map(function(l){return '<a href="'+escapeHtml(l.url)+'">'+escapeHtml(l.label)+'</a>';}).join(' · ')+'</p><ul class="tags">'+(i.tags||[]).map(function(t){return '<li>'+escapeHtml(t)+'</li>';}).join('')+'</ul></article></li>';}).join(""));}
  $(document).ready(function(){if(window.ACADEMIC_DATA){renderPublications();renderTimeline("all");}$(".timeline-filters button").on("click",function(){$(".timeline-filters button").removeClass("active");$(this).addClass("active");renderTimeline($(this).data("filter"));});$("#current-year").text(new Date().getFullYear());});
})(jQuery);
