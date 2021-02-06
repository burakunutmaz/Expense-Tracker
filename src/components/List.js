import React from 'react';
import Item from './Item'

function List({transaction, setTransaction, baseCurrency}){

    const removeTransaction = (i) => {
        let temp = transaction.filter((v, index) => index != i);
        setTransaction(temp);
    }

    const sortByDate = (a, b) => {
        return a.date - b.date;
    }

    return (
        <div className="list">
           {
               transaction.sort(sortByDate).map(
                   (value, index) => (
                       <Item key={index}
                       transaction={value}
                       index={index}
                       removeTransaction={removeTransaction}
                       baseCurrency={baseCurrency} />
                   )
               )
           }
        </div>
    )
}

export default List;