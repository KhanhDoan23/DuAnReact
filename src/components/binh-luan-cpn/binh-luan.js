import React, { useState } from 'react';
import axios from 'axios';
import '../../stylecss/binhluan.css';
const BinhLuan = () => {
  const [comments, setComments] = useState('');

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('dang_nhap_token');
      const response = await axios.post('http://127.0.0.1:8000/api/them-binh-luan', {
        comments: comments,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Có lỗi khi gửi Bình Luận.');
    }
  };

  return (
    <div className="binh-luan-container">
      <h2 className="binh-luan-title">Bình Luận</h2>
      <div>
        <label className="binh-luan-label">Bình luận:</label>
        <textarea className="binh-luan-textarea" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
      </div>
      <button className="binh-luan-button" onClick={handleSubmit}>Gửi Bình Luận</button>
    </div>
  );
};

export default BinhLuan;
