
import React from 'react';
import { DateSelector } from './dateSelector/dateSelector';
import { DropDownSelector } from './dropDown/dropDownSelector';



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


    return (
        <>
        <p>SELECT DATES</p>
        <div className='date-selector'>
        <DateSelector selectedDate={startDate} onDateChange={handleStartDateChange} />
        <p>Start Date</p>
        </div>
        <div className='date-selector'>
        <DateSelector selectedDate={startDate} onDateChange={handleEndDateChange} />
            <p>End Date</p>
        </div>
        <p>SELECT CATEGORY</p>
        <DropDownSelector
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange} />
        </>
    )
}