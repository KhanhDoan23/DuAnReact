import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XoaBinhLuan from './xoa-binh-luan';

const DanhSachBinhLuan = () => {
  const [danhSachBinhLuan, setDanhSachBinhLuan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.post(`http://127.0.0.1:8000/api/binh-luan`);

        setDanhSachBinhLuan(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
    <h2>Bình Luận</h2>
    <div>
      {danhSachBinhLuan.map((binhLuan) => (
        <div key={binhLuan.id} className="binhLuanContainer">
          <p>Tài Khoản: {binhLuan.khach_hang.ten}</p>
          <p>comment: {binhLuan.comments}</p>
          <XoaBinhLuan Comments={binhLuan}/>
        </div>
      ))}
    </div>
  </div>
  );
};

export default DanhSachBinhLuan;
