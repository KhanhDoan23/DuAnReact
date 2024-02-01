import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../stylecss/Resetmatkhau.css'
import Skeleton from '@mui/material/Skeleton';
const ResetMatKhauCPN = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      
      setMessage(response.data.message);
      
      Swal.fire({
        icon: 'success',
        title: 'Đã Gửi!',
        text: 'vui lòng kiểm tra email để thay đổi mật khẩu',
        confirmButtonColor: '#000000',
        confirmButtonText: 'Đồng ý',
      });
      
      navigate('/dang-nhap');
      
    } catch (error) {
        console.error('Error sending reset password email:', error);
        setMessage('email không tồn tại hoặc không đúng');
    } finally {
        setLoading(false);
    }
  };

  return (
  <div className="resetPassword">
        <div className="container-reset">
        <h2>Quên mật khẩu</h2>
        {loading ? (
            <div>
                <Skeleton animation="wave" width={300} height={90} />
                <button>Gửi Email</button>
            </div>
        ) : ( 
            <>  
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Nhập Email"/>
                {message && <div className="error-message">{message}</div>}
                <button onClick={handleForgotPassword}>Gửi Email</button>
            </>
        )}
    </div>
  </div>
  );
};

export default ResetMatKhauCPN;
