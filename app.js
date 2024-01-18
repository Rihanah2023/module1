
(function () {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var buyController = this;
  
      buyController.items = ShoppingListCheckOffService.getItemsToBuy();
  
      buyController.checkBought = function (itemIndex) {
        ShoppingListCheckOffService.checkBought(itemIndex);
      };
  
      buyController.getToBuyEmpty = function () {
        return ShoppingListCheckOffService.checkIfEmpty(this.items);
      };
  
    }
  
  
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtController = this;
  
      boughtController.items = ShoppingListCheckOffService.getItemsBought();
  
      boughtController.checkToBuy = function (itemIndex) {
        ShoppingListCheckOffService.checkToBuy(itemIndex);
      };
  
      boughtController.getBoughtEmpty = function () {
        return ShoppingListCheckOffService.checkIfEmpty(this.items);
      };
    }
  
  
    function ShoppingListCheckOffService() {
      var service = this;
  
      // Lists of shopping items
      var itemsToBuy = [{ name: "Cookies", quantity: 4 }, { name: "Gouda", quantity: 2 }, { name: "Spaghetti", quantity: 2 }, { name: "Pizza", quantity: 2 }, { name: "Creatine", quantity: 1 }];
      var itemsBought = [];
  
      service.checkBought = function (itemIndex) {
        // [0] is because splice returns an array, I only need an element
        let element = itemsToBuy.splice(itemIndex, 1)[0];
        itemsBought.push(element);
      };
  
      service.checkToBuy = function (itemIndex) {
        let element = itemsBought.splice(itemIndex, 1)[0];
        itemsToBuy.push(element);
      };
  
      service.checkIfEmpty = function (items){
        return items.length > 0;
      }
  
      service.getItemsToBuy = function () {
        return itemsToBuy;
      };
  
      service.getItemsBought = function () {
        return itemsBought;
      };
    }
  
  })();