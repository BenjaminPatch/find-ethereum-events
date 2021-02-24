const fs = require('fs');

function getNumberOfEventResults(e) {
    i = 0;
    console.log("hi")
    console.log(e)
    for (var prop in e) {
        if (e.hasOwnProperty(prop)) {
            i++;
        }
    }
    return i
}

/**
 * Find all emissions of a certain event type from a contract
 * @param contractAddress the contract's address
 * @param eventName the event name to search for
 * @param abi the ABI of the contract
 * @param rpc the RPC endpoint to use for Ethereum node
 */
async function getEvents(contractAddress, eventName, abi, rpc) {

    // Define the contract ABI

    /*
    A script that returns some filtered events from an Ethereum smart contract.

    Your contract will require a solidity event and it will need to be triggered at least once before you run the script.

    For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Getting-Smart-Contract-Events
    */

    // Add the web3 node module
    var Web3 = require('web3');

    // Show web3 where it needs to look for the Ethereum node.
    web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    // Define the contract ABI and Address
    var contract = new web3.eth.Contract(abi, contractAddress);
    //console.log(contract.methods)
    console.log(web3.getTransactionsByAccount)

    // Fun console text, you can ignore this.
    console.log('-----------------------------------');
    console.log('Matching Smart Contract Events');
    console.log('-----------------------------------');
    console.log(contract)

    // Search the contract events for the hash in the event logs and show matching events.
    contract.getPastEvents(eventName, {
        fromBlock: 0,
        toBlock: 'latest'
        }, function(error, events){
            //console.log(events);
            var results = 0;
            if (events.length > 0) {
                results = getNumberOfEventResults(events[0].returnValues)
            }
            console.log(results)
            console.log(events.length);
            for (i = 0; i < events.length; i++) {
                fs.appendFileSync('results.txt', "Next " + eventName + " emission:\n")
                var eventObj = events[i];
                for (var j = 0; j < results / 2; j++) {
                    fs.appendFileSync('results.txt', eventObj.returnValues[j.toString()] + "\n")
                }
            }
    });
}

var abi = "ENTER_ABI_HERE"
var contractAddress = ""
var eventName = ""
var rpc = ""

getEvents(contractAddress, eventName, abi, rpc)
