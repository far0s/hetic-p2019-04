(function ($, window, document, undefined) {
  'use strict';
  $(function () {
    // Log an informal message saying this is a "developer zone"
    console.warn('Bonjour ! Ceci est la console développeur, il vaut mieux que tu ne touches à rien ici si tu ne veux pas casser le jeu :-)');
    console.warn('Pour fermer la console, appuie sur la petite croix en haut à droite.');

    // At start, go straight to #home page
    location.href='#home';

  });
})(jQuery, window, document);
