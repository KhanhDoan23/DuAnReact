import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../stylecss/binhluan.css';
const XoaBinhLuan = ({ Comments }) => {
    const [nguoiDung,setNguoiDung] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('dang_nhap_token');
    
        if (accessToken) {
          axios.get('http://127.0.0.1:8000/api/khach-hang', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            setNguoiDung(response.data.data);
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
          });
        }
      }, []);

    const handleXoaBinhLuan = async () => {
        try {
        const accessToken = localStorage.getItem('dang_nhap_token');
        const response = await axios.post('http://127.0.0.1:8000/api/xoa-binh-luan',{
            comments: Comments.id,
            },{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });

            Swal.fire({
                icon: 'success', 
                title: 'Xóa Thành công!',
                text:  response.data.message,
                confirmButtonColor: '#000000',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
        } catch (error) {
        console.error('Error removing from favorites:', error);
        alert('Có lỗi khi xóa Binh Luận.');
        }
    };

    return nguoiDung && nguoiDung.id === Comments.khach_hang.id ? (
        <p className="xoa" href="#" onClick={handleXoaBinhLuan}>
        Xóa
        </p>
    ) : null ;
};

export default XoaBinhLuan;
