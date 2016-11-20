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

  // Init chapter state, each time the app changes Chapter
  $('.nav-href').click(function(){
    var href = $(this).attr('href');
    var dataColorTarget = $(this).attr('data-color-target');
    initChapter(href, dataColorTarget);
  });

  function initChapter($ch, $dataColor){
    $('main').attr('data-color', $dataColor);
    var typed = 'typed--'+$ch;
    // $(typed).typed({
    //   strings: $(typed),
    //   typeSpeed: 0
    // })
  }

  // TODO:
  // - Add chapter's 'scenarios' (including Typed, in-chapter events, etc)
  // - Optimize Typed.js
  // - Add Interact.js - http://interactjs.io/
  // - Add 'unlockable chapters' functionnality
});
