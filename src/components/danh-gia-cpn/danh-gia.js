import axios from "axios";
import { useEffect, useState } from "react";
import '../../stylecss/danhgiacpn.css';

const DanhGiaCPN = ({ id }) => {
  const [dsDanhGia, setDsDanhGia] = useState([]);
  const [soSaoFilter, setSoSaoFilter] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/danh-gia/${id}`);
        setDsDanhGia(response.data.data);
      } catch (error) {
        console.error('lỗi', error);
      }
    }

    fetchData();
  }, [id]);

  const tinhTongSoSao = () => {
    if (dsDanhGia.length === 0) {
      return 0;
    }
  
    const tongSoSao = dsDanhGia.reduce((total, danhGia) => total + danhGia.so_sao, 0);
    return tongSoSao / dsDanhGia.length;
  };

  const chonSoSao = (soSao) => {
    setSoSaoFilter(soSao);
  };

  const danhGiaFiltered = soSaoFilter !== null
    ? dsDanhGia.filter((danhGia) => danhGia.so_sao === soSaoFilter)
    : dsDanhGia;

  return (
    <div className="danh-gia-container">
      <div className="tong-so-sao">
        Tổng Số Sao Đánh Giá: {tinhTongSoSao()} Sao
      </div>
        <div className="soSao">
          <div className="filter-buttons">
            <button onClick={() => chonSoSao(1)}>1 Sao &#9733;</button>
            <button onClick={() => chonSoSao(2)}>2 Sao &#9733;</button>
            <button onClick={() => chonSoSao(3)}>3 Sao &#9733;</button>
            <button onClick={() => chonSoSao(4)}>4 Sao &#9733;</button>
            <button onClick={() => chonSoSao(5)}>5 Sao &#9733;</button>
            <button onClick={() => chonSoSao(null)}>Tất cả</button>
          </div>
        </div>

      {danhGiaFiltered.map((danhGia) => (
        <div key={danhGia.id} className="danh-gia-item">
          <p className="ten-khach-hang">Tên: {danhGia.khach_hang.ten}</p>
          <span className="so-sao">{'\u2605'.repeat(danhGia.so_sao)}</span>
          <p className="danh-gia-comments">Đánh Giá về sản Phầm: {danhGia.comments}</p>
        </div>
      ))}
    </div>
  );
}

export default DanhGiaCPN;
