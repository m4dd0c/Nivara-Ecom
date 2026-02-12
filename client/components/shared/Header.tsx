"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "$/public/images/logo/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetLoggedInUserQuery } from "$/store/services/user";
import { Nav } from "./navigation";
import { ModeToggle } from "./ModeToggle";
import { LoginDialog } from "../dialog/LoginDialog";
import { SignupDialog } from "../dialog/SignupDialog";
import { SheetSide } from "./sheet";
import { HeartIcon } from "lucide-react";

const Header = () => {
  const { data } = useGetLoggedInUserQuery();
  return (
    <div className="bg-background flex h-14 w-full items-center justify-between px-4">
      <Link href="/" className="outline-none">
        <Image
          src={logo}
          alt="logo"
          height="100"
          width="100"
          className="size-16 object-contain mix-blend-difference outline-none invert"
        />
      </Link>

      <div className="hidden gap-4 lg:flex">
        <Nav />
      </div>
      <div>
        {/* desktop navbar */}
        <div className="hidden gap-2 lg:flex lg:items-center lg:justify-end">
          <div className="hover:bg-muted-foreground/5 grid size-9 place-content-center rounded-lg border">
            <ModeToggle />
          </div>

          {data && (
            <Link href={"/cart"}>
              <div className="hover:bg-muted-foreground/5 grid size-9 place-content-center rounded-lg border">
                <ShoppingCartIcon />
              </div>
            </Link>
          )}
          <Link href={"/wishlist"}>
            <div className="hover:bg-muted-foreground/5 grid size-9 place-content-center rounded-lg border">
              <HeartIcon />
            </div>
          </Link>
          {data ? (
            <>
              <div className="hover:bg-muted-foreground/5 grid size-9 place-content-center rounded-lg border">
                <Link href={"/profile"}>
                  <AccountCircleIcon className="cursor-pointer" />
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <LoginDialog /> <SignupDialog />
            </div>
          )}
        </div>
        {/* tablet and smaller devices // INFO: Mobile Device // */}

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            {data && (
              <>
                <Link href={"/cart"}>
                  <div className="">
                    <ShoppingCartIcon className="text-foreground" />
                  </div>
                </Link>
                <Link href={"/profile"}>
                  <AccountCircleIcon className="cursor-pointer" />
                </Link>
              </>
            )}
            <SheetSide user={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
