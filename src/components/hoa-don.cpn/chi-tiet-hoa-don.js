import React, { useState } from 'react';
import DanhGiaSanPham from '../danh-gia-cpn/them-danh-gia';
import '../../stylecss/chitiethoadon.css';
const ChiTietHoaDon = ({ chiTietHoaDon, hoaDonId, dongChiTiet }) => {
    const  [danhGia, setHienThiDanhGia] = useState(false);

    const handleDanhGia = () =>{
        setHienThiDanhGia(false)
    }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Chi Tiết Hóa Đơn:</p>
        <ul>
          {chiTietHoaDon.chi_tiet_hoa_don_xuat.map((chiTiet) => (
            <li key={chiTiet.id}>
              <p>Tên Sản Phẩm: {chiTiet.san_pham.ten}</p>
              <p>Màu: {chiTiet.san_pham_bien_the.mau}</p>
              <p>Dung Lượng: {chiTiet.san_pham_bien_the.dung_luong}</p>
              <p>Số Lượng: {chiTiet.so_luong}</p>
              <p>Đơn Giá: {chiTiet.don_gia}</p>
              {chiTietHoaDon.status === 3 && (
                <div>
                  <button onClick={() => setHienThiDanhGia(true)}>
                    Đánh Giá Sản Phẩm
                  </button>
                  {danhGia  && (
                    <DanhGiaSanPham
                      hoaDonId={hoaDonId}
                      sanPhamId={chiTiet?.san_pham?.id}
                      setHienThiDanhGia={setHienThiDanhGia}
                      daDanhGia={handleDanhGia}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick={dongChiTiet}>Đóng</button>
      </div>
    </div>
  );
};

export default ChiTietHoaDon;
