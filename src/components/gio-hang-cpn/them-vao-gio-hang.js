import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../stylecss/giohang.css';
const ThemSanPhamVaoGioHang = ({ sanPhamId, bienTheId, soLuong }) => {
    const navigate = useNavigate();

  const handleAddToFavorite = async () => {
    try {
    const accessToken = localStorage.getItem('dang_nhap_token');
    
    if (!accessToken) {
        Swal.fire({
            icon: 'error',
            title: 'Vui Lòng Đăng Nhập',
            text: 'Đăng nhập trước khi thêm sản vào giỏ hàng.',
            confirmButtonColor: '#000000', 
          });
        navigate('/dang-nhap');
        return;
        }
        
        const response = await axios.post('http://127.0.0.1:8000/api/them-vao-gio-hang', {
            san_pham: sanPhamId,
            bien_the: bienTheId,
            so_luong: soLuong
        }, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });

        Swal.fire({
            icon: 'success', 
            title: 'Thêm Sản thành công!',
            text: response.data.message,
            confirmButtonColor: '#000000',
            })

    } catch (error) {
        console.log(error.response.data);
    Swal.fire({
        icon: 'error', 
        title: 'Thêm sản Phẩm Không Thành công!',
        text: error.response.data.error,
        confirmButtonColor: '#000000',
        });
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <button onClick={handleAddToFavorite} className='them-vao-gio-hang'>Thêm vào Giỏ Hàng</button>
  );
};

export default ThemSanPhamVaoGioHang;
