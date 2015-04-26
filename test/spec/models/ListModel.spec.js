/* global define, describe, it, expect */

'use strict';

define(function(require) {

    var ListModel = require('models/ListModel');

    describe('ListModel', function() {

        var listItems = ['list item 1', 'list item 2', 'list item 3'];

        it('should return 0 length for empty list', function() {

            // Arrange
            var listModel = new ListModel([]);

            // Assert
            expect(listModel.length).to.be.equal(0);
        });

        it('should return the correct length for non empty list', function() {

            // Arrange
            var listModel = new ListModel(['list item 1', 'list item 2']);

            // Assert
            expect(listModel.length).to.be.equal(2);
        });

        it('should append the item to the list on adding', function() {

            // Arrange
            var expectedListItem = 'list item 2',
                listModel = new ListModel(['list item 1']);

            // Act
            listModel.add(expectedListItem);

            // Assert
            expect(listModel.length).to.be.equal(2);
            expect(listModel.at(1)).to.be.equal(expectedListItem);
        });

        it('should publish a message after adding an item', function() {

            // Arrange
            var publishedWith = null,
                expectedListItem = 'list item 2',
                listModel = new ListModel(['list item 1']);

            listModel.onAdd(function(itemName) {
                publishedWith = itemName;
            });

            // Act
            listModel.add(expectedListItem);

            // Assert
            expect(publishedWith).to.be.equal(expectedListItem);
        });

        it('should not touch the original array argument', function() {

            // Arrange
            var listModel = new ListModel(listItems);

            // Act
            listModel.add('whatever item');

            // Assert
            expect(listItems.length).to.be.equal(3);
        });

        it('should remove item from the list by index', function() {

            // Arrange
            var listModel = new ListModel(listItems);

            // Act
            listModel.removeByIndex(1);

            // Assert
            expect(listModel.length).to.be.equal(2);
            expect(listModel.at(0)).to.be.equal('list item 1');
            expect(listModel.at(1)).to.be.equal('list item 3');
        });

        it('should not remove item with non existing index', function() {

            // Arrange
            var listModel = new ListModel(listItems);

            // Act
            listModel.removeByIndex(4);

            // Assert
            expect(listModel.length).to.be.equal(3);
            expect(listModel.at(0)).to.be.equal('list item 1');
            expect(listModel.at(1)).to.be.equal('list item 2');
            expect(listModel.at(2)).to.be.equal('list item 3');
        });

        it('should publish a message after adding an item', function() {

            // Arrange
            var removedIndex = null,
                listModel = new ListModel(listItems);

            listModel.onRemove(function(index) {
                removedIndex = index;
            });

            // Act
            listModel.removeByIndex(1);

            // Assert
            expect(removedIndex).to.be.equal(1);
        });

        it('should provide an each method to iterate over it\'s elements', function() {

            // Arrange
            var expectedCallbackIndexes = [],
                expectedCallbackParameters = [],
                listModel = new ListModel(listItems);

            // Act
            listModel.each(function(itemName, index) {
                expectedCallbackParameters.push(itemName);
                expectedCallbackIndexes.push(index);
            });

            // Assert
            expect(expectedCallbackParameters.length).to.be.equal(3);
            expect(expectedCallbackParameters).to.be.eql(listItems);
            expect(expectedCallbackIndexes).to.be.eql([0,1,2]);
        });
    });
});