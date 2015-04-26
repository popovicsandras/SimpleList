/* global define */

'use strict';

define(function(require) {

    var $ = require('jquery'),
        _ = require('underscore'),
        listTemplate = require('text!templates/list.html'),
        listItemTemplate = require('text!templates/listItem.html'),
        jupiter = require('jupiter');

    var listView = function(options) {
        this._setContainer(options);
        this.list = options.list;
        this.itemTemplate = _.template(listItemTemplate);
        this.listTemplate = _.template(listTemplate);
        this.pubsub = jupiter('deleteItem');

        this._bindListeners();
    };

    listView.prototype = {

        _bindListeners: function() {
            this.$container
                .off('click')
                .on('click', 'button.deleteItem', _.bind(this._removeItem, this));

            this.list.onAdd(_.bind(this.render, this));
            this.list.onRemove(_.bind(this.render, this));
        },

        _setContainer: function(options) {
            this.$container = $(options && options.container);

            if (!this.$container.length) {
                throw new Error('Container element for list doesn\'t exist.');
            }
        },

        render: function() {
            this.$container.empty();
            this.$listHtml = $(this.listTemplate({listLength: this.list.length}));
            this._createHtmlList();
            this.$container.append(this.$listHtml);
        },

        onRemoveClick: function(callback) {
            this.pubsub.sub(callback);
        },

        off: function() {
            this.pubsub.unsub();
        },

        _removeItem: function(e) {
            var itemIndex = $(e.currentTarget).data('item-index');
            this.pubsub.pub(itemIndex);
        },

        _createHtmlList: function() {
            this.$ul = this.$listHtml.find('ul.list-items');

            if (this.list.length) {
                this.list.each(this._appendListItemToList, this);
            }
        },

        _appendListItemToList: function(itemName, itemIndex) {
            this.$ul.append(this.itemTemplate({itemName: itemName, itemIndex: itemIndex}));
        }
    };

    return listView;
});