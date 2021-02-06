import React from 'react';

function Header({totalTransaction, baseCurrency, currencies, handleCurrencyChange}){

    let currencyName = baseCurrency;
    
    const getClassName = (val) =>{
        let className = "total-money ";
        className += val >= 0 ? "positive" : "negative";
        return className;
    };

    const currencyChanged = event => {
        handleCurrencyChange(event.target.value);
    }

    return (
        <header className="header">
            <h1>EXPENSE TRACKER</h1>
            <select className="currencies"
            onChange={currencyChanged}>
                {currencies.map(element => (
                    <option key={element} value={element}
                    >{element}</option>
                ))}
            </select>
            <div className={getClassName(totalTransaction)}>
                {baseCurrency} {totalTransaction}
            </div>
        </header>
    )
}

export default Header;