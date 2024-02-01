import React from 'react';
import '../../stylecss/loc.css';

const LocSanPhamTheoGia = ({ locTheoGia, onFilterChange, products, setFilteredProducts }) => {
  const filterProductsByPrice = (price) => {
    const filteredProducts = products.filter((sanPham) => {
      if (!price) {
        return true;
      } else if (price === 'all') {
        return true;
      } else if (price === 'duoi2tr') {
        return sanPham.san_pham_bien_the[0].gia < 2000000;
      } else if (price === '2trden4tr') {
        return sanPham.san_pham_bien_the[0].gia >= 2000000 && sanPham.san_pham_bien_the[0].gia <= 4000000;
      } else if (price === '4trden7tr') {
        return sanPham.san_pham_bien_the[0].gia >= 4000000 && sanPham.san_pham_bien_the[0].gia <= 7000000;
      } else if (price === '7trden13tr') {
        return sanPham.san_pham_bien_the[0].gia >= 7000000 && sanPham.san_pham_bien_the[0].gia <= 13000000;
      } else if (price === '13trden20tr') {
        return sanPham.san_pham_bien_the[0].gia >= 13000000 && sanPham.san_pham_bien_the[0].gia <= 20000000;
      } else if (price === 'tren20tr') {
        return sanPham.san_pham_bien_the[0].gia > 20000000;
      }
      return true;
    });

    setFilteredProducts(filteredProducts);
  };

  const priceOptions = [
    { value: '', label: 'Lọc giá' },
    { value: 'all', label: 'Tất cả giá' },
    { value: 'duoi2tr', label: 'Dưới 2 triệu' },
    { value: '2trden4tr', label: 'Từ 2 - 4 triệu' },
    { value: '4trden7tr', label: 'Từ 4 - 7 triệu' },
    { value: '7trden13tr', label: 'Từ 7 - 13 triệu' },
    { value: '13trden20tr', label: 'Từ 13 - 20 triệu' },
    { value: 'tren20tr', label: 'Trên 20 triệu' },
  ];

  return (
    <div className="loc-san-pham">
      <select
        className="loc-theo-gia-select"
        id="locTheoGia"
        value={locTheoGia}
        onChange={(e) => {
          onFilterChange(e);
          filterProductsByPrice(e.target.value);
        }}
      >
        {priceOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default LocSanPhamTheoGia;
