import React from 'react';

function Item({transaction, index, removeTransaction, baseCurrency}){
    let date = new Date(transaction.date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const removeHandle = (i) => {
        removeTransaction(i);
    };

    const getPriceClass = (val) =>{
        let className = "price ";
        className += val >= 0 ? "positive" : "negative";
        return className;
    };

    return (
        <div className="item">
            <div className="desc">{transaction.desc}</div>
            <div className={getPriceClass(transaction.price)}>{parseFloat(transaction.price).toFixed(2)} {baseCurrency}</div>
            <div className="date">{day + "/" + month + "/" + year}</div>
            <button className="remove-item"
            onClick={() => removeHandle(index)}>
                X
            </button>
        </div>
    )
}

export default Item;