import { Routes,Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Footer from './components/giao-dien-cpn/footer';
import ChiTietSanPhamPage from './pages/chi-tiet-page';
import SanPhamTheoLoaiPage from './pages/san-pham-theo-loai-page';
import GioHang from './pages/gio-hang';
import DangKyPage from './pages/dang-ky-page';
import DangNhapPage from './pages/dang-nhap-page';
import ResetMatKhauPage from './pages/reset-mat-khau-page';
import TrangChu from './pages/trang-chu.page';
import KhachHangPage from './pages/khach-hang-page';
import CapNhatKhachHang from './components/khach-hang-cpn/cap-nhat-khach-hang';
import CapNhatMatKhau from './components/khach-hang-cpn/cap-nhat-mat-khau';
import DanhSachYeuThichPage from './pages/san-pham-yeu-thich-page';
import HoaDonPage from './pages/hoa-don-page';
function App() {
  return (
    <>
      <Routes>  
          <Route path="/" element={<TrangChu/>}/>
          <Route path="/loai-san-pham/:id" element={<SanPhamTheoLoaiPage/>} />
          <Route path="/gio-hang" element={<GioHang/>} />
          <Route path="/hoa-don" element={<HoaDonPage/>} />
          <Route path="/san-pham/:id" element={<ChiTietSanPhamPage/>} />
          <Route path="/dang-nhap" element={<DangNhapPage/>} />
          <Route path="/dang-ky" element={<DangKyPage/>} />
          <Route path="/tai-khoan" element={<KhachHangPage/>} />
          <Route path="/cap-nhat-tai-khoan" element={<CapNhatKhachHang/>} />
          <Route path="/cap-nhat-mat-khau" element={<CapNhatMatKhau/>} />
          <Route path="/forgot-password" element={<ResetMatKhauPage/>} />
          <Route path="/danh-sach-yeu-thich" element={<DanhSachYeuThichPage/>} />
      </Routes>
      <Footer/>

    </>
  );
}


export default App;
