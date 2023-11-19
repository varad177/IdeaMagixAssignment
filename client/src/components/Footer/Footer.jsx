import React from "react";

import { BsInstagram, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const correntDate = new Date();
  const year = correntDate.getFullYear();
  return (
    <>
      <footer className="flex relative left-0 bottom-0 py-5 sm:px-20 h-[10vh]  flex-col sm:flex-row items-center justify-between text-white bg-gray-900">
        <section className="text-lg">
          Copyright {year} | All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white ">
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300 max-[800px]:text-sm"
            href=""
          >
            <BsFacebook />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300 max-[800px]:text-sm"
            href=""
          >
            <BsInstagram />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300 max-[800px]:text-sm"
            href=""
          >
            <BsLinkedin />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300 max-[800px]:text-sm"
            href=""
          >
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
