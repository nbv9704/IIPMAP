"use client";
import { useTranslatedMenu } from "@/hooks/useTranslatedMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavMenuIIP = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { menuData } = useTranslatedMenu();

    return (
        <>
            {/* Desktop Menu */}
            <ul className="navbar-nav-iip align-items-center d-none d-lg-flex">
                {menuData.map((menu) => (
                    <li key={menu.id} className="nav-item-iip">
                        <Link 
                            href={menu.link} 
                            className={`nav-link-iip ${pathname === menu.link ? 'active' : ''}`}
                        >
                            {menu.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button 
                className="mobile-menu-toggle d-lg-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Menu */}
            <div className={`mobile-menu-iip d-lg-none ${mobileMenuOpen ? 'active' : ''}`}>
                <button 
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    type="button"
                />
                <div className="mobile-menu-content">
                    <button 
                        className="mobile-menu-close"
                        onClick={() => setMobileMenuOpen(false)}
                        type="button"
                    >
                        ×
                    </button>
                    <ul className="mobile-nav-list">
                        {menuData.map((menu) => (
                            <li key={menu.id}>
                                <Link 
                                    href={menu.link}
                                    className={pathname === menu.link ? 'active' : ''}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {menu.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavMenuIIP;
