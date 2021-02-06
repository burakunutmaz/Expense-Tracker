import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'

function App() {
  const [transaction, setTransaction] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("EUR")
  const [currencyData, setCurrencyData] = useState([]);
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  const BASE_URL = "https://api.exchangeratesapi.io/latest"

  useEffect(() => {
    let temp = 0;
    
    for (let i=0; i<transaction.length; i++){
      temp += parseFloat(transaction[i].price);
    }

    setTotalTransaction(temp.toFixed(2));
  
  }, [transaction, baseCurrency]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        handleCurrencyRateList(data);
      })

  }, []);

  const handleCurrencyChange = (currency) =>{
    let newUrl = BASE_URL + "?base=" + currency;
    fetch(newUrl)
      .then(res => res.json())
      .then(data => {
        handleCurrencyRateList(data);
      })
    let index = findIndexOfCurrency(currency);
    setCurrencyMultiplier(currencyData[index][1]);
    console.log(index, ", ", currency, ", ", currencyMultiplier, ", ", currencyData[index][1]);
    handleTransactionCurrencies(currencyData[index][1]);
    setBaseCurrency(currency);
  }

  const handleTransactionCurrencies = (multiplier) => {
    let tempTransactions = transaction;
    let len = tempTransactions.length;
    for (let i=0; i<len; i++){
      console.log(tempTransactions[i].price);
      tempTransactions[i].price = (parseFloat(tempTransactions[i].price) * multiplier);
      console.log(tempTransactions[i].price);
    }

    console.log(tempTransactions);
    setTransaction(tempTransactions);
    console.log(transaction);
  }

  const findIndexOfCurrency = (currency) => {
    let data = currencyData;
    let len = currencyData.length;
    let index = -1;
    for(let i=0; i<len; i++){
      if (currencyData[i][0] === currency){
        index = i;
      }
    }
    return index;
  }

  const handleCurrencyRateList = (data) => {
    let currencyRateList = []
        for (let i=0; i<Object.keys(data.rates).length; i++){
          currencyRateList[i] = [Object.keys(data.rates)[i], Object.values(data.rates)[i]]
        }
        setCurrencyData(currencyRateList);
        console.log(currencyData);
  }

  return (
    <div className="app">
     <Header totalTransaction={totalTransaction} currencies={currencyOptions}
     baseCurrency={baseCurrency} handleCurrencyChange={handleCurrencyChange} />
     <br/>
     <Form transaction={transaction} setTransaction={setTransaction} />
     <List transaction={transaction} setTransaction={setTransaction}
     baseCurrency={baseCurrency} />
    </div>
  );
}

export default App;
