'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import banners
import banner1 from "@/assets/banner1.png"
import banner2 from "@/assets/banner2.jpg"
import banner3 from "@/assets/banner3.jpg"
import Link from 'next/link';

const Banner = () => {
    const bannerData = [
        {
            id: 1,
            image: banner1,
            title: "Transform Your Ideas Into Reality",
            subtitle: "Innovate. Create. Inspire.",
            description: "Discover a vault of innovative solutions to bring your vision to life"
        },
        {
            id: 2,
            image: banner2,
            title: "Collaborate & Create",
            subtitle: "Join the Community",
            description: "Connect with like-minded innovators and turn concepts into creations"
        },
        {
            id: 3,
            image: banner3,
            title: "Future Ready Solutions",
            subtitle: "Think Beyond Boundaries",
            description: "Explore cutting-edge ideas that shape tomorrow's world"
        }
    ];

    return (
        <div className="relative w-full h-full overflow-hidden ">
            <style jsx>{`
                .banner-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .banner-wrapper :global(.swiper) {
                    width: 100%;
                    height: 100%;
                    
                }

                .banner-wrapper :global(.swiper-slide) {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .banner-wrapper :global(.swiper-slide)::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(0, 0, 0, 0.7) 0%,
                        rgba(0, 0, 0, 0.3) 50%,
                        rgba(0, 0, 0, 0.1) 100%
                    );
                    z-index: 1;
                }

                .banner-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .banner-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                    text-align: center;
                    color: white;
                    width: 90%;
                    max-width: 900px;
                    padding: 20px;
                }

                .banner-content .badge {
                    display: inline-block;
                    padding: 8px 24px;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                    animation: fadeInUp 0.8s ease;
                }

                .banner-content h1 {
                    font-size: clamp(2.5rem, 8vw, 5.5rem);
                    font-weight: 800;
                    margin-bottom: 10px;
                    letter-spacing: -2px;
                    line-height: 1.1;
                    animation: fadeInUp 1s ease;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                }

                .banner-content h2 {
                    font-size: clamp(1.2rem, 3vw, 2.5rem);
                    font-weight: 300;
                    margin-bottom: 20px;
                    opacity: 0.9;
                    animation: fadeInUp 1.2s ease;
                }

                .banner-content p {
                    font-size: clamp(1rem, 1.5vw, 1.25rem);
                    font-weight: 300;
                    opacity: 0.9;
                    max-width: 600px;
                    margin: 0 auto 30px;
                    animation: fadeInUp 1.4s ease;
                }

                .banner-content .cta-group {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    animation: fadeInUp 1.6s ease;
                }

                .btn-primary {
                    padding: 14px 40px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
                }

                .btn-secondary {
                    padding: 14px 40px;
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: white;
                    transform: translateY(-2px);
                }

                // Custom Pagination Styles
                .banner-wrapper :global(.swiper-pagination) {
                    bottom: 40px !important;
                }

                .banner-wrapper :global(.swiper-pagination-bullet) {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                .banner-wrapper :global(.swiper-pagination-bullet-active) {
                    background: #667eea;
                    width: 40px;
                    border-radius: 6px;
                }

                // Animations
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                // Responsive
                @media (max-width: 768px) {
                    .banner-wrapper {
                        height: 70vh;
                        min-height: 400px;
                        max-height: 600px;
                    }

                    .banner-content {
                        width: 95%;
                        padding: 15px;
                    }

                    .banner-content h1 {
                        font-size: clamp(2rem, 10vw, 3rem);
                    }

                    .banner-content .badge {
                        font-size: 12px;
                        padding: 6px 18px;
                    }

                    .btn-primary,
                    .btn-secondary {
                        padding: 12px 30px;
                        font-size: 14px;
                        width: 100%;
                        max-width: 250px;
                    }

                    .banner-wrapper :global(.swiper-pagination) {
                        bottom: 20px !important;
                    }

                    .banner-wrapper :global(.swiper-pagination-bullet) {
                        width: 10px;
                        height: 10px;
                    }

                    .banner-wrapper :global(.swiper-pagination-bullet-active) {
                        width: 30px;
                    }
                }

                @media (max-width: 480px) {
                    .banner-wrapper {
                        height: 60vh;
                        min-height: 350px;
                        max-height: 500px;
                    }

                    .banner-content h1 {
                        font-size: clamp(1.8rem, 8vw, 2.5rem);
                    }

                    .banner-content .badge {
                        font-size: 10px;
                        padding: 4px 14px;
                        margin-bottom: 12px;
                    }

                    .banner-content p {
                        font-size: 14px;
                        margin-bottom: 20px;
                    }

                    .btn-primary,
                    .btn-secondary {
                        padding: 10px 24px;
                        font-size: 13px;
                    }
                }

                // Tablet
                @media (min-width: 769px) and (max-width: 1024px) {
                    .banner-wrapper {
                        height: 80vh;
                        min-height: 450px;
                        max-height: 700px;
                    }

                    .banner-content h1 {
                        font-size: clamp(3rem, 6vw, 4.5rem);
                    }
                }
            `}</style>

            <div className="banner-wrapper">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    loop={true}
                >
                    {bannerData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                className="banner-image"
                                priority={slide.id === 1}
                                quality={100}
                                sizes="100vw"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="banner-content">
                                <div className="badge  text-white"> {slide.subtitle}</div>
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                <div className="cta-group">
                                    <Link href="/ideas" passHref>
                                        <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform inline-flex items-center gap-2">
                                            <span>Explore Ideas </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;