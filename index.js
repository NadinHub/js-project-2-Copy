
const btnSearch = document.getElementById('btnSearchID');
const inputSearch = document.getElementById('inputID');
const emptybox = document.getElementById('emptybox');

//{symbol: "ASRVP", name: "Ameriserv Financial Capital Trust I PFD A GTD 8.45", currency: "USD", stockExchange: "NasdaqGM", exchangeShortName: "NASDAQ"}

function showSpinner(loaderParameter) {
    loaderParameter.classList.remove('loader-opacity-0');
    loaderParameter.classList.add('loader');
}
function removeSpiner(loaderParameter) {
    loaderParameter.classList.remove('loader');
    loaderParameter.classList.add('loader-opacity-0');
}

function showTheList(dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice) {
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = "";
    let content = "";
    // show all results (from server) on the page
    for (let i = 0; i < dataParam.length; i++) {

        // let newItem = document.createElement('li');
        // newItem.classList.add('list-group-item', 'pb-4', 'pl-0');
        // resultList.appendChild(newItem);
        // console.log(newItem);

        content += `<li class="list-group-item pb-4 pl-0">
        <div class="stock-list d-flex">
        <img class="img-icon px-2" src="${arrayOfImages[i]}">
        </img>
        <div>
        <a href="/company.html?symbol=${dataParam[i].symbol}"><b>${dataParam[i].name}</b> (${dataParam[i].symbol})</a>
        <span> ${arrayOfPrice[i]} $ </span>
        <span class="price-changes" p-2"> (${arrayOfChanges[i]}%) </span>
        <small class="text-secondary">- ${dataParam[i].exchangeShortName}</small> <br> 
        <small class="text-secondary">Currency: ${dataParam[i].currency}. StockExchange: ${dataParam[i].stockExchange}.</small>
        </div>
        </div></li>`;

    }
    resultList.innerHTML = content;
}

function changeColor(arrayOfChanges) {
    let priceChanges = document.querySelectorAll(".price-changes");
    for (let i = 0; i < arrayOfChanges.length; i++) {
        if (arrayOfChanges[i] < 0) {
            priceChanges[i].classList.add('text-danger');
        }
        else { priceChanges[i].classList.add('text-success') }
    }
}

// ----------- Get searchData from API. Use function Expresion and arrow function ----
const getDataResult = async () => {
    console.log("getDataResult invoked")
    let loader = document.getElementById('loaderID');
    showSpinner(loader)
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ`)
        if (res.ok) {
        
            const searchData = await res.json();

            // ------ Milestone 2_1 -------------
            // Filtering our input and return the result with matches ------ filter loop threw array and return array based on a condition
            // let matches = searchData.filter(company => {
            //     const regex = new RegExp(`^${searchText}`, 'gi');
            //     return company.name.match(regex) || company.symbol.match(regex);
            // });
            // console.log(matches);
            await getDataResult2(searchData);
            removeSpiner(loader);
        } else {
            console.log("Not Successful");
        }
    } catch (error) {
        console.log('error!');
    }
}

// ----- This function adds additional information to the list with companies using another fetch
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
        // Invoking functions which should be invoked afer we get data. 
        // They shows all results, using data recieved from server.
        showTheList(searchData, arrayOfImages, arrayOfChanges, arrayOfPrice);
        changeColor(arrayOfChanges);
    } catch (error) { console.log('error!'); }

}

btnSearch.addEventListener('click', () => getDataResult(inputSearch.value));