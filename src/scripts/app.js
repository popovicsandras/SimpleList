/* global define */

'use strict';

define(function(require) {

    var $ = require('jquery'),
        appTemplate = require('text!templates/app.html'),
        ListView = require('views/ListView'),
        ListModel = require('models/ListModel'),
        LocalStorageDecorator = require('decorators/LocalStorage'),
        _ = require('underscore');

    return {
        start: function() {
            this._loadTemplate();
            this._createListModel();
            this._createListView();
            this._bindListeners();
        },

        stop: function() {
            this.listView.off();
            this.listModel.off();
            this.localStorage.undecorate();
        },

        _loadTemplate: function() {
            this.$app = $('#app');
            this.$app.append(appTemplate);
            this.$addItemButton = this.$app.find('.addItem');
            this.$itemNameInput = this.$app.find('.itemName');
        },

        _createListModel: function() {
            this.listModel = new ListModel([]);
            this.localStorage = new LocalStorageDecorator(this.listModel);
            this.localStorage.decorate();
        },

        _createListView: function() {
            this.listView = new ListView({
                container: '#list',
                list: this.listModel
            });

            this.listView.render();
        },

        _bindListeners: function() {
            this.$addItemButton.off('click').on('click', _.bind(this._addNewItemToList, this));
            this.listView.onRemoveClick(_.bind(this._removeItemFromList, this));
        },

        _addNewItemToList: function() {
            var itemName = this.$itemNameInput.val();

            if (itemName) {
                this.listModel.add(itemName);
                this._resetItemNameInput();
            }
        },

        _removeItemFromList: function(index) {
            this.listModel.removeByIndex(index);
        },

        _resetItemNameInput: function() {
            this.$itemNameInput.val('');
        }
    };
});