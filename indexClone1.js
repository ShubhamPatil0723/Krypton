const Web3 = require('web3');


window.addEventListener('load', () =>{
    let web3 = new Web3(window.ethereum);;
    let accounts;
    //connect button
    document.getElementById('connect').addEventListener('click', async () => {
        try{

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //take accounts
        accounts = await window.ethereum.request({method: 'eth_accounts'});
                  }
                  catch(error){
            console.log(error);  //put pop up here TODO
        }
    });



    //if user changed his/her acc
    window.ethereum.on('accountsChanged', function (account) {
        accounts = account;
    });

    //Form validation
    let validation = () => {
      let addr = document.getElementById("rAddr").value;
      let amount = document.getElementById("amt").value;
      let modal = document.getElementById('myModal');
      var re = /^0x[0-9A-Fa-f]{40}$/;
      if(!re.test(addr)){
        document.getElementById('message').innerHTML = "Invalid address";
        modal.style.display = "block";
      }
      else if (amount <= 0) {
        document.getElementById('message').innerHTML = "Send some Ether";
        modal.style.display = "block";
      }
      else{
        send();
      }
      // clo.onclick = function() {
      //   modal.style.display = "none";
      // }
      window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
              }
          }
      // console.log(re.test(addr));
    }


    let send = async () => {
      //Get current balance
      let balance = await web3.eth.getBalance(accounts[0]);
      let rAddr = document.getElementById('rAddr').value;
      let amt = document.getElementById('amt').value;
      let amount = web3.utils.toWei(amt, 'ether');
      let modal = document.getElementById('myModal');
      let clo = document.getElementsByClassName("close")[0];
      //check conditions
      if(balance > amount){
          web3.eth.sendTransaction({
              from: accounts[0],
              to: rAddr,
              value: amount,
          }).then((resolve) => {
              document.getElementById('message').innerHTML = "Successfull";
              modal.style.display = "block"; // "successfull transaction popup"
          }).catch((reject) => {
            document.getElementById('message').innerHTML = "Rejected";
            modal.style.display = "block";
            //"Transaction rejected popup"
          });
      }
      else{
        document.getElementById('message').innerHTML = "Not enough funds";
          modal.style.display = "block"; // "Not enough ether popup"
      }
      // clo.onclick = function() {
      //   modal.style.display = "none";
      // }
    }

    //Transfer ether function
    document.getElementById('send').addEventListener('click', async () => {
        validation();
    });

    //modal
    // document.getElementById('send1').addEventListener('click', async () => {
    //   console.log("working");
    //   // if(accounts.length == 0){
    //   //   //Modal
    //   //   alert("Connect your wallet");
    //   // }else{
    //   //   alert("Working");
    //   //   location.href = "../src/connect.html";
    //   // }
    // });

});
