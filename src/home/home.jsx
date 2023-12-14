
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { DateSelector } from './dateSelector/dateSelector';
import { DropDownSelector } from './dropDown/dropDownSelector';
import './home.css';



export function Home() {

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [data, setData] = React.useState(null);
    const [categoryTotals, setCategoryTotals] = React.useState(null);

    useEffect(() => {
        console.log('data', data);
        console.log('category totals', categoryTotals);
    }, [data, categoryTotals]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    }

    const handleEndDateChange = (date) => {
        setEndDate(date);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleGenerateReport = async () => {
        try {
            const response = await fetch('/api/getAllTransactions', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
        
            const body = await response.json();
            await setData(body);
            await setCategoryTotals(getCategoryTotals(body));

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const getCategoryTotals = (inputData) => {
        let categoryTotals = [];
    
        for (const transaction of inputData) {
            const amount = parseFloat(transaction.amount); // Convert amount to a number
    
            if (!isNaN(amount)) {
                const existingCategory = categoryTotals.find(item => item.category === transaction.category);
    
                if (existingCategory) {
                    existingCategory.amount += amount;
                } else {
                    categoryTotals.push({ category: transaction.category, amount });
                }
            }
        }
    
        console.log('category totals', categoryTotals);
        return categoryTotals;
    };

    return (
        <>
        <div className='body'>
            <div className='filters'>
                <div className='date-selector'>
                <DateSelector selectedDate={startDate} onDateChange={handleStartDateChange} />
                <p>Start Date</p>
                </div>
                <div className='date-selector'>
                <DateSelector selectedDate={startDate} onDateChange={handleEndDateChange} />
                    <p>End Date</p>
                </div>
                <DropDownSelector
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange} />
            </div>
            <Button variant="primary" size="md" onClick={handleGenerateReport}>GENERATE REPORT</Button>

            <div className="rectangle"> <p>report</p> </div>

            <div className="graph">
                <BarChart width={730} height={250} data={categoryTotals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="category" fill="#8884d8" />
                    <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
            </div>

            


        </div>
        </>


    )
}