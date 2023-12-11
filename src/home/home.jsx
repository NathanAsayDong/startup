
import React from 'react';
import { Button } from 'react-bootstrap';
import { DateSelector } from './dateSelector/dateSelector';
import { DropDownSelector } from './dropDown/dropDownSelector';
import './home.css';



export function Home() {

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const handleStartDateChange = (date) => {
        setStartDate(date);
    }

    const handleEndDateChange = (date) => {
        setEndDate(date);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleGenerateReport = () => {
        console.log('start date: ', startDate);
    }


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

            <div className="graph"> <p>graph</p> </div>

            


        </div>
        </>


    )
}