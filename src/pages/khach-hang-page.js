import KhachHangCPN from "../components/khach-hang-cpn/khach-hang";
import DangXuatCPN from "../components/dang-nhap-cpn/dang-xuat";
import HeaderDN from "../components/giao-dien-cpn/header02";
import HoaDonPage from "./hoa-don-page";
function KhachHangPage(){
  
    return(
    <>
    <HeaderDN/>
    <KhachHangCPN/>
    <DangXuatCPN/>
    <HoaDonPage/>
    </>
    );
}

export default KhachHangPage;