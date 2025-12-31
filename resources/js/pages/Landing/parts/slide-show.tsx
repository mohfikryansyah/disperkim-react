import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/slideshow.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import TitikLokasiPJU from './titik-lokasi-pju';
import TabelRingkasanKecamatan from '@/pages/sidebar/dashboard/table-ringkasan';
import { PropsDashboard } from '@/pages/sidebar/dashboard/interface-dashboard';

export default function SlideShow({
    totals,
    totalsPerKecamatans,
    subdistricts,
    lampsStatistic,
    cableLength,
    lampsStatisticForRequiredItem,
    lamps,
    streets,
    panels,
}: PropsDashboard) {
  return (
    <main className='w-full h-screen overflow-hidden'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-screen"
      >
        <SwiperSlide>
            <TabelRingkasanKecamatan subdistricts={subdistricts}/>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </main>
  );
}
