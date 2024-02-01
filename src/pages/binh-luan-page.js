import React ,{useState} from 'react';
import BinhLuan from '../components/binh-luan-cpn/binh-luan'
import DanhSachBinhLuan from '../components/binh-luan-cpn/danh-sach-binh-luạn';

const BinhLuanPage = () => {
    const [openDanhGia, setOpenDanhGia] = useState(false);
  return (
      <>
        <button onClick={() => setOpenDanhGia(true)}>Bình Luận</button>
        {openDanhGia && <BinhLuan />}
        
        <DanhSachBinhLuan/>
      </>
  );
}

export default BinhLuanPage;
