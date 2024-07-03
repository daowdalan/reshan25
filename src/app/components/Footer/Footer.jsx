import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    
    <footer className=" text-black py-8">
      <hr className="mb-8" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Follow Us On</h2>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com/reshanroman.amude" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="w-6 h-6 hover:text-blue-500" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <SlSocialInstagram className="w-6 h-6 hover:text-pink-500" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoYoutube className="w-6 h-6 hover:text-red-500" />
              </a>
            </div>
          </div>

          <div className="mb-4 md:mb-0">
            <ul className="space-y-2 mt-2">
              <li>
                <Link href="/" className="hover:text-primary-400">Home</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400">Contact</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400">About Us</Link>
              </li>

            </ul>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Reshan-Art. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
