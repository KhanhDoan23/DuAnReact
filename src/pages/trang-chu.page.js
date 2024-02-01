import React from 'react';
import Header from '../components/giao-dien-cpn/header';
import SanPhamCPN from '../components/san-pham-cpn/san-pham';
import BinhLuanPage from './binh-luan-page';
import '../stylecss/dangnhap.css';

const TrangChu = () => {
  
  return (
    <>
    <Header/>
    <SanPhamCPN/>
    <BinhLuanPage/>
    </>
  );
};

export default TrangChu;
