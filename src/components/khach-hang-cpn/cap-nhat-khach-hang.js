
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../KhachHang.css';

const CapNhatKhachHang = () => {
  const [ten, setTen] = useState('');
  const [sdt, setSdt] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [thongTin, setThongTin] = useState({
    ten: '',
    sdt: '',
    dia_chi: '',
  });

  useEffect(() => {
    const layThongTinHienTai = async () => {
      try {
        const accessToken = localStorage.getItem('dang_nhap_token');
        const response = await axios.get('http://127.0.0.1:8000/api/khach-hang', {
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
          },
        });

        setThongTin(response.data.data);
      } catch (error) {
        console.error('Lỗi:', error);
        setMessage('Đã xảy ra lỗi khi lấy thông tin tài khoản hiện tại.');
      }
    };

    layThongTinHienTai();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('dang_nhap_token');
      const response = await axios.post('http://127.0.0.1:8000/api/cap-nhat', {
        ten: ten,
        sdt: sdt,
        dia_chi: diaChi,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      });

      setMessage(response.data.message);

      Swal.fire({
        icon: 'success',
        title: 'Cập Nhật thành công!',
        text: '',
        confirmButtonColor: '#000000',
      });
      navigate('/tai-khoan'); 
    } catch (error) {
      console.error('Lỗi:', error);
      setMessage('Đã xảy ra lỗi khi cập nhật thông tin tài khoản.');
    }
  };

  return (
    <form className="cap-nhat-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Tên:
          <input type="text" value={ten || thongTin.ten} onChange={(e) => setTen(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Số điện thoại:
          <input type="text" value={sdt || thongTin.sdt} onChange={(e) => setSdt(e.target.value)} />
        </label>
      </div> 
      <div className="form-group">
        <label>
          Địa chỉ:
          <input type="text" value={diaChi || thongTin.dia_chi} onChange={(e) => setDiaChi(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <button type="submit" className="update-button">Cập nhật thông tin</button>
      </div>
      <p className="message">{message}</p>
    </form>
  );
};

export default CapNhatKhachHang;
