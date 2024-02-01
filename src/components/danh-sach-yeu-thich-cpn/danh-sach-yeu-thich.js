import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XoaKhoiDanhSachYeuThich from './xoa-khoi-danh-sach-yeu-thich';
import ThemSanPhamVaoGioHang from '../gio-hang-cpn/them-vao-gio-hang';
import '../../SanPham.css';

const DanhSachYeuThich = () => {
  const [danhSachYeuThich, setDanhSachYeuThich] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('dang_nhap_token');
        const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-yeu-thich', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        setDanhSachYeuThich(response.data.data);
      } catch (error) {
        alert('Không tải được danh sách yêu thích');
        console.error('Error fetching favorite list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="danh-sach-yeu-thich-container">
      <h2>Danh Sách Yêu Thích</h2>
      <ul className="yeu-thich-list">
        {danhSachYeuThich.map((sanPhamYeuThich) => (
          <li key={sanPhamYeuThich.id} className="yeu-thich-item">
           <p>Tên Sản Phẩm: {sanPhamYeuThich.san_pham.ten}</p>
           <p>Giá: {sanPhamYeuThich.san_pham_bien_the.gia}</p>
           <p>Màu: {sanPhamYeuThich.san_pham_bien_the.mau}</p>
           <p>Dung lượng: {sanPhamYeuThich.san_pham_bien_the.dung_luong}</p>
            <XoaKhoiDanhSachYeuThich sanPhamId={sanPhamYeuThich.san_pham.id} bienTheId={sanPhamYeuThich.san_pham_bien_the.id} />
            <ThemSanPhamVaoGioHang sanPhamId={sanPhamYeuThich.san_pham.id} bienTheId={sanPhamYeuThich.san_pham_bien_the.id} soLuong={1} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DanhSachYeuThich;
