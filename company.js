// Assuming "?post=1234&action=edit"
function showSpinner(loaderParameter) {
    loaderParameter.classList.remove('loader-opacity-0');
    loaderParameter.classList.add('loader2');
}
function removeSpinner(loaderParameter) {
    loaderParameter.classList.remove('loader2');
    loaderParameter.classList.add('loader-opacity-0');
}
const companyLoader = document.getElementById('company-loaderID')

let urlParams = new URLSearchParams(window.location.search);
let companyNameFromURL = document.getElementById('companyNameID') // DOM
let data;
console.log(urlParams.get('symbol')); // Get company name from URL

async function getDataResult() {
    showSpinner(companyLoader);
    try {
        const res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${urlParams.get('symbol')}`)
        if (res.ok) {
            data = await res.json();
            console.log(data[0]);
            // showTheList(data); // show all results (from server)   
        } else {console.log("Not Successful")}
    } catch (error) {console.log('error!');}
}

showDataResult();
async function showDataResult() { // ----------- Get data from API ----
    await getDataResult();
    const changes = document.getElementById('changesID')
    const description = document.getElementById('description')
    const price = document.getElementById('priceID')

    // the company image, name, description and link 
    companyNameFromURL.innerHTML = `<img class="pr-3" src="${data[0].image}"></img>${data[0].companyName} (${urlParams.get('symbol')})`;
    price.innerHTML = `<span class="text-secondary">Stock price: </span>$${data[0].price} `
    changes.innerHTML = `(${data[0].changes}%) <small class="text-secondary"></small>`;
    if (changes.value < 0)
        changes.classList.add('text-danger');
    else changes.classList.add('text-success');
    description.innerText = `${data[0].description}`;
}
const xlabels = [];
const ytemps = [];

async function getHistory() { // ----------- Get History ----
    let history = document.getElementById('historyID')
    try {
        const result = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${urlParams.get('symbol')}?serietype=line`)
        if (result.ok) {
            let data = await result.json();
            let historicalData = await data.historical;
            for (let i = 0; i < historicalData.length; i++) {
                xlabels.push(historicalData[i].date);
                ytemps.push(historicalData[i].close);
                // console.log(historicalData[i]);

            }
            // removeSpiner(loader);
            // showTheList(data); // show all results (from server)   
            // the company image, name, description and link 
            // companyNameFromURL.innerHTML = `${urlParams.get('symbol')} <br> <img src="${data[0].image}"></img><br> ${data[0].companyName}<br> ${data[0].description}<br>${data[0].price}<br>`;
            // history.innerHTML = `${data.historical}`;
            // if (changes.value < 0)
            //     changes.classList.add('list-group-item', 'text-danger', 'pb-4', 'pl-0');
            // else changes.classList.add('list-group-item', 'text-success', 'pb-4', 'pl-0');
        } else { console.log("Not Successful") }
    } catch (error) { console.log('error!'); }
}

chartIt();
async function chartIt() {
    await getHistory();
    removeSpinner(companyLoader);
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Stock chart',
                data: ytemps,
                backgroundColor: ['rgba(255, 99, 132, 0)'],
                borderCapStyle: 'butt',
                borderColor: [
                    'rgba(0, 0, 132, 1)',
                ],
                borderWidth: 1,
                pointBackgroundColor: 'rgba(0, 0, 132, 1)',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}
