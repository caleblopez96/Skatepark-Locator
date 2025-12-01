import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import pic1 from "../assets/EspeePark.avif";
import pic2 from "../assets/FreeStonePark.webp";
import pic3 from "../assets/ManselPark.jpg";
import pic4 from "../assets/ChandlerSkatepark.webp";
import pic5 from "../assets/TempeSkatepark.webp";
import pic6 from "../assets/AJS.webp";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
    return (
        <section id="home" className="w-full bg-gray-900 text-white py-10 md:py-30 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* left */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">Find Skateparks Near You</h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-md">
                        Discover the best skateparks in Phoenix, check bike-friendly parks, see today’s weather, and build your favorites
                        list.
                    </p>

                    <a
                        id="locator"
                        href="#allParks"
                        className="inline-block bg-gray-200 text-gray-800 transition-colors px-6 py-3 rounded-lg font-medium text-lg hover:scale-105"
                    >
                        Explore Parks
                    </a>
                </div>
                {/* right side carousel */}
                <div className="w-full h-64 md:h-80 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic1} className="w-full h-full object-cover" alt="Espee Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Espee Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic2} className="w-full h-full object-cover" alt="Freestone Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Freestone Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic3} className="w-full h-full object-cover" alt="Mansel Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Mansel Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic4} className="w-full h-full object-cover" alt="Chandler Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Chandler Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic5} className="w-full h-full object-cover" alt="Tempe Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Tempe Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-full group">
                                <img src={pic6} className="w-full h-full object-cover" alt="Apache Junction Skatepark" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-xl font-semibold">Apache Junction Skatepark</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
