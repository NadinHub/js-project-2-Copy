
const btnSearch = document.getElementById('btnSearchID');
const inputSearch = document.getElementById('inputID');
const emptybox = document.getElementById('emptybox');
resultList = document.getElementById('result-list');

//{symbol: "ASRVP", name: "Ameriserv Financial Capital Trust I PFD A GTD 8.45", currency: "USD", stockExchange: "NasdaqGM", exchangeShortName: "NASDAQ"}

function showSpinner(loaderParameter) {
    loaderParameter.classList.remove('loader-opacity-0');
    loaderParameter.classList.add('loader');
}
function removeSpiner(loaderParameter) {
    loaderParameter.classList.remove('loader');
    loaderParameter.classList.add('loader-opacity-0');
}
let stockName;


function showTheList(dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice) { 
    // show all results (from server) on the page
    for (let i = 0; i < dataParam.length; i++) {
        let newItem = document.createElement('li');
        newItem.classList.add('list-group-item', 'pb-4', 'pl-0');
        resultList.appendChild(newItem);
        newItem.innerHTML = `<div class="stock-list d-flex">
        <img class="img-icon px-2" src="${arrayOfImages[i]}">
        </img>
        <div>
        <a href="/company.html?symbol=${dataParam[i].symbol}"><b>${dataParam[i].name}</b> (${dataParam[i].symbol})</a>
        <span> ${arrayOfPrice[i]} $ </span>
        <span class="price-changes" p-2"> (${arrayOfChanges[i]}%) </span>
        <small class="text-secondary">- ${dataParam[i].exchangeShortName}</small> <br> 
        <small class="text-secondary">Currency: ${dataParam[i].currency}. StockExchange: ${dataParam[i].stockExchange}.</small>
        </div>
        </div>`;
    }

}

function changeColor(arrayOfChanges) {
    let priceChanges = document.querySelectorAll(".price-changes");
    console.log(priceChanges[0])
    for (let i = 0; i < arrayOfChanges.length; i++) {
        if (arrayOfChanges[i] < 0) {
            priceChanges[i].classList.add('text-danger');
        }
        else { priceChanges[i].classList.add('text-success') };
    }
}

async function getDataResult() { // ----------- Get searchData from API ----
    let loader = document.getElementById('loaderID');
    stockName = inputSearch.value;
    showSpinner(loader)
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${stockName}&limit=10&exchange=NASDAQ`)
        if (res.ok) {
            let searchData = await res.json()
            await getDataResult2(searchData)
            removeSpiner(loader);
        } else {
            console.log("Not Successful")
        }
    } catch (error) {
        console.log('error!');
    }
}
async function getDataResult2(searchData) {
    arrayOfImages = [];
    arrayOfChanges = [];
    arrayOfSymbols = [];
    arrayOfPrice = [];

    try {
        for (let i = 0; i < searchData.length; i++) {
            let dataSymbol = await searchData[i].symbol;
            arrayOfSymbols.push(dataSymbol);
        }

        for (let i = 0; i < searchData.length; i++) {
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${arrayOfSymbols[i]}`)
            let companyData = await response.json();
            let dataImage = await companyData[0].image;
            arrayOfImages.push(dataImage);
            let priceChanges = await companyData[0].changes;
            arrayOfChanges.push(priceChanges);
            let price = await companyData[0].price;
            arrayOfPrice.push(price);
        }
        // show all results (from server)
        showTheList(searchData, arrayOfImages, arrayOfChanges, arrayOfPrice); 
        changeColor(arrayOfChanges);

    } catch (error) { console.log('error!'); }
}
btnSearch.addEventListener('click', function () {
    getDataResult()

})