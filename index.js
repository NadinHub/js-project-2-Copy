
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
;
let arrayOfImages = [];

function showTheList(dataParam) { // show all results (from server) on the page
    for (let i = 0; i < dataParam.length; i++) {

        newItem = document.createElement('li');
        newItem.classList.add('list-group-item', 'pb-4', 'pl-0');
        resultList.appendChild(newItem);
        // let myDate = new Date(dataParam[i].createdDate); //transform dates
        newItem.innerHTML = `<img class="img-icon" src="${arrayOfImages[i]}"></img><a href="/company.html?symbol=${dataParam[i].symbol}"><b>${dataParam[i].name}</b> (${dataParam[i].symbol})</a>  <small class="text-secondary">- ${dataParam[i].exchangeShortName}</small> <br> <small class="text-secondary">Currency: ${dataParam[i].currency}. StockExchange: ${dataParam[i].stockExchange}.</small>`;
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
            let arrayOfSymbols = [];
            for (let i = 0; i < data.length; i++) {
                dataSymbol = await data[i].symbol;
                arrayOfSymbols.push(dataSymbol);
            }
            console.log(arrayOfSymbols);
            console.log(data);
            await getDataResult2(arrayOfSymbols)
            removeSpiner(loader);
            showTheList(data); // show all results (from server)    
        } else {
            console.log("Not Successful")
        }
    } catch (error) {
        console.log('error!');
    }
}
// getDataResult2()
async function getDataResult2(arrayOfSymbols) {
    // showSpinner(companyLoader);
    // await getDataResult();
    // stockName = inputSearch.value;
    try {
        for (let i = 0; i < arrayOfSymbols.length; i++) {
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${arrayOfSymbols[i]}`)
            // console.log(response)
            let data = await response.json();
            let dataImage = await data[0].image;
            arrayOfImages.push(dataImage);
            // console.log(data[0].image);
        }
        console.log(arrayOfImages[1]);
        // console.log(data.image);
    } catch (error) { console.log('error!'); }
}
// getDataResult()
btnSearch.addEventListener('click', function () {
    // resultList.innerHTML = ""; //clear the list on the page
    getDataResult()

})