    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import '../../stylecss/danhmuc.css';
    import Skeleton from '@mui/material/Skeleton';
    import { NavLink } from 'react-router-dom';


    const DanhMucSanPham = () => {
    const [dsLoaiSanPham, setDsLoaiSanPham] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/loai-san-pham');
            setDsLoaiSanPham(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);  


    return (
        <>
            <div className="danh-muc-san-pham">
            <h2>Danh Mục Sản Phẩm</h2>
            {loading ? (
                <div className="categories-list">
                    <Skeleton animation="wave"  width={100} height={100} />
                </div>
            ) : (
                <div className="categories-list">
                {dsLoaiSanPham.map(dsLoaiSanPham => (
                    <NavLink key={dsLoaiSanPham.id} to={`/loai-san-pham/${dsLoaiSanPham.id}`}>
                        <img className="picDanhMuc" src={`http://localhost:8000/${dsLoaiSanPham.img}`} alt={`${dsLoaiSanPham.ten_loai}`} />
                    </NavLink>
                ))}
                </div>
            )}
            </div>
            </>
    );
    };

    export default DanhMucSanPham;
