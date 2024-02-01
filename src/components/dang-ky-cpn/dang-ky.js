import React, { useState } from 'react';
import axios from 'axios';
import { Navigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import Skeleton from '@mui/material/Skeleton';
import '../../stylecss/dangky.css';
const DangKyCPN = () => {

  const [formData, setFormData] = useState({
    ten: '',
    sdt: '',
    email: '',
    password: '',
    repassword: '',   
    dia_chi: ''
  });

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password !== formData.repassword) {
      setError('Mật khẩu và Nhập lại mật khẩu không khớp.');
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dang-ky', formData);
      console.log('Dữ liệu đã được gửi:', response.data);

      if (!response.data.success) {
        setError(response.data.message);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Vui lòng xác nhận Email để có thể Đăng Nhập',
          confirmButtonColor: '#000000', 
        }).then(() => {
          setRedirect(true);
        });
      }
    
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/dang-nhap" />
  }

  return (
    <div className='dang_ky'>
      <div className="container">
        <h2>Đăng Ký</h2>
        {loading ? (
          <div>
            <Skeleton animation="wave" width={50} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <Skeleton animation="wave" width={100} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <Skeleton animation="wave" width={60} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <Skeleton animation="wave" width={70} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <Skeleton animation="wave" width={120} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <Skeleton animation="wave" width={60} height={40} />
            <Skeleton animation="wave" width={400} height={40} />
            <button type="submit">Đăng Ký</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="ten">Tên</label>
            <input type="text" id="ten" name="ten" value={formData.ten} onChange={handleChange} />

            <label htmlFor="sdt">Số Điện Thoại</label>
            <input type="tel" id="sdt" name="sdt" value={formData.sdt} onChange={handleChange} />
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  />

            <label htmlFor="password">Mật Khẩu</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

            <label htmlFor="repassword">Nhập lại Mật Khẩu</label>
            <input type="password" id="repassword" name="repassword" value={formData.repassword} onChange={handleChange}  />

            <label htmlFor="dia_chi">Địa Chỉ:</label>
            <input type="text" id="dia_chi" name="dia_chi" value={formData.dia_chi} onChange={handleChange}  />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Đăng Ký</button>
          </form>
        )}
      </div>
    </div>    
  );
};

export default DangKyCPN;
