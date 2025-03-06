import "swiper/css";
import "swiper/css/pagination";
import "./_gallery.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

import { useState } from "react";

export default function Gallery({ slides = [] }) {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  return (
    <section className="rethink-product-gallery slider">
      <div className="slider__flex">
        <div className="slider__col">
          <div className="slider__prev">
            <GoChevronUp />
          </div>
          <div className="slider__thumbs">
            <Swiper
              onSwiper={setImagesNavSlider}
              direction="vertical"
              spaceBetween={24}
              slidesPerView={3}
              navigation={{
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
              }}
              loop={true}
              className="swiper-container-thumbnail"
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index + slide}>
                    <div className="slider__image">
                      <img src={slide} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="slider__next">
            <GoChevronDown />
          </div>
        </div>

        <div className="slider__images">
          <Swiper
            thumbs={{ swiper: imagesNavSlider }}
            direction="vertical"
            slidesPerView={1}
            spaceBetween={32}
            mousewheel={true}
            loop={true}
            navigation={{
              nextEl: ".slider__next",
              prevEl: ".slider__prev",
            }}
            className="swiper-container-main"
            modules={[Navigation, Thumbs]}
          >
            {slides.map((slide, index) => {
              return (
                <SwiperSlide key={index + slide}>
                  <div className="slider__image">
                    <img src={slide} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
