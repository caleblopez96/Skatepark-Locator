import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import pic1 from "../assets/EspeePark.avif";
import pic2 from "../assets/FreeStonePark.webp";
import pic3 from "../assets/ManselPark.jpg";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
    return (
        <section className="w-full bg-gray-900 text-white py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* LEFT SIDE — TEXT */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Skateparks Near You</h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-md">
                        Discover the best skateparks in Phoenix, check bike-friendly parks, see today’s weather, and build your favorites
                        list.
                    </p>

                    <a
                        href="#skateparks"
                        className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-lg font-medium text-lg"
                    >
                        Explore Parks
                    </a>
                </div>

                {/* RIGHT SIDE — SWIPER CAROUSEL */}
                <div className="w-full h-64 md:h-80 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img src={pic1} className="w-full h-full object-cover" alt="tes" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={pic2} className="w-full h-full object-cover" alt="test" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={pic3} className="w-full h-full object-cover" alt="test" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
