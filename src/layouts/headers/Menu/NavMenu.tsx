"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type NavItem = {
  href: string
  label: string
  variant?: "phone"
}

const NAV_ITEMS: NavItem[] = [
  { href: "/listing_01", label: "Tin mua bán" },
  { href: "/video", label: "Video" },
  { href: "/blog_01", label: "Tin tức" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/contact", label: "Liên hệ" },
  { href: "/booking", label: "Đặt lịch" },
  { href: "tel:1900888858", label: "1900.8888.58", variant: "phone" },
]

const NavMenu = () => {
  const pathname = usePathname()

  return (
    <ul className="navbar-nav align-items-lg-center">
      {NAV_ITEMS.map((item) => (
        <li key={item.href} className="nav-item">
          {item.variant === "phone" ? (
            // Số điện thoại gọi trực tiếp
            <a
              href={item.href}
              className="nav-link nav-link--phone text-danger fw-600"
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
