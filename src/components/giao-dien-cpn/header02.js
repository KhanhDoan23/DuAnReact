import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../stylecss/header02.css';
import { useLocation } from 'react-router-dom';
import '../../stylecss/giohang.css';
const HeaderDN = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const getPageName = (path) => {

    const pageNames = {
      '/dang-nhap': 'Đăng Nhập',
      '/forgot-password': 'Quên Mật Khẩu',
      '/dang-ky':'Đăng Ký Tài khoản',
      '/gio-hang':'Giỏ Hàng',
      '/tai-khoan':'Tài Khoản Người Dùng',
      '/danh-sach-yeu-thich':'Sản Phẩm Yêu Thích',
    };
    return pageNames[path] || path.substring(path.lastIndexOf('/') + 1);
  }

  const currentPageName = getPageName(currentPath);

  return (
     <>
    <div className="header02">
    <header className="simple-header">
      <div className="logo">
        <NavLink to="/">
          <img className='rounded-logo' src="logo-4.png" alt="Logo" />
        </NavLink>
      </div>
      <div className="login">
         <h1> {currentPageName}</h1>
      </div>
    </header>
    </div>
     </>
  );
};

export default HeaderDN;
