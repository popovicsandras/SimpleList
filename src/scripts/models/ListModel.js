/* global define */

'use strict';

define(function(require) {

    var jupiter = require('jupiter');

    var listModel = function(listItems) {
        this.listItems = listItems && Array.prototype.slice.call(listItems) || [];
        this.pubsub = jupiter(['itemAdded', 'itemRemoved']);
    };

    listModel.prototype = {
        get length() {
            return this.listItems.length;
        },

        add: function(item) {
            this.listItems.push(item);
            this.pubsub.itemAdded.pub(item);
        },

        at: function(index) {
            return this.listItems[index];
        },

        removeByIndex: function(index) {
            this.listItems.splice(index, 1);
            this.pubsub.itemRemoved.pub(index);
        },

        each: function(callback, context) {
            for (var i=0; i<this.listItems.length; i++) {
                var item = this.listItems[i];
                callback.call(context, item, i);
            }
        },

        onAdd: function(callback) {
            this.pubsub.itemAdded.sub(callback);
        },

        onRemove: function(callback) {
            this.pubsub.itemRemoved.sub(callback);
        },

        off: function() {
            this.pubsub.itemAdded.unsub();
            this.pubsub.itemRemoved.unsub();
        }
    };

    return listModel;
});