"use client";

import React from "react";
import Link from "next/link";
import { Github, LinkedinIcon, TwitterIcon, Youtube } from "lucide-react";
// Add links to icons later ~

const Footer = () => {
  return (
    <div className="items-center flex max-lg:flex-col flex-row justify-between gap-3">
      <p className="text-gray-400">
        © {new Date().getFullYear()} All rights reserved
      </p>

      <div className=" flex gap-5 flex-row max-lg:mx-auto">
        <Link
          href="/"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          <Github size={24} />
        </Link>
        <Link
          href="/"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          <Youtube size={24} />
        </Link>
        <Link
          href="/"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          <TwitterIcon size={24} />
        </Link>
        <Link
          href="/"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          <LinkedinIcon size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
