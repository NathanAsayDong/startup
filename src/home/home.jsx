
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
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
            const apiUrl = '/api/getTransactions';
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
        
            let body = await response.json();
            //filter data based on parameters
            console.log('body', body);
            //drop all values that are not in the selected category

            console.log('filter parameters', selectedCategory, startDate, endDate)
            if (selectedCategory !== 'All') {
                console.log('selected category', selectedCategory);
                body = body.filter(item => item.category === selectedCategory);
            }
            //drop all values that are not in the selected date range
            const startDate2 = new Date(startDate.setHours(0, 0, 0, 0));
            const endDate2 = new Date(endDate.setHours(23, 59, 59, 999));
            console.log('start date', startDate2);
            body = body.filter(item => {
                const timestamp = new Date(item.timestamp);
                return timestamp >= startDate2 && timestamp <= endDate2;
            });
                console.log('filtered body', body);
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
                <DateSelector selectedDate={endDate} onDateChange={handleEndDateChange} />
                    <p>End Date</p>
                </div>
                <DropDownSelector
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange} />
            </div>
            <Button variant="primary" size="md" onClick={handleGenerateReport}>GENERATE REPORT</Button>

            <h1 className="graph-title">Time Graph</h1>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>

            <h1 className="graph-title">Categories</h1>
            <BarChart width={730} height={250} data={categoryTotals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="category" fill="#8884d8" />
                <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>

            <p>Link to my GitHub repo: <a href="https://github.com/NathanAsayDong/startup" target="_blank" rel="noopener noreferrer">https://github.com/NathanAsayDong/startup</a></p>

        </div>
        </>


    )
}