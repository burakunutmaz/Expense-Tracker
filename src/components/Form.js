import React, {useRef} from 'react';

function Form({transaction, setTransaction}){

    const desc = useRef(null);
    const date = useRef(null);
    const price = useRef(null);

    const Add = (e) =>{
        e.preventDefault();
        let time = date.current.value.split("-");
        let newDate = new Date(time[0], time[1], time[2]);

        setTransaction([...transaction, {
            "desc": desc.current.value,
            "price": price.current.value,
            "date": newDate.getTime()
        }]);

        desc.current.value = "";
        price.current.value = null;
        date.current.value = null;
    };

    return (
        <form className="transaction-form" onSubmit={Add}>
            <div className="form-inner">
                <input type="text" name="desc" id="desc"
                placeholder="Transaction description..." ref={desc} />
                <input type="number" name="price" id="price"
                placeholder="Price..." ref={price}/>
                <input type="date" name="date" id="date"
                placeholder="Transaction Date..." ref={date}/>
                <input type="submit" value="Add"/>

            </div>
        </form>
    )
}

export default Form;