import axios from 'axios';
import Swal from 'sweetalert2';

export const thayDoiTranThai = async (hoaDonId, trangThai ) => {
    try {
      const accessToken = localStorage.getItem('dang_nhap_token');
      await axios.post(`http://127.0.0.1:8000/api/thay-doi-trang-thai/${hoaDonId}`, 
        {
            trangThai:trangThai
        }, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        if(trangThai===3){
            Swal.fire({
                icon: 'success',
                title: 'Cảm Ơn',
                text: 'cảm ơn bạn đã mua hàng.',
                confirmButtonColor: '#000000', 
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Đã Hủy',
                text: 'Đã Hủy Hóa Đơn Của bạn.',
                confirmButtonColor: '#000000', 
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
