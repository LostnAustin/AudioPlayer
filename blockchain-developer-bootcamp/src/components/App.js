import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Content from '../components/Content';
import Web3 from 'web3';
import { 
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
 } from '../store/interactions'

import { connect } from 'react-redux'
import { accountSelector, contractsLoadedSelector, tokenLoadedSelector } from '../store/selectors'

import Token from '../abis/Token.json'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

//  async loadBlockchainData() {
//    const web3 = new Web3(window.ethereum || 'http://localhost:7545')
//    const network = await web3.eth.net.getNetworkType()
//    const accounts = await web3.eth.getAccounts()
//    const networkId = await web3.eth.net.getId()
 
//    //testing the web3 smart contract connection to UI (eg chrome dev tools)
//     const abi = Token.abi
//     console.log('accounts', accounts)
//    console.log('Token', Token)
//    console.log('abi', Token.abi)
//    console.log('networkId', networkId)
//    console.log('network', network)
//    console.log('address', Token.networks[networkId].address)
//   //connect contract and web3 to UI to interact with data 
//   const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
//   const totalSupply = await token.methods.totalSupply().call()
//   console.log('totalSupply', totalSupply)
//    console.log('token', token)
//  }
  

    async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    
    await loadAccount(web3, dispatch)
    // console.log(loadAccount(web3, dispatch))
    const token = await loadToken(web3, networkId, dispatch) 
      if(!token) {
        window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
        return
      }
      
      const exchange = await loadExchange(web3, networkId, dispatch)
      if(!exchange) {
        window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
        return
      }
    }


  render() {
    // console.log(this.props.account)
    return (
      <div>
        <Navbar /> 
        { this.props.contractsLoaded ? <Content /> : <div className='content'></div> }
        
      </div>
    );
  }
}

function mapStateToProps(state) {

  // console.log('contractsLoaded', contractsLoadedSelector(state))
  return {
    // account: accountSelector(state)
    contractsLoaded: contractsLoadedSelector(state)
  }
}


export default connect(mapStateToProps)(App);
