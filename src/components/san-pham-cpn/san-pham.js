import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../stylecss/sanpham.css';
import Skeleton from '@mui/material/Skeleton';
import { NavLink } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import TimKiem from '../tim-kiem-cpn/tim-kiem';
import LocSanPhamTheoGia from '../loc-san-pham-cpn/loc-theo-gia';
import DanhMucSanPham from './danhmuc';

const SanPhamCPN = () => {
  const [loading, setLoading] = useState(true);
  const [dsSanPham, setDsSanPham] = useState([]);
  const [locSanPham, setLocSanPham] = useState([]);
  const [timKiem, setTimKiem] = useState("");
  const [locTheoGia, setLocTheoGia] = useState("");
  const [trang, setTrang] = useState(1);
  const itemsPerPage = 20; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/san-pham');
        setDsSanPham(response.data.data);
        setLocSanPham(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);  

  const handleTimKiem = (event) => {
    setTimKiem(event.target.value);

    console.log(timKiem);
  };

  const handleLocGia = (event) => {
    setLocTheoGia(event.target.value);
  };

  const indexOfLastItem = trang * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locSanPham.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="san-pham">
      <TimKiem
        onSearchChange={handleTimKiem}
        products={dsSanPham}
        setFilteredProducts={setLocSanPham}
      />

      <DanhMucSanPham />

      <LocSanPhamTheoGia
        locTheoGia={locTheoGia}
        onFilterChange={handleLocGia}
        products={dsSanPham}
        setFilteredProducts={setLocSanPham}
      />

      <div className="card">
        {loading ? (
          <div className="categories-list">
            <Skeleton animation="wave" width={100} height={100} />
          </div>
        ) : (
          currentItems.map(sanPham => (
            <NavLink key={sanPham.id} to={`/san-pham/${sanPham.id}`} className="card-item">
              {sanPham.hinh_anh && sanPham.hinh_anh.length > 0 ? (
                <img className="imgSP" src={`http://localhost:8000/${sanPham.hinh_anh[0].url}`} alt={`Hình ảnh sản phẩm`} />
              ) : (
                <img className="imgSP" src="/loading.jpg" alt="Ảnh mặc định" />
              )}
              <div className="card-content">
                <p className="name">Tên Sản Phẩm: {sanPham.ten}</p>
                {sanPham.san_pham_bien_the && sanPham.san_pham_bien_the.length > 0 ? (
                  <div className="variant-card">
                    <p className="storage-variant">Dung Lượng:{sanPham.san_pham_bien_the[0].dung_luong}</p>
                    <p className="price">Giá: {sanPham.san_pham_bien_the[0].gia}</p>
                  </div>
                ) : (
                  <p className="no-variant">Không có biến thể sản phẩm.</p>
                )}
              </div>
            </NavLink>
          ))
        )}
      </div>
      {locSanPham.length > itemsPerPage && (
        <Pagination>
          {[...Array(Math.ceil(locSanPham.length / itemsPerPage))].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === trang}
              onClick={() => setTrang(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}

export default SanPhamCPN;
