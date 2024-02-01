import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import ThemSanPhamYeuThich from '../danh-sach-yeu-thich-cpn/san-pham-yeu-thich';
import ThemSanPhamVaoGioHang from '../gio-hang-cpn/them-vao-gio-hang';
import '../../SanPham.css';
import DanhGiaCPN from '../danh-gia-cpn/danh-gia';

const ChiTietSanPhamCPN = () => {
  const { id } = useParams();
  const [sanPham, setSanPham] = useState(null);
  const [bienThe, setBienThe] = useState(null);
  const [soLuong, setSoLuong] = useState(1);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/san-pham/${id}`);
        const product = response.data.data;

        setSanPham(product);
        setBienThe(product.san_pham_bien_the[0]);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [id]);

  const chonBienThe = (variant) => {
    setBienThe(variant);
  };

  
  const chonSoLuong = (amount) => {
    setSoLuong(Math.max(1, soLuong + amount));
  };


  return (
    <div className="ChiTietSanPhamCPN"> {/* Thêm className */}
      {sanPham && (
        <div>
          <h2>Tên sản phẩm: {sanPham.ten}</h2>
          <p>Loại : {sanPham.loai_san_pham.ten_loai}</p>
          <ul>
            {sanPham.san_pham_bien_the.map((variant) => (
              <li key={variant.id}>
                <button onClick={() => chonBienThe(variant)}>
                  {variant.dung_luong} - {variant.mau}
                </button>
              </li>
            ))}
          </ul>
          <h3>Chi Tiết Về Sản Phẩm </h3>
          {bienThe && (
            <div>
              <p>{bienThe.mo_ta}</p>
              <p>Màn Hình: {bienThe.man_hinh}</p>
              <p>Camera: {bienThe.camera}</p>
              <p>Hệ Điều Hành: {bienThe.he_dieu_hanh}</p>
              <p>Chip: {bienThe.chip}</p>
              <p>Ram: {bienThe.ram}</p>
              <p>Dung Lượng: {bienThe.dung_luong}</p>
              <p>Màu : {bienThe.mau}</p>
              <p>Giá: {bienThe.gia}</p>
            </div>
          )}
          <h3>Images:</h3>
          <div>
            {sanPham.hinh_anh.map((image, index) => (
              <img key={index} className="img" src={`http://localhost:8000/${image.url}`} alt={`Hình ảnh sản phẩm ${sanPham.id}`} />
            ))}
          </div>
          <div>
          <button onClick={() => chonSoLuong(-1)}>-</button>
          <span>{soLuong}</span>
          <button onClick={() => chonSoLuong(1)}>+</button>
        </div>
          <ThemSanPhamVaoGioHang sanPhamId={sanPham.id} bienTheId={bienThe.id} soLuong={soLuong} />
              
          <ThemSanPhamYeuThich sanPhamId={sanPham.id} bienTheId={bienThe.id} />
          
          <div className="NavLinkWrapper"> 
            <NavLink to="/danh-sach-yeu-thich" className="NavLink">Sản Phẩm Yêu Thích</NavLink>
          </div>

          <div>
            <h1>Đánh Giá Vê Sản Phẩm</h1>
            <DanhGiaCPN id={sanPham.id}/>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChiTietSanPhamCPN;
