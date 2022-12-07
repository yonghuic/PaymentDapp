import React, {useState} from "react";
import "./Payment.css"
import { ethers } from "ethers";

//複製按鈕套件
import copy from "copy-to-clipboard";

function Payment () {

    const [address, setAddress] = useState('')  //接收者錢包地址
    const [amount, setAmount] = useState('')    //要發送的ETH數量
    const [hash, setHash] = useState('')        //這筆交易的Hash
    const [message, setMessage] = useState('')  //備註

    async function pay() {
        //連接使用者帳號
        await window.ethereum.send("eth_requestAccounts"); 

        //連接Metamask錢包
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        
        //和合約做互動
        const signer = provider.getSigner(); 
        const ContractAddress = "0x8A332e2f5B85BDB2606650D02CCbc2447468F0C4"
        const ContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Send",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "sendeth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        const transaction = await contract.sendeth(address, amount, message, { value: ethers.utils.parseEther(amount)});
        setHash(transaction.hash)
        
    }

    async function send(event){
        event.preventDefault()
        await pay()
    }
    
    const copyToClipboard = () => {
        copy(hash);
        alert(`交易Hash複製成功~ "${hash}"`);
    }

    return (
       <>
       <div id="converter">
            <crypto-converter-widget shadow symbol live background-color="#fff59d" border-radius="1rem" fiat="new-taiwan-dollar" crypto="ethereum" amount="1" font-family="Paytone One" decimal-places="0"></crypto-converter-widget>
       </div>

       <br/>
        <div id="ptitle">
            <p>輕鬆支付</p>
        </div>
       <form className="box" id="paymentbox">
            <div className="field" >
                <label className="label" id="paymentlabel">接收者錢包地址:</label>
                <div className="control">
                    <input id="paymentinput" value={address} onChange={(event) => setAddress(event.target.value)} className="input is-warning" type="text"/>
                </div>
            </div>

            <div className="field">
                <label className="label" id="paymentlabel">ETH數量:</label>
                <div className="control">
                    <input id="paymentinput" value={amount} onChange={(event) => setAmount(event.target.value)} className="input is-warning" type="text"/>
                </div>
            </div>

            <div className="field">
                <label className="label" id="paymentlabel">備註:</label>
                <div className="control">
                    <input id="paymentinputmessage" value={message} onChange={(event) => setMessage(event.target.value)} className="input is-warning" type="text"/>
                </div>
            </div>

            <button id="paymentbutton" onClick={send} className="button is-warning">傳送</button>
        </form>

        <div className="box" id="paymenthashbox">
            <div className="field">
                <label className="label" id="paymentlabel">交易Hash:</label>
                <div className="control">
                    <input id="paymentinput" value={hash} className="input is-warning" type="text"/>
                </div>
            </div>

            <div className="paymentbutton">
                <button id="copybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
            </div>
        </div>
        <br/>
       </> 
    )
}
export default Payment 
