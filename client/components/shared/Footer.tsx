import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Separator } from "$/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import logo from "$/public/images/logo/logo.png";

const Footer = () => {
  const navLinks = [
    {
      title: "Shirts",
      link: "tops?style=shirt",
    },
    {
      title: "T-Shirts",
      link: "tops?style=tShirt",
    },
    {
      title: "Jackets",
      link: "tops?style=jacket",
    },
    {
      title: "Hoodies",
      link: "tops?style=hoodie",
    },
  ];
  return (
    <footer className="border-foreground/20 bg-background border-t pt-10">
      <div className="container mx-auto space-y-4 px-6 max-md:px-4">
        {/* Logo and Newsletter */}
        <div className="">
          <div className="flex gap-4">
            {/* hide logo in small devices */}
            <div className="max-sm:hidden">
              <Image
                src={logo}
                alt="logo"
                height="100"
                width="100"
                className="size-20 border border-gray-500/50 object-contain mix-blend-difference invert hover:border-gray-500/90"
              />
            </div>
            <div>
              <p className="text-5xl uppercase">SHIVAM GARMENTS</p>
              <p className="mb-4 font-medium">MANUFACTURING</p>
            </div>
          </div>
        </div>
        <div className="text-right text-sm">
          <p>+91 80884 82570</p>
          <p className="capitalize">
            Sharif & Purohit Tower, #4 B.T. street, A.S. Char Street Cross
            <br />
            Bengaluru, Karnataka 560053 Karnataka, India.
          </p>
          {/* Social Media Links */}
          <div className="my-3">
            <div className="flex justify-end gap-2">
              <a
                target="_blank"
                href="#"
                className="hover:bg-foreground hover:text-background rounded-full p-2"
              >
                <InstagramIcon />
              </a>
              <a
                target="_blank"
                href="#"
                className="hover:bg-foreground hover:text-background rounded-full p-2"
              >
                <FacebookIcon />
              </a>
              <a
                target="_blank"
                href="#"
                className="hover:bg-foreground hover:text-background rounded-full p-2"
              >
                <YouTubeIcon />
              </a>
              <a
                target="_blank"
                href="https://wa.me/918088482570"
                className="hover:bg-foreground hover:text-background rounded-full p-2"
                rel="noreferrer"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="text-center">
          <ul className="text-background flex flex-wrap justify-center space-x-8 text-sm font-medium"></ul>
        </div>

        {/* Additional Links */}
        <div className="text-background my-6 flex flex-wrap justify-between gap-6 text-sm font-medium">
          {/* Customer Support */}
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold uppercase">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <Link href="/contact-us" className="text-foreground/70">
                Contact-Us
              </Link>
              <br />
              <Link href="/faq" className="text-foreground/70">
                FAQs
              </Link>
              <br />
              <Link href="/shipping-delivery" className="text-foreground/70">
                Shipping & Delivery
              </Link>
              <br />
              <Link href="/profile" className="text-foreground/70">
                Track Your Order
              </Link>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <Link href="/about-us" className="text-foreground/70">
                {" "}
                About-Us
              </Link>
              <br />
              <Link href="/privacy-policy" className="text-foreground/70">
                Privacy-Policy
              </Link>
              <li className="text-foreground/70 cursor-pointer"></li>
              <li className="text-foreground/70 cursor-pointer"></li>
              <li className="text-foreground/70 cursor-pointer"></li>
            </ul>
          </div>

          {/* Shop By Category */}
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold uppercase">
              Shop By Category
            </h3>
            <ul className="">
              {navLinks.map(({ title, link }) => (
                <Link
                  key={link}
                  href={link}
                  className="text-foreground/70 block"
                >
                  {title}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Copyright */}
        <div className="text-foreground/70 mt-4 pb-4 text-center text-sm">
          © shivam 2025. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
