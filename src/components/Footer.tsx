import FacebookIcon from "@/app/icons/FacebookIcon";
import InstaIcon from "@/app/icons/InstaIcon";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">EURO 2024 Football Blog</h1>
          </div>
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com/" className="hover:underline flex flex-row">
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" className="hover:underline flex flex-row">
                  <InstaIcon />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-sm">
              &copy; 2024{" "}
              <a href="https://github.com/hansac91" className="hover:underline">
                Hania
              </a>
               ,{" "}
              <a href="https://github.com/filwas" className="hover:underline">
                Filip
              </a>
              ,{" "}
              <a href="https://github.com/mr-fox93" className="hover:underline">
                Kamil
              </a>. Some rights reserved, but generally like, whatever
              dude...
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
