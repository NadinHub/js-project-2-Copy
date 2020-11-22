console.log('js searchResult.js active')


// class SearchResult {
//     constructor(htmlElement) {
//         this.ul = document.createElement('ul');
//         htmlElement.appendChild(this.ul);
//     }

//     renderResults(companies) {
//         const listOfLis = companies.map(company => {
//             return `<li>${company.name}</li>`;
//         });
//         this.ul.innerHTML = listOfLis.join("");
//     }

// }

export default class SearchResult {
    constructor(resultList) {
        this.resultList = resultList; // argumetn we pass on index.html
        // this.resultList = document.getElementById('result-list'); //moved to index.html as an argument
    }

    //{symbol: "ASRVP", name: "Ameriserv Financial Capital Trust I PFD A GTD 8.45", currency: "USD", stockExchange: "NasdaqGM", exchangeShortName: "NASDAQ"}


    showList(dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice) {
        console.log(dataParam)
        // removeSpiner(loader);


        // const resultList = document.getElementById('result-list');
        this.resultList.innerHTML = "";
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
        this.resultList.innerHTML = content;
    }


    changeColor(arrayOfChanges) {
        let priceChanges = document.querySelectorAll(".price-changes");
        for (let i = 0; i < arrayOfChanges.length; i++) {
            if (arrayOfChanges[i] < 0) {
                priceChanges[i].classList.add('text-danger');
            }
            else { priceChanges[i].classList.add('text-success') }
        }
    }


}

// export default SearchResult;

