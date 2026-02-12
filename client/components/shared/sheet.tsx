import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "$/components/ui/sheet";
import Link from "next/link";
import { IUser } from "$/types/api";
import Signout from "./Signout";
import { SignupDialog } from "../dialog/SignupDialog";
import { LoginDialog } from "../dialog/LoginDialog";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { bottomLinks, topLinks } from "$/lib/constants";

export function SheetSide({ user }: { user?: IUser }) {
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);

  const handleCaret = (type: "top" | "bottom") => {
    if (type === "top") {
      setIsTopOpen(!isTopOpen);
      setIsBottomOpen(false);
    } else {
      setIsBottomOpen(!isBottomOpen);
      setIsTopOpen(false);
    }
  };
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <MenuRoundedIcon className="cursor-pointer text-foreground" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="my-10">
            <SheetTitle className="text-left">Welcome to our site</SheetTitle>
            <SheetDescription className="text-left">
              Navigate to the page where you want to visit.
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <SheetClose asChild>
              <Link href="/">
                <p className="my-2 cursor-pointer text-xl font-light uppercase text-foreground hover:underline">
                  Home
                </p>
              </Link>
            </SheetClose>
            <div
              onClick={() => handleCaret("top")}
              className="my-2 flex cursor-pointer items-center justify-between text-xl font-light uppercase text-foreground hover:underline"
            >
              <p>All Tops</p>
              <div>{!isTopOpen ? <CaretDownIcon /> : <CaretUpIcon />}</div>
            </div>
            {isTopOpen && (
              <div className="ml-3">
                {topLinks.map((nav) => (
                  <SheetClose asChild key={nav.title}>
                    <Link href={nav.href}>
                      <p className="my-2 cursor-pointer font-light uppercase text-foreground hover:underline">
                        {nav.title}
                      </p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            )}
            <div
              onClick={() => handleCaret("bottom")}
              className="my-2 flex cursor-pointer items-center justify-between text-xl font-light uppercase text-foreground hover:underline"
            >
              <p>All Bottoms</p>
              <div>{!isBottomOpen ? <CaretDownIcon /> : <CaretUpIcon />}</div>
            </div>
            {isBottomOpen && (
              <div className="ml-3">
                {bottomLinks.map((nav) => (
                  <SheetClose asChild key={nav.title}>
                    <Link href={nav.href}>
                      <p className="my-2 cursor-pointer font-light uppercase text-foreground hover:underline">
                        {nav.title}
                      </p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            )}
            <SheetClose asChild>
              <Link href="/wholesale">
                <p className="my-2 cursor-pointer text-xl font-light uppercase text-foreground hover:underline">
                  Wholesale
                </p>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="new-arrivals">
                <p className="my-2 cursor-pointer text-xl font-light uppercase text-foreground hover:underline">
                  New Arrivals
                </p>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/most-sold">
                <p className="my-2 cursor-pointer text-xl font-light uppercase text-foreground hover:underline">
                  Most Sold
                </p>
              </Link>
            </SheetClose>

            {user?.name ? (
              <SheetClose asChild>
                <div className="md:hidden">
                  <Signout />
                </div>
              </SheetClose>
            ) : (
              <div className="md:hidden">
                <SignupDialog /> <LoginDialog />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
