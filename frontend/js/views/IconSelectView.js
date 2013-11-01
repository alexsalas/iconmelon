// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/IconSelectView', ['views/ProtoView', 'collectionViews/SectionsCollectionView', 'collections/SectionsCollection', 'collectionViews/FiltersCollectionView', 'collections/FiltersCollection', 'underscore', 'jquery', 'helpers'], function(ProtoView, SectionsCollectionView, SectionsCollection, FiltersCollectionView, FiltersCollection, _, $, helpers) {
    var IconSelectView, _ref;

    IconSelectView = (function(_super) {
      __extends(IconSelectView, _super);

      function IconSelectView() {
        _ref = IconSelectView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      IconSelectView.prototype.template = '#icon-select-view-template';

      IconSelectView.prototype.className = '';

      IconSelectView.prototype.events = {
        'keyup': 'debouncedFilter',
        'click #js-add-effects': 'toggleEffects'
      };

      IconSelectView.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        this.buttonCounterTemplate = _.template(helpers.unescape($("#button-counter-template").text()));
        this.bindModelEvents();
        this.debouncedFilter = _.debounce(this.filter, 250);
        IconSelectView.__super__.initialize.apply(this, arguments);
        return this;
      };

      IconSelectView.prototype.toggleEffects = function() {
        this.$('#js-filter-block').slideToggle();
        return this.$el.addClass('is-filter-show');
      };

      IconSelectView.prototype.filter = function(e) {
        return App.vent.trigger('icon-select-filter:change', $.trim($(e.target).val()));
      };

      IconSelectView.prototype.bindModelEvents = function() {
        return this.model.on('change:selectedCounter', _.bind(this.renderButton, this));
      };

      IconSelectView.prototype.render = function() {
        var _this = this;

        IconSelectView.__super__.render.apply(this, arguments);
        this.renderButton();
        _.defer(function() {
          return _this.renderView();
        });
        return this;
      };

      IconSelectView.prototype.renderView = function() {
        var _this = this;

        this.filtersCollectionView = new FiltersCollectionView({
          collection: new FiltersCollection,
          isRender: true,
          $el: this.$('#js-filters-place')
        });
        this.filtersCollectionView.collection.fetch();
        this.sectionsCollection = new SectionsCollection;
        this.sectionsCollection.fetch().then(function() {
          _this.sectionsCollectionView = new SectionsCollectionView({
            collection: _this.sectionsCollection,
            isRender: true,
            $el: _this.$('#js-section-collections-place')
          });
          App.sectionsCollectionView = _this.sectionsCollectionView;
          return _this.model.sectionsView = _this.sectionsCollectionView;
        });
        return this;
      };

      IconSelectView.prototype.renderButton = function() {
        return this.$('.icon-set-l').replaceWith(this.buttonCounterTemplate(this.model.toJSON()));
      };

      return IconSelectView;

    })(ProtoView);
    return IconSelectView;
  });

}).call(this);
