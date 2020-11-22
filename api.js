// export async function searchCompanies(searchValue) {
//     const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`);
//     const data = await response.json();
//     return data;
//   }

// const getDataResult = async () => {
export async function getDataResult(inputSearch) {

    console.log("getDataResult invoked");
    // let loader = document.getElementById('loaderID');
    // let btnSearch = document.getElementById('btnSearchID');
    // showSpinner(loader)
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ`)
        console.log(res)
        const searchData = await res.json();
        console.log(searchData)
        await getDataResult2(searchData);
        return searchData;
    } catch (error) {
        console.log('error!');
    }
}

export async function getDataResult2(searchData) {
    // getDataResult2 = async () => {
    console.log('getDataResult2 invoked');
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
        // return (arrayOfImages, arrayOfChanges, arrayOfSymbols, arrayOfPrice)
    } catch (error) { console.log('error!'); }

}
export default getDataResult();