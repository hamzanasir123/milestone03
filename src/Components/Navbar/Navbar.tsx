"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";


interface CartItem {
  id: number;
}

const Navbar = (props:any) => {
//   let jsonData;
// try {
//   const cartStorage = localStorage.getItem('cart'); 
//   if (cartStorage) {
//     jsonData = JSON.parse(cartStorage);
//   } else {
//     console.log('No data found in localStorage.');
//     jsonData = {}; 
//   }
// } catch (error) {
//   console.error('Error parsing JSON:', error);
//   jsonData = {};
// }
const [cartStorage, setCartStorage] = useState<CartItem[]>([]);
  const [cartNumber, setCartNumber] = useState(cartStorage.length);
  const [cartItem, setCartItem] = useState<any[]>(cartStorage);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if(typeof window !== 'undefined'){
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setCartStorage(parsedCart); 
      }
    }
  },[])
  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        const localCartItem = cartItem;
        localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
        setCartItem(localCartItem);
        setCartNumber(cartNumber + 1);
        localStorage.setItem('cart', JSON.stringify(localCartItem));
      } else {
        setCartNumber(1);
        setCartItem([props.cartData])
        localStorage.setItem('cart', JSON.stringify([props.cartData]))
      }
    }
  }, [props.cartData, props.removeCartData]);

  useEffect(() => {
    if(props.removeCartData){
      const localCartItem = cartItem.filter((item:any) => {
        return item.id != props.removeCartData;
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem('cart', JSON.stringify(localCartItem));
      if(localCartItem.length == 0){
        localStorage.removeItem('cart');
      }
    }
  }, [props.removeCartData , props.cartData])

  return (
    <>
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
        <Menu setActive={setActive}>
          <Link href={"/"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="HOME"
            ></MenuItem>
          </Link>
          <MenuItem setActive={setActive} active={active} item="PRODUCTS">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/">Men</HoveredLink>
              <HoveredLink href="/">Women</HoveredLink>
              <HoveredLink href="/">UniSex</HoveredLink>
              <HoveredLink href="/">Attar</HoveredLink>
              <HoveredLink href="/">Perfume Wax</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="CONTACT">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/">Email</HoveredLink>
              <HoveredLink href="/">WhatsUp</HoveredLink>
              <HoveredLink href="/">Instagram</HoveredLink>
              <HoveredLink href="/">FaceBook</HoveredLink>
            </div>
          </MenuItem>
          <Link href={"/"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="MYACCOUNT"
            ></MenuItem>
          </Link>
          <Link href={cartNumber ? "/Cart" : "#"} className="text-white">
            CART({cartNumber ? cartNumber : 0 })
          </Link>
        </Menu>
      </div>
    </>
  );
}

export default Navbar;