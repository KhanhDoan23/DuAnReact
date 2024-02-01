import React from 'react'; 
import { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isTokenExpired } from '../dang-nhap-cpn/kiem-tra-token';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../stylecss/Header.css';

const Header = () => {
    const [dangNhap, setDangNhap] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

      const accessToken = localStorage.getItem('dang_nhap_token');

      if (isTokenExpired(accessToken)) {
        localStorage.removeItem('dang_nhap_token');
        Swal.fire({
          icon: 'error',
          title: 'Token Hết Hạn',
          text: 'Vui lòng đăng nhập lại để xem giỏ hàng.',
          confirmButtonColor: '#000000',
        });
        navigate('/dang-nhap');
        return;
      }

      setDangNhap(!!accessToken);
      
      if (!accessToken) {
        setDangNhap(false); 
      }
    }, [navigate]);

    

  return (
     <>
     <div className='headerAll'>
      <header className="header">
      <div className="top-section">
        
      <div className="img">
        <NavLink to="/" className="NavLink ">
            <img className='rounded-logo' src="/logo-4.png" alt="Logo" />
        </NavLink>
        </div>
        <div className="">
          <NavLink to="/" className="NavLink" >Home</NavLink>
        </div>
        <div className="notifications">
          <span>Thông báo</span>
        </div>
        <div className="support">
          <span>Hỗ trợ</span>
        </div>
        {dangNhap ? (
        <div className="auth">
          <NavLink to="/tai-khoan" className="NavLink" >Tài Khoản</NavLink>
        </div>
        ):(
        <div className="auth">
          <NavLink to="/dang-nhap" className="NavLink" >Đăng nhập</NavLink> | <NavLink to="/dang-ky" className="NavLink" >Đăng ký</NavLink>
        </div>
        )}
        <div className="cart">
          <NavLink to="/gio-hang" className="NavLink">Giỏ hàng</NavLink>
        </div>
      </div>



    </header>
    </div>
     </>
  );
};

export default Header;
