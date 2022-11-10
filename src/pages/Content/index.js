const marketUrl = 'https://www.cnbc.com/us-market-movers/';
const formUrl = 'https://forms.zohopublic.in/developers/form/TestResponses/formperma/-gq-UT1RjqASnGgBsW-M8MmPm8e3YLhcyFam06v2piE';
const marketData = {};

window.onload = async () => {
  if (window.location.href === marketUrl) {
    const markets = document.getElementsByClassName('MarketMoversMenu-marketOption');
    let tableRow;
    setTimeout(() => {
      markets[1].click();
      setTimeout(() => {
        tableRow = document.querySelector('#MainContentContainer > div > div > div > div:nth-child(3) > div.PageBuilder-col-9.PageBuilder-col > section > section.MarketMovers-marketTopContainer.MarketMovers-marketTopContainerStacked > section:nth-child(1) > table > tbody > tr:nth-child(2)');
        marketData.name = tableRow.children[1].textContent;
        marketData.change = tableRow.children[3].textContent.replace('%', '');
        marketData.timestamp = Date.now();
        chrome.storage.sync.set({ marketData });
        setTimeout(() => {
          window.location.href = formUrl;
        }, 500);
      }, 500);
    }, 250);
  }
  if (window.location.href === formUrl) {
    let formData;
    await chrome.storage.sync.get('marketData').then(d => formData = d.marketData);

    document.getElementsByName('SingleLine')[0].value = formData.name;
    document.getElementsByName('SingleLine1')[0].value = formData.change;
    document.getElementsByName('SingleLine2')[0].value = formData.timestamp;
    console.log(formData.name, formData.change, formData.timestamp);
  }
}