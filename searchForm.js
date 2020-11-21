console.log('js searchForm.js active');

import { getDataResult } from "/api.js";

// class SearchForm {
//     constructor(htmlElement) {
        // this.render(htmlElement);
//     }

//     render(htmlElement) {
//         // -------  create input and button on index.html ---
//         const form = document.createElement('form');

//         this.inputText = document.createElement('input');
//         this.inputText.type = 'text';

//         const button = document.createElement('button');
//         button.type = 'submit';
//         button.innerText = "Search";

//         form.appendChild(this.inputText);
//         form.appendChild(button);
//         // ------ End create input and button --------

//         let debounceTimeout;
//         this.inputText.addEventListener('keyup', () => {
//             if (debounceTimeout) {
//                 clearTimeout(debounceTimeout);
//             }
//             debounceTimeout = setTimeout(() => {
//                 this.executeSearch();
//             }, 500);
//         });

//         form.addEventListener('submit', event => {
//             event.preventDefault();
//             this.executeSearch();
//         });

//         htmlElement.appendChild(form);
//     }

//     executeSearch() {
//         const searchValue = this.inputText.value;
//         searchCompanies(searchValue).then(companies => {
//             this.onSearchCallback(companies);
//         });

//     }

//     onSearch(callback) {
//         this.onSearchCallback = callback;
//     }
// }

// ---- My Verstion of SearchForm ----------
export default class SearchForm {

    constructor(inputSearch, btnSearch) {
        console.log('class SearchForm');
        this.inputSearch = inputSearch;
        this.btnSearch = btnSearch;
        this.render();

        // this.executeSearch = executeSearch;
    }
    // const inputSearch = document.getElementById('inputID'); // moved into index.html
    static showSpinner(loaderParameter) {
        loaderParameter.classList.remove('loader-opacity-0');
        loaderParameter.classList.add('loader');
    }

    static removeSpiner(loaderParameter) {
        loaderParameter.classList.remove('loader');
        loaderParameter.classList.add('loader-opacity-0');
    }

    // render(htmlElement) {
    // ----------- Get searchData from API. Use function Expresion and arrow function ----
    // getDataResult = async () => {
    //     // async function getDataResult() {



    //     try {
    //         const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ`)
    //         const searchData = await res.json();
    //         await getDataResult2(searchData);
    //         removeSpiner(loader);
    //     } catch (error) {
    //         console.log('error!');
    //     }
    // }
    executeSearch() {
        console.log('executeSearch invoked')
        let loader = document.getElementById('loaderID');

        this.showSpinner(loader);
        getDataResult(this.inputSearch.value)
            .then((dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice) => {
                this.onSearchCallback(dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice);
            });
    }
    render() {
        this.btnSearch = document.getElementById('btnSearchID');
        this.btnSearch.addEventListener('click', event =>  {
            console.log('clicked');
            event.preventDefault();
            this.executeSearch(); //why I use this here? executeSearch doesn't have this.
        });

    }

    // ----- This function adds additional information to the list with companies using another fetch
    // async function getDataResult2(searchData) {
    getDataResult2 = async () => {
        console.lof('getDataResult2 invoked');
        let arrayOfImages = [];
        let arrayOfChanges = [];
        let arrayOfSymbols = [];
        let arrayOfPrice = [];

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
            showList(searchData, arrayOfImages, arrayOfChanges, arrayOfPrice);
            changeColor(arrayOfChanges);
        } catch (error) { console.log('error!'); }

    }
    onSearch(callback) {
        this.onSearchCallback = callback;
    }
}
// executeSearch() {
//     const searchValue = this.inputText.value;
//     searchCompanies(searchValue).then(companies => {
//         this.onSearchCallback(companies);
//     });
// }
// executeSearch() {

//     console.log('executeSearch invoked')
//     getDataResult(this.inputSearch.value).then((dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice) => {
//         this.onSearchCallback(dataParam, arrayOfImages, arrayOfChanges, arrayOfPrice);
//     });
// }



// export default SearchForm;
