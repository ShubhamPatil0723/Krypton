const Web3 = require('web3');

window.addEventListener('load', async () => {
    //web3 instance
    let web3 = new Web3(window.ethereum);
    let accounts;
    //display accounts
    try{
      accounts = await window.ethereum.request({method: 'eth_accounts'});
    }
    catch(e){
      console.log("Connect your metamask");
    }



    // fetch balance
    if(accounts.length == 0){
      //Modal
      alert("Connect your wallet");
    }
    else{
      let amount = await web3.eth.getBalance(accounts[0]);
      let balance = web3.utils.fromWei(amount, 'ether');
      document.getElementById('balance').innerHTML = balance + " ETH";

      document.getElementById('account').innerHTML = accounts[0];
    }


});
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('#currency-form').onsubmit = ()=>{
      const base = document.getElementById('currency-from').value;
      fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
          .then((response) => response.json())
          .then((data) => {
              // console.log(data)
              const amount = document.querySelector("#input-amount").value;
              const currencyTo = document.getElementById('currency-to').value;
              const rate = data.rates[currencyTo];
              function convert(){
                  return amount * rate;
              }
              document.querySelector('.display-result').innerHTML = `${amount} ${base.toUpperCase()} equal to ${currencyTo} ${convert().toFixed(4)}`;
          })
      .catch((error) =>{
          console.log("Error: ", error);
      });
      return false;
  };
});
