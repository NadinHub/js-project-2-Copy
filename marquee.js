
export default class Marquee {
    constructor(elementClass) {
        this.tickerText = document.querySelector(elementClass); //--- parent element---
    }
    showMarquee = async () => {

        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/actives`);
        let tickers = await response.json();
        for (let i = 0; i < tickers.length; i++) {

            let tickerItem = document.createElement('span');
            tickerItem.classList.add('mx-2', 'border-red');
            this.tickerText.appendChild(tickerItem);
            tickerItem.innerHTML = `<span class="p-1 font-weight-bolder">${tickers[i].ticker}</span>
                <span>${tickers[i].price} </span>
                <span class="ticker-changes" id="tickerID${i}">${tickers[i].changesPercentage}</span>`;

            let tickerChanges = document.querySelector(`#tickerID${i}`);
            let strChanges = `${tickers[i].changesPercentage}`;
            if (strChanges.includes("-")) {
                tickerChanges.classList.add('text-danger')
            } else { tickerChanges.classList.add('text-success') }
        }
    }
}

// const myMarquee = new Marquee(".marquee-text-text");
// myMarquee.showMarquee();

// const marquee = async () => {
//     // const tickerItem = document.querySelector(".ticker-item");
//     const tickerText = document.querySelector(".marquee-text-text"); //--- parent element---

//     const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/actives`);
//     let tickers = await response.json();
//     // console.log(tickers);
//     for (let i = 0; i < tickers.length; i++) {

//         let tickerItem = document.createElement('span');
//         tickerItem.classList.add('mx-2', 'border-red');
//         tickerText.appendChild(tickerItem);
//         tickerItem.innerHTML = `<span class="p-1 font-weight-bolder">${tickers[i].ticker}</span>
//         <span>${tickers[i].price} </span>
//         <span class="ticker-changes" id="tickerID${i}">${tickers[i].changesPercentage}</span>`;

//         let tickerChanges = document.querySelector(`#tickerID${i}`);
//         let strChanges = `${tickers[i].changesPercentage}`;
//         if (strChanges.includes("-")) {
//             tickerChanges.classList.add('text-danger')
//         } else {tickerChanges.classList.add('text-success')}

//     }
// }

// marquee();