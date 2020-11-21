// export async function searchCompanies(searchValue) {
//     const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`);
//     const data = await response.json();
//     return data;
//   }

// const getDataResult = async () => {
    export async function getDataResult(inputSearch) {

    // console.log("getDataResult invoked")
    // let loader = document.getElementById('loaderID');
    // let btnSearch = document.getElementById('btnSearchID');

    // showSpinner(loader)
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ`)
        const searchData = await res.json();
        await getDataResult2(searchData);
        removeSpiner(loader);
        return searchData;
    } catch (error) {
        console.log('error!');
    }
}
// export default getDataResult();