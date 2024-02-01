import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../stylecss/dangnhap.css';
import Skeleton from '@mui/material/Skeleton';



const DangNhapCPN = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('dang_nhap_token');
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);


  const handleLogin = async () => {
    setLoading(true);
    try {

      const response = await axios.post('http://localhost:8000/api/dang-nhap', {
        email: email,
        password: password,
      });

      console.log('Response:', response.data);

     if (!response.data || !response.data.access_token) {
        setError(response.data.message);

    } else {
      const { access_token } = response.data;
      localStorage.setItem('dang_nhap_token', access_token);

      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: response.data.message,
        confirmButtonColor: '#000000', 
      });
    
      setTimeout(() => {
        navigate('/');
      }, 30);
    }

    } catch (error) {
      setError(error.response.data.message);
    } finally {
     setLoading(false);
    }
  };



  return (
    <>
          <div className="dang_nhap">
      <div className="login-page">
        <div className="left-section">
          <img src="logo-4.png" alt="Login" className="image" />
        </div>
        <div className="right-section">
          <div className="login-container">
            <h2>Đăng Nhập</h2>
            {loading ? (
              <div className="form-group">
                <Skeleton animation="wave" width={350} height={40} />
                <Skeleton animation="wave" width={350} height={40} />
                <button disabled>Đang Nhập</button>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập Email" />
                </div>
                <div className="form-group">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu của bạn"/>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin}>Đăng Nhập</button>
                <div className="additional-links">
                  <a href="/forgot-password">Quên mật khẩu?</a>
                  <span> | </span>
                  <a href="/dang-ky">Đăng ký</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DangNhapCPN;
