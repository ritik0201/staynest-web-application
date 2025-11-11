"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import RegisterModal from "@/components/modal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { User, Settings, LogOut } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Person, ArrowDropDown } from '@mui/icons-material';


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: session } = useSession();
  const handleLogout = () => signOut();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setOpenModal(true);
      toast.info("Please log in to access the dashboard.");
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed w-full z-100 bg-gradient-to-r from-purple-700 to-purple-900 shadow-md">
      {/* Removed max-w-7xl mx-auto so content goes edge to edge */}
      <div className="flex justify-between items-center h-14 px-4 sm:px-6 lg:px-8">
        {/* Left: Company logo/name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/image/logo.png" alt="Logo" width={36} height={36} />
          <div className="text-xl md:text-2xl font-bold text-white">StayNest</div>
        </Link>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex space-x-4 text-white">
          <Link
            href="/rooms"
            className="px-4 py-2 rounded-md transition-colors duration-200"
          >
            Rooms
          </Link>
          <Link
            href="/blogs"
            className="px-4 py-2 rounded-md transition-colors duration-200"
          >
            Blogs
          </Link>
          <Link
            href="/dashboard"
            onClick={handleDashboardClick}
            className="px-4 py-2 rounded-md transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-md transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Right: Desktop buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!session ? (
            <>
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition"
              >
                <Person className="w-5 h-5 mr-2 text-purple-600" />
                <span className="font-medium">Login</span>
              </button>
              <RegisterModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
              />
            </>
          ) : (
            <PopupState variant="popover" popupId="user-menu">
              {(popupState) => (
                <>
                  <div
                    className="flex items-center space-x-1.5 cursor-pointer"
                    {...bindTrigger(popupState)}
                  >
                    <Person className="text-white" />
                    <span className="text-white font-medium">{session.user?.name}</span>
                    <ArrowDropDown className="text-white" style={{ fontSize: '32px' }} />
                  </div>

                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      <Link
                        href="/dashboard"
                        className="w-full flex items-center gap-4 text-white px-8 py-2"
                      >
                        <User size={22} /> {session.user?.name}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <Link
                        href={"/profile"}
                        className="w-full flex items-center gap-4 text-white px-8 py-2"
                      >
                        <Settings size={22} /> Account
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        handleLogout();
                      }}
                    >
                      <div className="w-full flex items-center gap-4 px-8 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                        <LogOut size={22} /> <span>Logout</span>
                      </div>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            className="p-2 text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="text-white" fontSize="large" />
            ) : (
              <MenuIcon className="text-white" fontSize="large" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-md overflow-hidden">
          <div className="flex flex-col px-4 py-3 space-y-1 text-white">
            <Link
              href="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Rooms
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              onClick={handleDashboardClick}
              className="block px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Dashboard
            </Link>

            {!session ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenModal(true);
                }}
                className="mt-2 bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 transition"
              >
                Login
              </button>
            ) : (
              <>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
