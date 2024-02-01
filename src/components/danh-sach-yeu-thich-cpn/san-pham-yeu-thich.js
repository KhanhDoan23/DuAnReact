import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../stylecss/giohang.css';
const ThemSanPhamYeuThich = ({ sanPhamId, bienTheId }) => {
    const navigate = useNavigate();

  const handleAddToFavorite = async () => {
    try {
    const accessToken = localStorage.getItem('dang_nhap_token');
    
    if (!accessToken) {
        Swal.fire({
            icon: 'error',
            title: 'Vui Lòng Đăng Nhập',
            text: 'Đăng nhập trước khi thêm sản phẩm yêu thích.',
            confirmButtonColor: '#000000', 
          });
        navigate('/dang-nhap');
        return;
        }
     
      const response = await axios.post('http://127.0.0.1:8000/api/san-pham-yeu-thich', {
        san_pham: sanPhamId,
        bien_the: bienTheId
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
            });

    } catch (error) {
    Swal.fire({
        icon: 'error', 
        title: 'Không Thành công!',
        text: error.response.data.error,
        confirmButtonColor: '#000000',
        });
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <button onClick={handleAddToFavorite} className='them-yeu-thich'>Thêm vào danh sách yêu thích</button>
  );
};

export default ThemSanPhamYeuThich;
