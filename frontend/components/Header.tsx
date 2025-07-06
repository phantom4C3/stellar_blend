"use client";

import Link from "next/link";
import Image from "next/image";
import favicon from "../app/favicon.ico";
// import { useAuthStore } from "../stores/useAuthStore.js";
import { MenuIcon, WalletIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Header = () => {
  // const { user, logout } = useAuthStore();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNav = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <header
      className={`bg-[#08021b] shadow-lg px-2 lg:px-4 fixed left-0 top-0 z-50 min-h-[7rem] w-full text-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 border-b border-b-black ${
        openNavigation ? "bg-[#08021b]" : "opacity-95 backdrop-blur-sm"
      } `}
    >
      <motion.div
        className="container mx-auto px-4 py-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/">
            <Image
              src={favicon}
              alt="logo"
              className={" size-[3rem] bg-white rounded-2xl p-2"}
            />
          </Link>

          <div>
            <button
              className="text-black bg-white cursor-pointer ml-auto lg:hidden"
              onClick={toggleNav}
              aria-label={
                openNavigation ? "Close Navigation" : "Open Navigation"
              }
              aria-expanded={openNavigation}
            >
              <MenuIcon className="p-0.5" size={35} />
            </button>
          </div>

          <nav
            className={`flex flex-col lg:flex-row items-center gap-5 ${
              openNavigation ? "flex" : "hidden"
            } fixed top-[6rem] left-0 right-0 bottom-0 lg:static lg:flex ml-auto gap-8 lg:gap-12 xl:gap-14 z-2 bg-[#08021b] backdrop-blur-sm max-lg:h-[20rem] `}
          >
            <Link
              href="#template-library"
              className="text-gray-300 transition-hover hover:text-white font-mona-sans "
            >
              Library
            </Link>
            <Link
              href="#create-template"
              className="text-gray-300 transition-hover hover:text-white font-mona-sans "
            >
              Customization
            </Link>

            <Link
              href="https://docs.blend.capital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 transition-hover hover:text-white font-mona-sans "
            >
              Support
            </Link>
            <Link
              href={"/connect-wallet"}
              className="text-black bg-white rounded-bl-2xl rounded-tr-2xl cursor-pointer"
            >
              <WalletIcon className="p-1" size={35} />
            </Link>
            <Link
              href="https://docs.blend.capital/blend-whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-pink-500 border-pink-600 text-white font-semibold rounded-lg cursor-pointer flex items-center transition-all hover:text-black duration-300 ease-in-out  neon-glow-button hover:scale-105 hover:border-pink-400 focus:outline-none hover:bg-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Docs
            </Link>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
