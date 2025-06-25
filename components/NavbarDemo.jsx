"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'





export async function NavbarDemo({ children,bg="[#07080A]" }) {

 

  const navItems = [
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Let's Connect",
      link: "/community",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`relative w-full bg-${bg}`}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />

          {/* Authentication */}
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">

            {/* When SignedOut */}
            <SignedOut>
              <NavbarButton href="/sign-in" variant="secondary">Signin</NavbarButton>
              <NavbarButton href="/sign-up" variant="primary">SignUp</NavbarButton>
            </SignedOut>

            {/* When LoggedIn */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-12 w-12", // Custom avatar size
                  },
                }}
              />
            </SignedIn>


          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>


      </Navbar>

      {children}
   



    </div>
  );
}
