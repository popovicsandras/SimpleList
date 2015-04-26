/* global define */

'use strict';

define(function(require) {

    var _ = require('underscore');

    var LocalStorageDecorator = function(listModel) {
        this.model = listModel;
        this._saveOriginalMethods();
    };

    LocalStorageDecorator.prototype = {

        STORAGEKEY: 'simpleList',

        decorate: function() {
            this.model.add = _.bind(this.add, this);
            this.model.removeByIndex = _.bind(this.removeByIndex, this);
            this._load();
        },

        undecorate: function() {
            this.model.add = this.modelMethods.add;
            this.model.removeByIndex = this.modelMethods.removeByIndex;
        },

        add: function() {
            this.modelMethods.add.apply(this.model, arguments);
            this._store();
        },

        removeByIndex: function() {
            this.modelMethods.removeByIndex.apply(this.model, arguments);
            this._store();
        },

        _store: function() {
            var data = JSON.stringify(this.model.listItems);
            localStorage.setItem(this.STORAGEKEY, data);
        },

        _load: function() {
            var data = JSON.parse(localStorage.getItem(this.STORAGEKEY));
            this.model.listItems = data || [];
        },

        _saveOriginalMethods: function() {
            this.modelMethods = {
                add: this.model.add,
                removeByIndex: this.model.removeByIndex
            };
        }
    };

    return LocalStorageDecorator;
});