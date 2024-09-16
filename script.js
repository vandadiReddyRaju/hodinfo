const bestPriceAmount = document.getElementById('best-price-amount');
const cryptoDataBody = document.getElementById('crypto-data-body');

// Fetch data from backend API
fetch('/api/getTop10')
  .then(response => response.json())
  .then(data => {
    // Display best price
    bestPriceAmount.textContent = data[0].last;

    // Display crypto data in table
    data.forEach((crypto, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${crypto.base_unit === 'BTC' ? 'btc-icon.png' : 'eth-icon.png'}" alt="${crypto.name}"> ${crypto.name}</td>
        <td>₹${crypto.last}</td>
        <td>₹${crypto.buy} / ₹${crypto.sell}</td>
        <td class="${crypto.last > crypto.buy ? 'positive' : 'negative'}">${crypto.last > crypto.buy ? '+' : ''}${((crypto.last - crypto.buy) / crypto.buy * 100).toFixed(2)}%</td>
        <td class="${crypto.last > crypto.buy ? 'positive' : 'negative'}">${crypto.last > crypto.buy ? '+' : ''}${(crypto.last - crypto.buy).toFixed(2)}</td>
      `;
      cryptoDataBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });