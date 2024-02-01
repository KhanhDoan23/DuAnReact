import React, { useState } from 'react';

const ChonSanPham = ({ productId, onSelect }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleSelect = () => {
        setIsChecked(!isChecked);
        onSelect(productId, !isChecked);
    };

    return (
        <input type="checkbox" checked={isChecked} onChange={handleSelect} />
    );
};

export default ChonSanPham;
