import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../stylecss/danhgia.css';


const DanhGiaSanPham = ({ hoaDonId, sanPhamId, setHienThiDanhGia, daDanhGia }) => {
  const [soSao, setSoSao] = useState(0);
  const [comments, setComments] = useState('');

  const submitReview = async () => {
    try {
      const accessToken = localStorage.getItem('dang_nhap_token');

      await axios.post(`http://127.0.0.1:8000/api/them-danh-gia`, {
        hoaDonId: hoaDonId,
        sanPhamId: sanPhamId,
        soSao: soSao,
        comments: comments,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setHienThiDanhGia(false);

      Swal.fire({
        icon: 'success',
        title: 'Đánh Giá thành công!',
        text: 'Cảm Ơn Bạn Đã gửi Đánh Giá',
        confirmButtonColor: '#000000',
      });

      daDanhGia();

    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Cảnh Báo!',
        text: error.response.data.error,
        confirmButtonColor: '#000000',
      });
      daDanhGia();
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h3>Đánh Giá Sản Phẩm</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={soSao >= star ? 'star selected' : 'star'}
            onClick={() => setSoSao(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <label>Cảm Nhận: </label>
      <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
      <button onClick={submitReview}>Gửi Đánh Giá</button>
    </div>
  );
};

export default DanhGiaSanPham;
