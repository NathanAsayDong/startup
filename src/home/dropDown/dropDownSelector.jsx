import React from 'react';

export function DropDownSelector ({ selectedCategory, onCategoryChange }) {
    const categories = ['entertainment', 'food', 'gas', 'gym', 'housing', 'income', 'insurance', 'investment', 'medical', 'other_bills', 'phone', 'savings', 'shopping', 'tithing', 'unsure', 'utilities'];


    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    return (
        <div>
            <select id='category' value={selectedCategory} onChange={onCategoryChange}>
                <option value=''>Select...</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            {selectedCategory && (
                <div>
                    <p>You selected: {selectedCategory}</p>
                </div>
            )}
        </div>
    );
}
