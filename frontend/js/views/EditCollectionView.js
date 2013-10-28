// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/EditCollectionView', ['views/ProtoView', 'views/IconEditView', 'collections/IconsCollection', 'collectionViews/IconsCollectionView', 'fileupload', 'jquery', 'helpers'], function(ProtoView, IconEditView, IconsCollection, IconsCollectionView, fileupload, $, helpers) {
    var EditCollectionView, _ref;

    EditCollectionView = (function(_super) {
      __extends(EditCollectionView, _super);

      function EditCollectionView() {
        _ref = EditCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      EditCollectionView.prototype.template = '#edit-collection-view-template';

      EditCollectionView.prototype.events = {
        'click #js-add-icon': 'addIcon',
        'click .js-submit-btn:not(.is-inactive)': 'submit'
      };

      EditCollectionView.prototype.bindings = {
        '#js-collection-name': {
          observe: 'name',
          onSet: 'nameSet'
        },
        '#js-author': {
          observe: 'author',
          onSet: 'authorSet'
        },
        '#js-email': {
          observe: 'email',
          onSet: 'emailSet'
        },
        '#js-website': 'website'
      };

      EditCollectionView.prototype.ui = {
        submitBtn: '.js-submit-btn'
      };

      EditCollectionView.prototype.initialize = function() {
        EditCollectionView.__super__.initialize.apply(this, arguments);
        this.initFileUpload();
        return this;
      };

      EditCollectionView.prototype.render = function() {
        EditCollectionView.__super__.render.apply(this, arguments);
        this.$submitButton = this.$(this.ui.submitBtn);
        this.renderIconsCollection();
        this.stickit();
        return this;
      };

      EditCollectionView.prototype.renderIconsCollection = function() {
        this.iconsCollection = new IconsCollectionView({
          itemView: IconEditView,
          collection: new IconsCollection(this.model.get('icons').length ? this.model.get('icons') : [{}]),
          isRender: true,
          $el: this.$('#js-icons-place')
        });
        return App.vent.on('edit-collection:change', _.bind(this.checkIfValidCollection, this));
      };

      EditCollectionView.prototype.addIcon = function() {
        return this.iconsCollection.collection.add({});
      };

      EditCollectionView.prototype.nameSet = function(val) {
        this.nameValid = !($.trim(val.length) < 1 ? true : false);
        this.$('#js-collection-name').toggleClass('is-error', !this.nameValid);
        this.checkIfValidCollection();
        return val;
      };

      EditCollectionView.prototype.authorSet = function(val) {
        this.authorValid = !($.trim(val.length) < 4 ? true : false);
        this.$('#js-author').toggleClass('is-error', !this.authorValid);
        this.checkIfValidCollection();
        return val;
      };

      EditCollectionView.prototype.emailSet = function(val) {
        var re;

        re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.emailValid = re.test(val);
        this.$('#js-email').toggleClass('is-error', !this.emailValid);
        this.checkIfValidCollection();
        return val;
      };

      EditCollectionView.prototype.checkIfValidCollection = function() {
        return this.enableSubmitButton(this.nameValid && this.authorValid && this.emailValid && this.isValidCollection());
      };

      EditCollectionView.prototype.isValidCollection = function() {
        var i, valid;

        i = 0;
        valid = false;
        while (i < this.iconsCollection.collection.models.length) {
          if (this.iconsCollection.collection.at(i).get('isValid')) {
            i = this.iconsCollection.collection.models.length;
            valid = true;
          }
          i++;
        }
        return valid;
      };

      EditCollectionView.prototype.enableSubmitButton = function(state) {
        return this.$submitButton.toggleClass('is-inactive', !state);
      };

      EditCollectionView.prototype.submit = function() {
        var _this = this;

        this.$submitButton.addClass('loading-eff is-inactive');
        return _.defer(function() {
          _this.model.set('icons', _this.iconsCollection.collection.toJSON());
          return _this.model.save().then(function() {
            return _this.$submitButton.removeClass('loading-eff');
          }).fail(function(err) {
            return _this.$submitButton.removeClass('loading-eff is-inactive');
          });
        });
      };

      EditCollectionView.prototype.initFileUpload = function() {
        var _this = this;

        return this.$('#fileupload').fileupload({
          url: '/file-upload',
          acceptFileTypes: /(\.|\/)(svg)$/i,
          dataType: 'text',
          limitMultiFileUploads: 999,
          done: function(e, data) {
            return _.defer(function() {
              var modelToRemove, name;

              name = data.files[0].name.split('.svg')[0];
              modelToRemove = _this.iconsCollection.collection.length === 1 && !_this.isValidCollection() ? _this.iconsCollection.collection.at(0) : null;
              _this.iconsCollection.collection.add({
                shape: data.result,
                name: name,
                hash: helpers.generateHash(),
                isValid: true
              });
              return modelToRemove != null ? modelToRemove.destroy() : void 0;
            });
          },
          error: function(e, data) {},
          progressall: function(e, data) {
            var progress;

            progress = parseInt(data.loaded / data.total * 100, 10);
            App.$loadingLine.css({
              'width': "" + progress + "%"
            });
            return progress === 100 && _this.finishFilesLoading();
          }
        });
      };

      EditCollectionView.prototype.finishFilesLoading = function() {
        var _this = this;

        this.checkIfValidCollection();
        return _.defer(function() {
          return App.$loadingLine.fadeOut(1000, function() {
            App.$loadingLine.width("0%");
            return App.$loadingLine.show();
          });
        });
      };

      return EditCollectionView;

    })(ProtoView);
    return EditCollectionView;
  });

}).call(this);