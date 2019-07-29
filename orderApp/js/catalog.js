/* global Product, Cart */

'use strict';


function showAnimation() {
    //not really an animation yet ¯\_(ツ)_/¯
    var elGroup = document.createElement("div");
    elGroup.id = "confirm-submit--container";
    
   var animeWrapper =  elGroup.appendChild(document.createElement("div"))
   animeWrapper.id = "animation-wrapper";
   animeWrapper.textContent = "Success! Added Item to Cart!";
   
   
    document.getElementsByTagName("body")[0].appendChild(elGroup);
    setTimeout(function(){
       document.getElementById("confirm-submit--container").remove();
   
   }, 2000);
  
    
}

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
      var option = document.createElement("option");
      option.setAttribute("value", Product.allProducts[i].name);
      option.textContent = Product.allProducts[i].name;
      selectElement.appendChild(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  saveCartToLocalStorage();
  updateCounter();
  updateCartPreview();
 
}
function clearInputs() {
  document.getElementById("items").selectedIndex = 0;
  document.getElementById("quantity").value = null;
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, create a new Cart item instance
  var item = document.getElementById("items").value;
  var quantity = document.getElementById("quantity").value;
  new Cart(item, quantity);
  
}

// TODO: Save the contents of the cart to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem("cartItemList", JSON.stringify(Cart.itemList));
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
    var cartCount = Cart.itemList.length;
    document.getElementById("itemCount").innerHTML = "-" + cartCount;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var item = document.getElementById("items").value;
  var quantity = document.getElementById("quantity").value;
  var cartPreviewEl = document.getElementById("cartContents");
  var itemEl = document.createElement("div");
  
  itemEl.textContent = ` ${item} - ${quantity}`;
  cartPreviewEl.appendChild(itemEl);
  
  clearInputs();
  showAnimation();
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
