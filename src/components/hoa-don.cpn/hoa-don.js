import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { thayDoiTranThai } from './thay-doi-trang-thai';
import ChiTietHoaDon from './chi-tiet-hoa-don';
import '../../SanPham.css';
import '../../stylecss/hoadon.css';

const DsHoaDon = () => {
  const [loading, setLoading] = useState(true);
  const [dsHoaDon, setDsHoaDon] = useState([]);
  const [trangThai, setTrangThai] = useState(0);
  const [chiTietHoaDon, setChiTietHoaDon] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('dang_nhap_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/xem-hoa-don?status=${trangThai}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDsHoaDon(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [trangThai]);

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'Chờ Duyệt';
      case 1:
        return 'Đã Duyệt';
      case 2:
        return 'Đang Giao';
      case 3:
        return 'Đã Giao';
      case 4:
        return 'Đã Hủy';
      default:
        return 'Trạng thái không xác định';
    }
  };

  const chonTrangThai = (newStatus) => {
    setTrangThai(newStatus);
  };

  const xemChiTiet = (hoaDonId) => {
    const hoaDonCanXem = dsHoaDon.find((hoaDon) => hoaDon.id === hoaDonId);
    if (hoaDonCanXem) {
      setChiTietHoaDon(hoaDonCanXem);
    } else {
      console.error(`Không tìm thấy hóa đơn`);
    }
  };

  const dongChiTiet = () => {
    setChiTietHoaDon(null);
  };



  return (
    <div className="ds-hoa-don-container">
      <div className="button-container">
        <button className="button button-green" onClick={() => chonTrangThai(0)}>Đã Mua</button>
        <button className="button button-blue" onClick={() => chonTrangThai(1)}>Đã Duyệt</button>
        <button className="button button-green" onClick={() => chonTrangThai(2)}>Đang Giao</button>
        <button className="button button-blue" onClick={() => chonTrangThai(3)}>Đã Giao</button>
        <button className="button button-red" onClick={() => chonTrangThai(4)}>Đã Hủy</button>
      </div>
      {loading ? (
        <div className="">
          <Skeleton animation="wave" width={100} height={50} />
          <Skeleton animation="wave" width={50} height={40} />
          <Skeleton animation="wave" width={200} height={40} />
          <Skeleton animation="wave" width={150} height={40} />
        </div>
      ) : (
        dsHoaDon.map((hoaDon) => (
          <div key={hoaDon.id} className="text-container">
            <h1>Hóa Đơn {hoaDon.id}</h1>
            <p>ID: {hoaDon.id}</p>
            <p>Tổng tiền: {hoaDon.tong_tien}</p>
            <p>Trạng thái: {getStatus(hoaDon.status)}</p>

            {hoaDon.status === 2 && (
              <button onClick={() => thayDoiTranThai(hoaDon.id, 3)}>Đã Nhận Hàng</button>
            )}
            {hoaDon.status === 1 && (
              <button onClick={() => thayDoiTranThai(hoaDon.id, 4)}>Hủy Đơn</button>
            )}
            {hoaDon.status === 0 && (
              <button onClick={() => thayDoiTranThai(hoaDon.id, 4)}>Hủy Đơn</button>
            )}

            <button onClick={() => xemChiTiet(hoaDon.id)}>Xem chi tiết</button>
      
            {chiTietHoaDon && chiTietHoaDon.id === hoaDon.id && (
              <ChiTietHoaDon
                chiTietHoaDon={chiTietHoaDon}
                hoaDonId={hoaDon.id}
                thayDoiTranThai={thayDoiTranThai}
                dongChiTiet={dongChiTiet}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DsHoaDon;

