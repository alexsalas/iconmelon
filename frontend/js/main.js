// Generated by CoffeeScript 1.6.2
(function() {
  require.config({
    paths: {
      jquery: 'lib/jquery-2.0.1',
      backbone: 'lib/backbone',
      underscore: 'lib/lodash.underscore',
      marionette: 'lib/backbone.marionette',
      babysitter: 'lib/backbone.babysitter',
      wreq: 'lib/backbone.wreqr',
      socketio: 'lib/socket.io',
      backboneiosync: 'lib/backbone.iosync',
      backboneiobind: 'lib/backbone.iobind',
      Modernizr: 'lib/Modernizr',
      hammer: 'lib/jquery.hammer',
      baresize: 'lib/jquery.ba-resize',
      fileupload: 'lib/jquery.fileupload',
      'jquery.ui.widget': 'lib/jquery.ui.widget',
      stickIt: 'lib/backbone.stickit',
      md5: 'lib/md5',
      text: 'lib/text',
      themes: '../themes.js'
    },
    shim: {
      stickIt: {
        deps: ['backbone']
      },
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      },
      backboneiosync: {
        exports: 'Backbone',
        deps: ['backbone', 'socketio']
      },
      backboneiobind: {
        exports: 'Backbone',
        deps: ['backboneiosync']
      },
      marionette: {
        exports: 'Backbone.Marionette',
        deps: ['stickIt']
      },
      baresize: {
        deps: ['jquery']
      }
    }
  });

  define('main', ['collectionViews/NotiesCollectionView', 'marionette', 'jquery', 'router', 'socketio', 'helpers'], function(Notyfier, M, jquery, Router, io, helpers) {
    var Application;

    Application = (function() {
      function Application() {
        var App;

        App = new M.Application();
        window.App = App;
        App.addRegions({
          main: '#main-l'
        });
        this.$mainHeader = $('#js-main-header');
        this.$loadingLine = $('#js-loadin-line');
        App.$loadingLine = this.$loadingLine;
        App.$mainHeader = this.$mainHeader;
        App.$bodyHtml = $('body, html');
        App.$svgWrap = $('#js-svg-wrap');
        App.helpers = helpers;
        App.loadedHashes = [];
        App.iconsSelected = [];
        App.filtersSelected = [];
        window.socket = io.connect('http://localhost');
        App.router = new Router;
        Backbone.history.start();
        App.start();
        App.helpers.listenLinks();
        App.$window = $(window);
        this.$mainHeader = $('#js-main-header');
        this.listenEvents();
        this.makeNotyfier();
      }

      Application.prototype.makeNotyfier = function() {
        return App.notifier = new Notyfier({
          isRender: true
        });
      };

      Application.prototype.loadSvg = function() {
        return App.$svgWrap.load('css/icons-main-page.svg');
      };

      Application.prototype.listenEvents = function() {
        var _this = this;

        return App.$window.on('scroll', function() {
          return _this.$mainHeader.toggleClass('is-convex', App.$window.scrollTop() > 0);
        });
      };

      return Application;

    })();
    return new Application;
  });

}).call(this);
