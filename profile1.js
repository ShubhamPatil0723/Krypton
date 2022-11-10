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
