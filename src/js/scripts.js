(function ($, window, document, undefined) {
  'use strict';
  $(function () {

    // Log an informal message saying this is a "developer zone"
    console.warn('Bonjour ! Ceci est la console développeur, il vaut mieux que tu ne touches à rien ici si tu ne veux pas casser le jeu :-)');
    console.warn('Pour fermer la console, appuie sur la petite croix en haut à droite.');

    // At start, go straight to #home page
    location.href='#home';

    // Burger menu interaction, inpired by http://codepen.io/pwsm50/pen/KHDEI
    $('.menu-collapsed').click(function() {
      $(this).toggleClass('menu-expanded');
    });

    function initChapter($ch, $dataColor){
      $('main').attr('data-color', $dataColor);
      var typed = 'typed--'+$ch;
      $(typed).typed({
        strings: $(typed),
        typeSpeed: 0
      });
    }

    // Chapter 1 scenario and event listeners
    function ch1Scenario(){
      $('.approbation').hide();
      $('.ch1__screen1 .btn-next').hide();
      $('.ch1__screen2 .bottle img:nth-of-type(2)').hide();

      // Typed dialog

      // 'OK' button listener, triggers next bubble
      $('.dialog-ok').click(function(){
        $('.dialog').hide('slow');
        $('.approbation').show('slow');
        $('.ch1__screen1 .btn-next').show('slow');
      });
      // 'Ready' button listener, starting mini-game
      $('.ch1__screen1 .btn-next').click(function(){
        $('.ch1 .screen').toggleClass('screen--is-visible');
      });

      var shakes = 0;
      $('.ch1__screen2 .bottle').click(function(){
        $('.ch1__screen2 .bottle').addClass('bottle--is-shaking');
        setTimeout(function(){
          $('.bottle--is-shaking').removeClass('bottle--is-shaking');
        }, 1000);
        shakes++;
        if (shakes>=3) {
          $('.ch1__screen2 .bottle').addClass('bottle--is-popping');
          setTimeout(function(){
            $('.ch1__screen2 .bottle img:nth-of-type(2)').show('slow');
            $('.ch1__screen2 .btn-next').css('display', 'flex');
          }, 1000);
        }
      });
    }

    // TODO:
    // - Optimize Typed.js
    // - Add Interact.js - http://interactjs.io/
    // - Add 'unlockable chapters' functionnality
    // - Add 'reset' function


    // Init chapter state, each time the app changes Chapter
    $('.nav-href').click(function(){
      var href = $(this).attr('href');
      var dataColorTarget = $(this).attr('data-color-target');
      initChapter(href, dataColorTarget);
      if (href === '#ch1') {ch1Scenario();}
    });


  });
})(jQuery, window, document);
