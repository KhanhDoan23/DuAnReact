import DanhSachGioHang from "../components/gio-hang-cpn/gio-hang-item";
import HeaderDN from "../components/giao-dien-cpn/header02";
const GioHang = ({ gioHang }) => {
    return (
      <>
        <HeaderDN/>
        <DanhSachGioHang/>
      </>
    );
  };

export default GioHang;