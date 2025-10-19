"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer drawer-mobile">
      {/* Drawer toggle */}
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="w-full bg-base-200 shadow">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost"
              >
                <MenuIcon className="w-6 h-6" />
              </label>
            </div>
            <div className="flex-1">
              <div
                onClick={() => router.push("/")}
                className="btn btn-ghost normal-case text-2xl font-bold cursor-pointer"
              >
                Cloudinary Showcase
              </div>
            </div>
            {user && (
              <div className="flex-none flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0].emailAddress}
                    />
                  </div>
                </div>
                <span className="text-sm truncate max-w-xs">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-circle"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow bg-base-100">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 flex flex-col h-full">
          <div className="flex items-center justify-center py-6">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full flex items-center justify-center"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
