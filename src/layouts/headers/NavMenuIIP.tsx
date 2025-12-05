// ============================================
// IMPORTS
// ============================================
"use client";
import { useTranslatedMenu } from "@/hooks/useTranslatedMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarLoadingSpinner from "@/components/common/NavbarLoadingSpinner";

// ============================================
// COMPONENT: NavMenuIIP
// ============================================
const NavMenuIIP = () => {
    // ========== Hooks ==========
    const pathname = usePathname();
    const router = useRouter();
    const { menuData } = useTranslatedMenu();
    
    // ========== State ==========
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [loadingRoute, setLoadingRoute] = useState<string | null>(null);

    // ========== Effects ==========
    // Reset loading state when pathname changes
    useEffect(() => {
        if (loadingRoute && pathname === loadingRoute) {
            setLoadingRoute(null);
        }
    }, [pathname, loadingRoute]);

    // ========== Handlers ==========
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        // Only show loading for Video route and if not already on that route
        if (link === '/video' && pathname !== '/video') {
            e.preventDefault();
            setLoadingRoute(link);
            router.push(link);
        }
    };

    // ========== Render ==========
    return (
        <>
            {/* Desktop Menu */}
            <ul className="navbar-nav-iip align-items-center d-none d-lg-flex">
                {menuData.map((menu) => (
                    <li 
                        key={menu.id} 
                        className={`nav-item-iip ${menu.has_dropdown ? 'has-dropdown' : ''}`}
                        onMouseEnter={() => menu.has_dropdown && setOpenDropdown(menu.id)}
                        onMouseLeave={() => menu.has_dropdown && setOpenDropdown(null)}
                    >
                        {loadingRoute === menu.link ? (
                            <div className="nav-link-iip loading">
                                <NavbarLoadingSpinner text="Loading..." />
                            </div>
                        ) : (
                            <Link 
                                href={menu.link} 
                                className={`nav-link-iip ${pathname === menu.link ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, menu.link)}
                            >
                                {menu.title}
                                {menu.has_dropdown && <span className="dropdown-arrow">▼</span>}
                            </Link>
                        )}
                        
                        {menu.has_dropdown && menu.sub_menus && openDropdown === menu.id && (
                            <ul className="dropdown-menu-iip">
                                {menu.sub_menus.map((subMenu, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={subMenu.link}
                                            className="dropdown-item-iip"
                                        >
                                            {subMenu.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
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
                                {menu.has_dropdown && menu.sub_menus && (
                                    <ul className="mobile-submenu">
                                        {menu.sub_menus.map((subMenu, index) => (
                                            <li key={index}>
                                                <Link 
                                                    href={subMenu.link}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {subMenu.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavMenuIIP;
