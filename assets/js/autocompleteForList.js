const select = document.getElementById("myInput");
//let testGetValue;
//testGetValue = document.getElementById("myInput");
const searchBarBtn = document.getElementById("searchBtn");
const showWeather = document.getElementById("showWeatherInfo");

const urlAPIForCities = "https://countriesnow.space/api/v0.1/countries/population/cities";
let mylistsForCities = [];
let myListsForCountries = [];
let listForAll = [];

const asynchronousFunctionForCities = async function showWeatherDataForCities(){
  const responseForCities = await fetch(urlAPIForCities);
  var dataForCities = await responseForCities.json();
    for(let i=0; i <= dataForCities.data.length-1 ; i++){
      mylistsForCities.push(dataForCities.data[i].city);
    }
  console.log(mylistsForCities);
  return mylistsForCities;
}

const urlAPIForCountries = "https://restcountries.eu/rest/v2/all";
 const asynchronousFunctionForCountries = async function showWeatherDataForCountries(){
    const responseForCountries = await fetch(urlAPIForCountries);
    var data2 = await responseForCountries.json();
    for (let countryList of data2) {
      myListsForCountries.push(countryList.name);
    }
    console.log(myListsForCountries);
    return myListsForCountries;
}
const mainFunctionForConcatAllData = async () => {
  const resultForCities = await asynchronousFunctionForCities();
  const resultForCountries = await asynchronousFunctionForCountries();
  listForAll = resultForCities.concat(resultForCountries);
  autocomplete(document.getElementById("myInput"), listForAll);
}
mainFunctionForConcatAllData();   

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  //showData

  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", "8ce2c0aa26msh1bc7e28a0966945p1a0c1ejsnfe3b547760cf");


  document.getElementById("searchBtn").onclick = function(e) {
    e.preventDefault();
    showWeatherData("https://weatherapi-com.p.rapidapi.com/current.json?q=" + select.value , {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })};

  async function showWeatherData(url,requestOptionsForWeatherAPI){
    const response = await fetch(url,requestOptionsForWeatherAPI);
    var data = await response.json();
    console.log("gggggggggggggggggggggggggg");
    console.log( select.value + "gggggggggggggggggggggggggg");
    let htmlForWeather = '';
    htmlForWeather += `<div style="text-align: center;" id="demo">`;
    htmlForWeather += `<p id="showWeatherInfo">hiii</p>`;
    htmlForWeather += `<p>${data.location.country}/${data.location.name}</p>`;
    htmlForWeather += `<p>${data.current.condition.text}</p>`;
    htmlForWeather += `<p>${data.current.temp_c}<sup>°C</sup></p>`;
    showWeather.innerHTML = htmlForWeather;  
}
//showWeatherData();
