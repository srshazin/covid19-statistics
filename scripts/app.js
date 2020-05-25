/*var btn = document.querySelector("body")
btn.addEventListener("load", loadData)*/


function loadData() {
    //xhr request
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.covid19api.com/summary")
    xhr.onprogress = function(){
        console.log("Loading Data")
    }
    xhr.onload = function() {
        if(this.status == 200) {
            document.getElementById("spinner").style.display = "none"
            var data = JSON.parse(this.responseText)
            //bangladesh
            document.getElementById("cases").innerHTML = data.Countries[18].TotalConfirmed
            document.getElementById("death").innerHTML = data.Countries[18].TotalDeaths
            document.getElementById("rec").innerHTML = data.Countries[18].TotalRecovered

            //Worldwide
            document.getElementById("w-cases").innerHTML = data.Global.TotalConfirmed
            document.getElementById("w-death").innerHTML = data.Global.TotalDeaths
            document.getElementById("w-rec").innerHTML = data.Global.TotalRecovered
            var mainData = document.getElementById("dataSet_List")
            let fatchedData;
            //All country
            for (var i = 0; i < data.Countries.length; i++) {
                fatchedData += `
                <tr>
                    <td>${data.Countries[i].Country}</td>
                    <td>${data.Countries[i].TotalConfirmed}</td>
                    <td>${data.Countries[i].NewConfirmed}</td>
                    <td>${data.Countries[i].TotalDeaths}</td>
                    <td>${data.Countries[i].NewDeaths}</td>
                    <td>${data.Countries[i].TotalRecovered}</td>
                    <td>${data.Countries[i].NewRecovered}</td>
                    <td>${data.Countries[i].Date}</td>
                </tr>
                `
            }
            mainData.innerHTML = mainData.innerHTML + fatchedData
            let searchBtn = document.getElementById("s_btn")
            let searchBox = document.getElementById("search")
            searchBtn.addEventListener("click", function() {
                let value = searchBox.value
                var filteredArray = data.Countries.filter(key => key.Country.toLowerCase() == value.toLowerCase())
                console.log(filteredArray)
                if (filteredArray.length < 1) {
                    document.getElementById("blueSearch").style.display = "block"
                    
                    blueSearch.innerHTML = `<span id="cross">X</span><h3>Country,  <font color="red">${value}</font> Not Found</h3>`
                    var cross = document.getElementById("cross")
                    cross.addEventListener("click",function() {
                        searchBox.value = ""
                        document.getElementById("blueSearch").style.display = "none"
                    })
                } else {
                   
                    document.getElementById("blueSearch").style.display = "block"
                    let blueSearch = document.getElementById("blueSearch")
                    blueSearch.innerHTML =`
                    <span id="cross">X</span>
                    <div class="key">Country : <font color="green">${filteredArray[0].Country}</font></div>
                    <div class="key">Total Confirmed: <font color="red">${filteredArray[0].TotalConfirmed}</font></div>
                    <div class="key">New Confirmed: <font color="purple">${filteredArray[0].NewConfirmed}</font></div>
                    <div class="key">Total Deaths: <font color="blue">${filteredArray[0].TotalDeaths}</font></div>
                    <div class="key">New Deaths: <font color="tomato">${filteredArray[0].NewDeaths}</font></div>
                    <div class="key">Total Recovered: <font color="black">${filteredArray[0].TotalRecovered}</font></div>
                    <div class="key">New Recovered: <font color="orange">${filteredArray[0].NewRecovered}</font></div>
                    `
                    var cross = document.getElementById("cross")
                    cross.addEventListener("click",function() {
                        searchBox.value = ""
                        document.getElementById("blueSearch").style.display = "none"
                    })
                }

            })
            
        }
    }
    xhr.send()
}

loadData()