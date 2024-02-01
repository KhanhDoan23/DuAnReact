import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import '../../stylecss/sanpham.css';
const SanPhamTheoLoaiCPN = () => {
  const { id } = useParams();
  const [loaiSanPham, setLoaiSanPham] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/loai-san-pham/${id}`);
        setLoaiSanPham(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className="san-pham-theo-loai">
    <h2>Sản Phẩm - {loaiSanPham.ten_loai}</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="card">
        {loaiSanPham.ds_san_pham.map(sanPham => (
          <NavLink className="card-item" key={sanPham.id} to={`/san-pham/${sanPham.id}`}>
            {sanPham.hinh_anh && sanPham.hinh_anh.length > 0 ? (
              <img className="imgSP" src={`http://localhost:8000/${sanPham.hinh_anh[0].url}`} alt={`Hình ảnh sản phẩm`} />
            ) : (
              <img className="img" src="/loading.jpg" alt="Ảnh mặc định" />
            )}
            <div className="card-content">
              <p className="name">Tên Sản Phẩm: {sanPham.ten}</p>
              <p className="dungluong">Dung Lượng: {sanPham.san_pham_bien_the[0].dung_luong}</p>
              <p className="price">Giá: {sanPham.san_pham_bien_the[0].gia}</p>
            </div>
          </NavLink>
        ))}
      </div>
    )}
  </div>
  );
};

export default SanPhamTheoLoaiCPN;
