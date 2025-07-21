"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../../../components/ui/sidebar";


import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ArrowLeftRight, BotMessageSquare, Home, LayoutDashboard, SquarePen, UserCog } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";



export function SideBarMain({ children }) {
  const user = useAuthStore((state) => state.user);
  
  
  const home=    {
    label: "Home",
    href: "/",
    icon: (
      <LogoIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  }
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Accounts",
      href: "/account",
      icon: (
        <UserCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Transactions",
      href: "/transaction/create",
      icon: (
        <SquarePen className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AI Help",
      href: "/ChatBot",
      icon: (
        <BotMessageSquare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto  flex w-full max-w-screen flex-1 flex-col overflow-hidden  border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-[#151419]",

        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>

        <SidebarBody className="justify-between pr-1 gap-10">

          <div className="flex mt-4 flex-1 flex-col overflow-x-hidden overflow-y-auto">

            {/* Home  */}
          <SidebarLink  link={home}/>

          {/* Dashboard links */}
            <div className="mt-10 px-1 flex flex-col gap-8">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>

          </div>


          <div>
            {/* When LoggedIn */}
            <div className={open && `mr-2 flex items-center gap-2 px-3 py-2 rounded-md text-neutral-700 dark:text-neutral-200 text-sm font-semibold whitespace-pre transition duration-150 bg-[linear-gradient(135deg,#151419_20%,theme(colors.zinc.950)_30%,theme(colors.zinc.900)_50%,theme(colors.zinc.700)_70%,theme(colors.zinc.500)_85%,theme(colors.zinc.300)_100%)] dark:border dark:border-zinc-800  shadow-inner`}>
  <ProfilePic />
  {open && (
    <div>
      {user?.firstName.charAt(0) + user?.firstName.slice(1).toLowerCase()} {user?.lastName.charAt(0) + user?.lastName.slice(1).toLowerCase()}
    </div>
  )}
</div>


          </div>
        </SidebarBody>

      </Sidebar>
      {children}
    </div>
  );
}
// export const Logo = () => {
//   return (
//     <Link href="/" >
//       <Image className=' w-30 h-auto object-contain ' width={500} height={500} src={"/logo.png"} />
//     </Link>
//   );
// };
export const LogoIcon = () => {
  return (
    // <Link href="/" >
      <Image className="max-w-8 max-h-8" width={2000} height={2000} src={"/logo2.png"} />
    // </Link>
  );
};

export const ProfilePic = () => {
  
  return (
    <SignedIn>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "h-16 w-16", // Custom avatar size
          },
        }}
      />
    </SignedIn>
  )
}