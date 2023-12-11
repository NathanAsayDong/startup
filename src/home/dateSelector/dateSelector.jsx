import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export function DateSelector({ selectedDate, onDateChange }) {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat='dd/MM/yyyy'
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
        />
    );
}