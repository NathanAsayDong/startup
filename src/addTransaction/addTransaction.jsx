import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { DropDownSelector } from '../home/dropDown/dropDownSelector';
import './addTransaction.css';
import { TransactionChat } from './transactionChat/transactionChat';

export function AddTransaction() {
    
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAddTransaction = async () => {
        const transaction = { category: selectedCategory, amount: amount, description: description };
        
        try {
            const response = await fetch('/api/addTransactions', {
                method: 'post',
                body: JSON.stringify(transaction),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log("api success");
        } catch (error) {
            setError(error.message);
        }
    }


return (
    <>
        <div className='add-transaction-content'>
        <div className='box-container'>
            <DropDownSelector selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <form>
                <label className='middle-label'>Amount:
                    <input type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label>Description:
                    <input type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                </label>
            </form>
        </div>
            <Button variant="primary" size="md" onClick={handleAddTransaction}>Add Transaction</Button>
        </div>
    <TransactionChat />
    </>
);
}