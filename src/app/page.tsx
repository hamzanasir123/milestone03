"use client";
import { useEffect, useState } from "react";
import { FooterOne } from "@/Components/Footer/Footer";
import Home from "@/Components/Home/Home";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import { BackgroundGradient } from "@/Components/ui/background-gradient";
import Image from "next/image";
import { StyledWrapper } from "@/Components/CartButton/CartBottun";
import courseData from "@/Data/music_courses.json";
import Link from "next/link";
import "./globals.css";


interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  isFeatured: boolean;
  image?: string;
}


interface CartItem {
  id: number;
}

function Page() {
    const featuredCourses = courseData.courses.filter(
      (course: Course) => course.isFeatured
    );
    const [cartData, setCartData] = useState<CartItem | null>(null);
    const [removeCartData, setRemoveCartData] = useState<number | null>(null);
    const [cartStorage, setCartStorage] = useState<CartItem[]>([]);
    const [cartIds, setCartIds] = useState<number[]>([]);

    useEffect(() => {
      if(typeof window !== 'undefined'){
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart) as CartItem[];
          setCartStorage(parsedCart); 
          setCartIds(parsedCart.map((item) => item.id));
           if(storedCart.length === 0){
          localStorage.removeItem("cart");
        };
        };
      };
    },[])
    const addToCart = (item: any) => {
      setCartData(item);
      const updatedCartIds = [...cartIds, item.id];
      setCartIds(updatedCartIds);
      const updatedCartStorage = [...cartStorage, item];
      setCartStorage(updatedCartStorage);
      localStorage.setItem("cart", JSON.stringify(updatedCartStorage));
      setRemoveCartData(null);
    };
    const removeFromCart = (id: any) => {
      setRemoveCartData(id);
      const updatedCartIds = cartIds.filter((itemId) => itemId !== id);
      setCartIds(updatedCartIds);
      const updatedCartStorage = cartStorage.filter((item) => item.id !== id);
      setCartStorage(updatedCartStorage);
      localStorage.setItem("cart", JSON.stringify(updatedCartStorage));
      setCartData(null);
    };
    return (
      <>
        <Navbar cartData={cartData} removeCartData={removeCartData} />
        <Home />
        <div className="py-12 bg-gray-900">
          <div>
            <div className="text-center">
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                FEATURED PRODUCTS
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Buy With the Best
              </p>
            </div>
          </div>
          <div className="mt-10 mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {featuredCourses.map((course: Course) => (
                <div key={course.id}
                 className="flex justify-center">
                  <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                    <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                      <Image
                        src={course.image  ?? 'https://manzeil.com/wp-content/uploads/2024/08/GET-THE-APP-800x800.png'}
                        alt="jordans"
                        height="400"
                        width="400"
                        className="object-contain"
                      />
                      <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                        {course.title}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                        {course.description}
                      </p>
                      <br />
                      <br />
                      <br />
                      {cartIds.includes(course.id) ? (
                        <StyledWrapper>
                          <div
                            className="button"
                            onClick={() => removeFromCart(course.id)}
                            data-tooltip={course.price}
                          >
                            <div className="button-wrapper">
                              <button className="text">Remove</button>
                              <span className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-cart2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </StyledWrapper>
                      ) : (
                        <StyledWrapper>
                          <div
                            className="button"
                            onClick={() => addToCart(course)}
                            data-tooltip={course.price}
                          >
                            <div className="button-wrapper">
                              <button className="text">Add To Cart</button>
                              <span className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-cart2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </StyledWrapper>
                      )}
                    </div>
                  </BackgroundGradient>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 text-center">
            <Link
              href={"/"}
              className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
            >
              View All Products
            </Link>
          </div>
        </div>
        <FooterOne />
      </>
    );
  };

export default Page;
