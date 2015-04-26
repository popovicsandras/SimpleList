/* global define, describe, it, expect, beforeEach, afterEach */

'use strict';

define(function(require) {

    var ListView = require('views/ListView'),
        ListModel = require('models/ListModel'),
        $ = require('jquery');

    describe('ListView', function() {

        var $listContainer,
            listItems;

        beforeEach(function(){
            $listContainer = $('<div id="list"></div>');
            listItems = new ListModel(['list item 1', 'list item 2']);
            $('#fixtures').append($listContainer);

        });

        afterEach(function() {
            $('#fixtures').empty();
        });

        it('should render itself into the given dom element', function() {

            // Arrange
            var listView = new ListView({
                container: '#list',
                list: listItems
            });

            // Act
            listView.render();

            // Assert
            expect($listContainer.find('ul.list-items').length).to.be.equal(1);
        });

        it('should throw exception if given container doesn\'t exist', function() {

            // Act
            var render = function() {
                new ListView({
                    container: '#non-existing-container',
                    list: listItems
                });
            };

            // Assert
            expect(render).to.throw(Error, 'Container element for list doesn\'t exist.');
        });

        it('should render the given list into items', function() {

            // Arrange
            var listView = new ListView({
                container: '#list',
                list: listItems
            });

            // Act
            listView.render();

            // Assert
            expect($listContainer.find('ul.list-items>li').length).to.be.equal(2);
            expect($listContainer.find('ul.list-items>li:eq(0)').text()).to.contain('list item 1');
            expect($listContainer.find('ul.list-items>li:eq(1)').text()).to.contain('list item 2');
        });

        it('should clean the container before every render', function() {

            // Arrange
            var listView = new ListView({
                container: '#list',
                list: listItems
            });

            // Act
            listView.render();
            listView.render();

            // Assert
            expect($listContainer.find('ul.list-items>li').length).to.be.equal(2);
        });

        it('should invoke the given callback on removing the item', function() {

            // Arrange
            var indexToRemove = null,
                listView = new ListView({
                container: '#list',
                list: listItems
            });
            listView.render();
            listView.onRemoveClick(function(index) {
                indexToRemove = index;
            });

            // Act
            var secondListItemDeleteButton = $listContainer.find('ul.list-items>li:eq(1) button.deleteItem');
            secondListItemDeleteButton.trigger('click');

            // Assert
            expect(indexToRemove).to.be.equal(1);
        });
    });
});