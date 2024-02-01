import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../stylecss/giohang.css';
const ThanhToanButton = ({ selectedProducts }) => {

  const handleCheckout = () => {

    if (selectedProducts.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn sản phẩm',
        text: 'Vui lòng chọn ít nhất một sản phẩm để Mua.',
      });
      return;
    }
    const accessToken = localStorage.getItem('dang_nhap_token');

    axios.post('http://127.0.0.1:8000/api/mua-hang', { gio_hang_ids: selectedProducts }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, 
      },
    })
    .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Mua Hàng thành công!',
          text: response.data.message,
        }).then((result) => {
          if (result.isConfirmed) {
              window.location.reload();
          }
        });
        console.log(response.data.hoa_don);
      })
    .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi thanh toán',
          text: `Có lỗi xảy ra: ${error.message}`,
        });
        console.error('Error during checkout:', error);
      });
  };

  return (
    <button onClick={handleCheckout} className="thanh-toan-button">Mua Hàng</button>
  );
};

export default ThanhToanButton;
