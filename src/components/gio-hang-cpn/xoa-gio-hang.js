import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../stylecss/giohang.css';
const XoaSanPhamKhoiGioHang = ({ XoaId }) => {
  const handleXoaSanPham = async () => {
    try {
      const accessToken = localStorage.getItem('dang_nhap_token');

      if (!accessToken) {
        alert('Vui lòng Đăng Nhập');
      }

      const response = await axios.delete(`http://127.0.0.1:8000/api/xoa-gio-hang/${XoaId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Xóa Thành Công!',
        text: response.data.message,
        confirmButtonColor: '#000000',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Xóa Không Thành Công!',
        text: error.response.data.error,
        confirmButtonColor: '#000000',
      });
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <button className="xoa-san-pham-button" onClick={handleXoaSanPham}>
      <span className="trash-icon">&#128465;</span> Xóa khỏi giỏ hàng
    </button>
  );
};

export default XoaSanPhamKhoiGioHang;
