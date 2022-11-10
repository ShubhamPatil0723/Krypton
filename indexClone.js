const Web3 = require('web3');

window.addEventListener('load', () =>{
    let web3;
    let accounts;
    //connect button
    document.getElementById('connect').addEventListener('click', async () => {
        try{
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //take accounts
        accounts = await window.ethereum.request({method: 'eth_accounts'});
        }catch(error){
            alert("Please connect your wallet.");  //put pop up here TODO
        }
    });



    //if user changed his/her acc
    window.ethereum.on('accountsChanged', function (account) {
        accounts = account;
    });

    //Transfer ether function
    document.getElementById('send').addEventListener('click', async () => {
        //Get current balance
        let balance = await web3.eth.getBalance(accounts[0]);
        let rAddr = document.getElementById('rAddr').value;
        let amt = document.getElementById('amt').value;
        let amount = web3.utils.toWei(amt, 'ether'); //Add amount from user input here TODO

        //check conditions
        if(balance>amount){
            web3.eth.sendTransaction({
                from: accounts[0],
                to: rAddr, //Add receiver address TODO
                value: amount,
            }).then((resolve) => {
                alert("Success");
            }).catch((reject) => {
                // alert("User rejected to send ether");
            });

        }
        else{
            alert("Not enough Funds");
        }
    });
});
