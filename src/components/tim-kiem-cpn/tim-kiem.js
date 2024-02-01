import React from 'react';
import '../../stylecss/timkiem.css';

const TimKiem = ({ onSearchChange, products, setFilteredProducts }) => {
  const filterProductsByKeyword = (keyword) => {
    const filteredProducts = products.filter((sanPham) =>
      sanPham.ten.toLowerCase().includes(keyword.toLowerCase()) ||
      (sanPham.san_pham_bien_the && sanPham.san_pham_bien_the.length > 0 &&
        sanPham.san_pham_bien_the.some((bienThe) =>
          bienThe.dung_luong.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.ram.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.man_hinh.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.chip.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.pin.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.he_dieu_hanh.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.mau.toLowerCase().includes(keyword.toLowerCase()) ||
          bienThe.camera.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );

    setFilteredProducts(filteredProducts);
  };

  return (
    <div className='timkiem'>
       <div className="search-bar">
            <input
                type="text"
                id="search"
                placeholder="Tìm kiếm sản phẩm"
                className="search-input"
                onChange={(e) => {
                    onSearchChange(e);
                    filterProductsByKeyword(e.target.value);
                  }}
            />
        </div>
    </div>
  );
}

export default TimKiem;
