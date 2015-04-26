/* global define, describe, it, expect, beforeEach, afterEach */

'use strict';

define(function(require) {

    var app = require('app'),
        $ = require('jquery'),
        LocalStorageDecorator = require('decorators/LocalStorage');

    describe('Application', function() {

        var $appContainer;

        beforeEach(function(){
            localStorage.setItem(LocalStorageDecorator.prototype.STORAGEKEY, JSON.stringify([]));
            $appContainer = $('<div id="app"></div>');
            $('#fixtures').append($appContainer);
        });

        afterEach(function() {
            app.stop();
            $('#fixtures').empty();
        });

        it('should create the list view', function() {

            // Assert
            expect($appContainer.find('ul').length).to.be.equal(0);

            // Act
            app.start();

            // Assert
            expect($appContainer.find('ul').length).to.be.equal(1);
        });

        it('should add the new item to the list on clicking the add button', function() {

            // Arrange
            var expectedItemName = 'Visiting Floston Paradise';
            app.start();

            // Act
            $appContainer.find('.itemName').val(expectedItemName);
            $appContainer.find('.addItem').trigger('click');

            // Assert
            expect($appContainer.find('.list ul>li').length).to.be.equal(1);
        });

        it('should remove the previously added item from the list on clicking the delete button', function() {

            // Arrange
            app.start();

            // Act
            $appContainer.find('.itemName').val('Visiting Floston Paradise');
            $appContainer.find('.addItem').trigger('click');

            $appContainer.find('.itemName').val('Save the Earth');
            $appContainer.find('.addItem').trigger('click');

            $appContainer.find('.list ul>li:eq(0) button.deleteItem').trigger('click');

            // Assert
            expect($appContainer.find('.list ul>li').length).to.be.equal(1);
        });

        it('should reset the input field after adding the item', function() {

            // Arrange
            var $itemNameInput,
                expectedItemName = 'Visiting Floston Paradise';

            app.start();
            $itemNameInput = $appContainer.find('.itemName');

            // Act
            $itemNameInput.val(expectedItemName);
            $appContainer.find('.addItem').trigger('click');

            // Assert
            expect($itemNameInput.val()).to.be.equal('');
        });

        it('should not add the item if input field is empty', function() {

            // Arrange
            app.start();

            // Act
            $appContainer.find('.itemName').val('');
            $appContainer.find('.addItem').trigger('click');

            // Assert
            expect($appContainer.find('.list>ul>li').length).to.be.equal(0);
        });
    });
});