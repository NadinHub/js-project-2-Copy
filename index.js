
const btnSearch = document.getElementById('btnSearchID')
const inputSearch = document.getElementById('inputID')

//{symbol: "ASRVP", name: "Ameriserv Financial Capital Trust I PFD A GTD 8.45", currency: "USD", stockExchange: "NasdaqGM", exchangeShortName: "NASDAQ"}

function showSpinner(loaderParameter) {
    loaderParameter.classList.remove('loader-opacity-0');
    loaderParameter.classList.add('loader');
}
function removeSpiner(loaderParameter) {
    loaderParameter.classList.remove('loader');
    loaderParameter.classList.add('loader-opacity-0');
}
resultList = document.getElementById('result-list');
let stockName;

function showTheList(dataParam) { // show all results (from server) on the page
    for (let i = 0; i < dataParam.length; i++) {
        newItem = document.createElement('li');
        newItem.classList.add('list-group-item', 'pb-4', 'pl-0');
        resultList.appendChild(newItem);
        // let myDate = new Date(dataParam[i].createdDate); //transform dates
        newItem.innerHTML = `<a href="https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${dataParam[i].symbol}"><b>${dataParam[i].name}</b> (${dataParam[i].symbol})</a>  <small class="text-secondary">- ${dataParam[i].exchangeShortName}</small> <br> <small class="text-secondary">Currency: ${dataParam[i].currency}. StockExchange: ${dataParam[i].stockExchange}.</small>`;
    }
}

async function getDataResult() { // ----------- Get data from API ----
    let loader = document.getElementById('loaderID');
    stockName = inputSearch.value;
    showSpinner(loader)
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${stockName}&limit=10&exchange=NASDAQ`)
        if (res.ok) {
            let data = await res.json()
            console.log(data);
            removeSpiner(loader);
            showTheList(data); // show all results (from server)    
        } else {
            console.log("Not Successful")
        }
    } catch (error) {
        console.log('error!');
        // console.error('ERROR');
        // showAlert("Error happens");
        // loader.classList.remove('loader');
        // loader.classList.add('loader-opacity-0');
    }
}
// getDataResult()
btnSearch.addEventListener('click', function () {
    // resultList.innerHTML = ""; //clear the list on the page
    getDataResult()
})