const select = document.getElementById("myInput");
const searchBarBtn = document.getElementById("searchBtn");
const showWeather = document.getElementById("showWeatherInfo");

const urlAPIForCities = "https://countriesnow.space/api/v0.1/countries/population/cities";
const urlAPIForCountries = "https://restcountries.eu/rest/v2/all";
let myListsForCountries = [];
let mylistsForCities = [];
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
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV"); //element
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                console.log(inp.value);
                closeAllLists();
                //
                showWeatherData("https://weatherapi-com.p.rapidapi.com/current.json?q=" + select.value , {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
                });
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", "8ce2c0aa26msh1bc7e28a0966945p1a0c1ejsnfe3b547760cf");

  showWeatherDataForIran("https://weatherapi-com.p.rapidapi.com/current.json?q=Iran", {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
})

  async function showWeatherDataForIran(url,requestOptionsForWeatherAPI){
    const response2 = await fetch(url,requestOptionsForWeatherAPI);
    document.getElementById("showWeatherInfo").style.display = "block";
    var data = await response2.json();
    document.getElementById("loaderForShow").style.display = "none";
    
    console.log("uuuuuuuuuuuuuuuuuuu");
    let htmlForWeatherIran = '';
    htmlForWeatherIran += `<div style="text-align: center;" id="demo">`;
    htmlForWeatherIran += `<p id="showWeatherInfo"></p>`;
    htmlForWeatherIran += `<img class="size-img" src="https:${data.current.condition.icon}">`;
    htmlForWeatherIran += `<p class="text-label">${data.location.country}</p>`;
    htmlForWeatherIran += `<p class="text-label">${data.current.condition.text}</p>`;
    htmlForWeatherIran += `<p class="text-label text-weather-size">${data.current.temp_c}<sup>°C</sup></p>`;
    console.log(data.location.lon + "jjjjjjjjjj");
    console.log(data.current.temp_f + "jjjjjjjjjj");
    console.log(data + "hiiiiiii");
    console.log(select.value,'***********************&&&&&&&&&&&&&&&&&&&&&&&&&&')

    if(select.value === ""){
        showWeather.innerHTML = htmlForWeatherIran;

    }
}

  //document.getElementById("searchBtn").onclick = function(e) {
    //e.preventDefault();
    showWeatherData("https://weatherapi-com.p.rapidapi.com/current.json?q=" + select.value , {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
//};

  async function showWeatherData(url,requestOptionsForWeatherAPI){
    
    document.getElementById("loaderForShow").style.display = "block";
    document.getElementById("showWeatherInfo").style.display = "none";
    const response = await fetch(url,requestOptionsForWeatherAPI);
    document.getElementById("loaderForShow").style.display = "none";
    document.getElementById("showWeatherInfo").style.display = "block";
    var data = await response.json();
    console.log("gggggggggggggggggggggggggg");
    console.log( select.value + "gggggggggggggggggggggggggg");
    let htmlForWeather = '';
    htmlForWeather += `<div style="text-align: center;" id="demo">`;
    htmlForWeather += `<p id="showWeatherInfo"></p>`;
    htmlForWeather += `<img class="size-img" src="https:${data.current.condition.icon}">`;
    htmlForWeather += `<p>${data.location.country}/${data.location.name}</p>`;
    htmlForWeather += `<p>${data.current.condition.text}</p>`;
    htmlForWeather += `<p>${data.current.temp_c}<sup>°C</sup></p>`;
    showWeather.innerHTML = htmlForWeather;  
}
