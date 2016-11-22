// TODO:
// - Optimize Typed.js
// - Add Interact.js - http://interactjs.io/
// - Add 'unlockable chapters' functionnality
// - Add 'reset' function

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
    }

    // Chapter 1 scenario and event listeners
    function ch1scenario(){
      $('.ch1 .approbation').hide();
      $('.ch1__screen1 .btn-next').hide();
      $('.ch1__screen2 .bottle img:nth-of-type(2)').hide();

      // TODO: Typed dialog
      $('.typed--ch1').typed({
        strings: $('.typed--ch1'),
        typeSpeed: 0
      });

      // 'OK' button listener, triggers next bubble
      $('.ch1 .dialog-ok').click(function(){
        $('.ch1 .dialog').hide('slow');
        $('.ch1 .approbation').show('slow');
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

    // Chapter 2 scenario
    function ch2scenario(){
      $('.ch2 .btn-next').hide();
      $('.ch2__prompt1').hide();
      $('.ch2 .assemblage').hide();

      $('.ch2 .dialog-ok').click(function(){
        $('.ch2 .dialog').hide('slow');
        $('.ch2__prompt1').show('slow');
        $('.ch2__btn1').show('slow');
      });
      $('.ch2__btn1').click(function(){
        $('.ch2 .assemblage').show('slow');
        // TODO Add Drag&Drop puzzle mechanics

        // When the rocket is complete
        $('.ch2__screen1 .ch2__btn2').show();
        $('.ch2__screen1 .ch2__btn2').css('z-index', '3');
      });
      $('.ch2__screen1 .ch2__btn2').click(function(){
        $('.ch2__screen1').removeClass('screen--is-visible');
        $('.ch2__screen2').addClass('screen--is-visible');
        $('.ch2__screen2 .dialog').show('slow');
        setTimeout(function(){
          $('.ch2__screen2 .dialog').hide('slow');
          $('.ch2__screen2').addClass('is-launching');
          $('.header').addClass('is-launching');
        }, 3000);
        setTimeout(function(){
          $('.ch2__screen2 .nav-href').show('slow');
        }, 5000);
      });
    }

    // Chapter 3 scenario
    function ch3scenario(){
      $('.ch3__btn1').hide();
      $('.ch3__screen2 .nav-href').hide();

      $('.ch3 .ch3__screen1 .dialog-ok').click(function(){
        $('.ch3__btn1').show('slow');
      });
      $('.ch3__btn1').click(function(){
        $('.ch3__screen1').removeClass('screen--is-visible');
        $('.ch3__screen2').addClass('screen--is-visible');
      });

      // Tap interaction on Rosetta
      var taps=3; // starting scale of the '.inner-circle'
      $('.rosetta').click(function(){
        if (taps < 9) {
          taps++;
          var scale = 'scale3d(.'+taps+', .'+taps+', 1)';
          $('.rosetta .inner-circle').css('transform', scale);
        } else {
          taps++;
          $('.rosetta .inner-circle').css('transform', 'scale3d(1,1,1)');
          $('.ch3__screen2 .prompt > p').text('Bravo, tu as redémarré le réacteur !');
          $('.ch3__screen2 .nav-href').show('slow');
        }
      });
    }

    // Chapter 4 scenario
    function ch4scenario(){
      $('.ch4__btn3').hide();
      $('.ch4__screen3 .prompt').hide();
      $('.ch4 .nav-href').hide();

      $('.ch4__btn1').click(function(){
        $('.ch4__screen1').removeClass('screen--is-visible');
        $('.ch4__screen2').addClass('screen--is-visible');
      });
      $('.ch4__btn2').click(function(){
        $('.ch4__screen2 .dialog').hide('slow');
        $('.ch4__btn3').show('slow');
      });
      $('.ch4__btn3').click(function(){
        $('.ch4__screen2').removeClass('screen--is-visible');
        $('.ch4__screen3').addClass('screen--is-visible');
        $('.ch4__screen3 .prompt').show('slow');
      });

      // Asteroid field svg paths
      var rail = document.getElementById('rail'),
          knob = document.getElementById('knob'),
          H = rail.getBBox().height,
          railLength = rail.getTotalLength();

      function update(){
        var P = rail.getPointAtLength(railLength - (this.y/H*railLength));
        TweenLite.set(knob,{attr:{x:(P.x - 32),y:(P.y - 32)}});
        // End condition
        if ($('#knob').attr('x') === '-91.5' || $('#knob').attr('y') === '259') {
          $('.ch4__screen3 .prompt > p').text('Bravo, tu es sorti indemne du champ d\'astéroïdes !');
          $('.ch4 .nav-href').show('slow');
        }
      }

      Draggable.create(document.createElement('div'),{
        type:'y',throwProps:true,bounds:{minY:H,maxY:0},
        trigger:knob,overshootTolerance:0,onDrag:update,onThrowUpdate:update
      });
    }

    // Chapter 5 scenario
    function ch5scenario(){
      $('.ch5 .btn-next').hide();

      // TODO: Typed dialog

      // When typed has finished typing, display btn.next
      $('.ch5 .btn-next').show('slow');
    }


    // Init chapter state, each time the app changes Chapter
    $('.nav-href').click(function(){
      var href = $(this).attr('href');
      var dataColorTarget = $(this).attr('data-color-target');
      initChapter(href, dataColorTarget);
      if (href === '#ch1') {ch1scenario();}
      else if (href === '#ch2') {ch2scenario();}
      else if (href === '#ch3') {ch3scenario();}
      else if (href === '#ch4') {ch4scenario();}
      else if (href === '#ch5') {ch5scenario();}
    });


  });
})(jQuery, window, document);
