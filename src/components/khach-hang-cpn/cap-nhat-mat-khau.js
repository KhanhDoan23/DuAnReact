import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../KhachHang.css';

const CapNhatMatKhau = () => {
  const [matKhauCu, setMatKhauCu] = useState('');
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('dang_nhap_token');
      const response = await axios.post('http://127.0.0.1:8000/api/cap-nhat-mat-khau', {
        mat_khau_cu: matKhauCu,
        mat_khau_moi: matKhauMoi,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      });

      if (!response.data.success) {
        setMessage(response.data.error);
      } else {
        Swal.fire({
          icon: 'success', 
          title: 'Cập Nhật thành công!',
          text: response.data.message,
          confirmButtonColor: '#000000',
        });
        navigate('/tai-khoan'); 
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <form className="cap-nhat-mat-khau-form" onSubmit={handleSubmit}>
      <label>
        Mật khẩu cũ:
        <input type="password" value={matKhauCu} onChange={(e) => setMatKhauCu(e.target.value)} />
      </label>
      <br />
      <label>
        Mật khẩu mới:
        <input type="password" value={matKhauMoi} onChange={(e) => setMatKhauMoi(e.target.value)} />
      </label>
      <button type="submit" className="update-password-button">Cập nhật thông tin</button>
      <p className="message">{message}</p>
    </form>
  );
};

export default CapNhatMatKhau;
