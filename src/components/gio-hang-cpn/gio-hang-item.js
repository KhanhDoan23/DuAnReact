import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import XoaSanPhamKhoiGioHang from './xoa-gio-hang';
import ChonSanPham from '../thanh-toan-cpn/chon-san-pham';
import ThanhToan from '../thanh-toan-cpn/thanh-toan';
import {isTokenExpired} from '../dang-nhap-cpn/kiem-tra-token';

import '../../stylecss/giohang.css';

const DanhSachGioHang = () => {
  const [dsGioHang, setDsGioHang] = useState([]);
  const [chonSanPham, setChonSanPham] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('dang_nhap_token');
    
        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Vui Lòng Đăng Nhập',
            text: 'Đăng nhập để xem được giỏ hàng.',
            confirmButtonColor: '#000000', 
          });
          navigate('/dang-nhap');
          return;
        }

        if (isTokenExpired(accessToken)) {
            localStorage.removeItem('dang_nhap_token');
            Swal.fire({
              icon: 'error',
              title: 'Token Hết Hạn',
              text: 'Vui lòng đăng nhập lại.',
              confirmButtonColor: '#000000',
            });
            navigate('/dang-nhap');
            return;
          }


        const response = await axios.get('http://127.0.0.1:8000/api/gio-hang', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setDsGioHang(response.data.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã có lỗi xảy ra khi tải danh sách giỏ hàng.',
          confirmButtonColor: '#000000',
        });
        console.error('Error fetching cart list:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setChonSanPham([...chonSanPham, productId]);
    } else {
      const updatedSelectedProducts = chonSanPham.filter(id => id !== productId);
      setChonSanPham(updatedSelectedProducts);
    }
  };


  return (
    <div className="danh-sach-gio-hang">
      {dsGioHang && dsGioHang.map((gioHang) => (
        <div key={gioHang.id} className="gio-hang-item">
          <ChonSanPham productId={gioHang.id} onSelect={handleSelectProduct} />
          <div className="gio-hang-info">
            <p className="gio-hang-quantity">Số lượng: {gioHang.so_luong}</p>
            <p className="gio-hang-name">Tên sản phẩm: {gioHang.san_pham.ten}</p>
            <p className="gio-hang-price">Giá: {gioHang.san_pham_bien_the.gia}</p>
            <p className="gio-hang-color">Màu: {gioHang.san_pham_bien_the.mau}</p>
            <p className="gio-hang-capacity">Dung Lượng: {gioHang.san_pham_bien_the.dung_luong}</p>
            <XoaSanPhamKhoiGioHang XoaId={gioHang.id} />
          </div>
        </div>
      ))}
      <ThanhToan selectedProducts={chonSanPham} className="thanh-toan-button"/>
    </div>
  );
};

export default DanhSachGioHang;
