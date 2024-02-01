import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../stylecss/dangxuat.css';
const DangXuatCPN = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
     
            const accessToken = localStorage.getItem('dang_nhap_token');

           const response = await axios.post('http://127.0.0.1:8000/api/dang-xuat', null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data.message);
            localStorage.removeItem('dang_nhap_token');
    
            Swal.fire({
                icon: 'success',
                title: 'Đăng Xuất thành công!',
                text: 'Hẹn Gặp Lại',
                confirmButtonColor: '#000000',
            });
    
            navigate('/dang-nhap');
    
        } catch (error) {
            // localStorage.removeItem('dang_nhap_token');
            console.error('Đăng xuất không thành công:', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi đăng xuất!',
                text: 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.',
                confirmButtonColor: '#000000',
            });
        }
    };
    
  
    return (
      <button className='dangxuat' onClick={handleLogout}>Đăng Xuất</button>
    );

};
  
export default DangXuatCPN;
  