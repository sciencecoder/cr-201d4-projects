'use strict';

var productNames = ['bag', 'banana', 'boots', 'pen', 'shark',
 'sweep', 'unicorn', "breakfast", "bubblegum", "cthulhu", "dog-duck", "chair"];
var allProducts = [];
var lastShown = [];
var totalClicks = 0;


function displayChart(sourceArr) {
    var labelArr = [];
    var clickArr = [];
    document.getElementById("chartContainer").innerHTML = `<canvas id="myChart" width="400px" height="400px" class="hidden"></canvas>`;
    
    var ctx = document.getElementById('myChart').getContext('2d');

    for (var i = 0; i < sourceArr.length; i++) {
        //Note to self Arrays have order, so order is correct for both arrays.
        //Therefore, the labels and clicks arrays are correctly corelated by array index.
        labelArr.push(sourceArr[i].name);
        clickArr.push(sourceArr[i].clicks);
    }
    
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelArr,
        datasets: [{
            label: '# of Votes',
            data: clickArr,
            backgroundColor: [
                'rgba(255, 102, 0, 0.3)',
                'rgba(76, 175, 80, 0.3)'
            ],
            borderColor: [
                'rgba(255, 102, 0, 1.0)',
                'rgba(76, 175, 80, 1.0)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMax: totalClicks,
                    beginAtZero: true,
                    userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label;
                     }

                 },
                }
            }]
        }
    }
});

//chart.canvas.parentNode.style.height = '128px';
//chart.canvas.parentNode.style.width = '128px';
}

function Product(name){
  this.name = name;
  this.imageUrl = './images/' + name + '.jpg'
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
};

function createProducts() {
  for(var i = 0; i < productNames.length; i++){
    new Product(productNames[i]);
  }
  console.table(allProducts);
};

function randomProduct(){
  return Math.floor(Math.random() * allProducts.length);
}

function render() {
  console.log("Render")
  var productsSection = document.getElementById('products');
  console.log(productsSection)
  productsSection.innerHTML = '';


  var randomProducts = [];
  randomProducts.push(randomProduct());
  randomProducts.push(randomProduct());
  while(randomProducts[0] === randomProducts[1] || lastShown.includes(randomProducts[1])){
   randomProducts[1] = randomProduct();
  }
  randomProducts.push(randomProduct());
  while(randomProducts[2] === randomProducts[0] 
  || randomProducts[2] === randomProducts[1] 
  || lastShown.includes(randomProducts[2])){
   randomProducts[2] = randomProduct();
  }
 //insure the alst 3 shown products are not repeated
 

  lastShown = randomProducts;
  console.log("Random products:", randomProducts);
  
  for(var i = 0; i < 3; i++){
      
      
    allProducts[randomProducts[i]].views++;
    var imgC = document.createElement("div")
    imgC.className = "img-wrapper";
    
    var img = document.createElement('img');
    img.setAttribute('src', allProducts[randomProducts[i]].imageUrl)
    img.setAttribute('data-name', allProducts[randomProducts[i]].name);
    img.addEventListener('click', handleVote);
    imgC.appendChild(img);
    productsSection.appendChild(imgC);
    console.log(productsSection)
  };
};

function handleVote(event) {
  var productName = event.target.dataset.name;
  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === productName){
      allProducts[i].clicks++;
      totalClicks++;
      render();
    }
  }
  if(totalClicks === 5){
    var imgs = document.getElementsByTagName('img');
    for(var i = 0; i < imgs.length; i++){
      imgs[i].removeEventListener('click', handleVote);
    }
    document.getElementById("products").innerHTML = "";
    displayResults();
  }
//  console.table(allProducts);
//  console.log('Total Clicks', totalClicks);
//  
}
function reset() {
    //Re initialize all data, remove all images.
    //Then, reinitialize all the product data, and generate the images
    
    //clear everything
    localStorage.removeItem("productList");
    allProducts = [];
    lastShown = [];
    totalClicks = 0;
    document.getElementById("products").innerHTML = "";
    document.getElementById("myChart").innerHTML = "";
    document.getElementById("chartContainer").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    //Reinitialize
    createProducts();
    render();
}
function displayResults(){
    //Sidebar list of results
  var results = document.getElementById('results');
  var ul = document.createElement('ul');
  for(var i = 0; i < allProducts.length; i++){
    var product = allProducts[i];
    var li = document.createElement('li');
    li.textContent = product.name + ' has ' + product.clicks + ' votes.';
    ul.appendChild(li);
  }
  results.appendChild(ul);
  
  //Results as chart
 
  displayChart(allProducts);
  localStorage["productList"] = JSON.stringify(allProducts);
}

if(localStorage["productList"]) {
    displayChart(JSON.parse(localStorage["productList"]));
}
else {
  createProducts();
  render();
}

document.getElementById("reset-btn").addEventListener(("click"), reset);
