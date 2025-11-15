/* DÒNG NÀY RẤT QUAN TRỌNG */
"use client";

import Link from "next/link";

const FooterOne = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="container">
          {/* Cột 1: Logo */}
          <div className="footer-column logo-column">
            <Link href="/" className="logo">
              IIPMap.AI
            </Link>
          </div>

          {/* Cột 2: Hệ sinh thái IIP */}
          <div className="footer-column">
            <h5 className="title">HỆ SINH THÁI IIP</h5>
            <ul className="link-list">
              <li>
                <a
                  href="https://IIPVietnam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IIPVietnam.com
                </a>
              </li>
              <li>
                <a
                  href="https://CVLam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CVLam.com
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Địa chỉ */}
          <div className="footer-column">
            <h5 className="title">ĐỊA CHỈ</h5>
            <p className="address">
              Lô 7, Khu nhà tháp tầng, Khu Ngoại giao đoàn,{"\n"}
              Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội
            </p>
          </div>

          {/* Cột 4: Liên lạc */}
          <div className="footer-column">
            <h5 className="title">LIÊN LẠC</h5>
            <ul className="link-list">
              <li>
                <a href="tel:1900888858">1900.8888.58</a>
              </li>
              <li>
                <a href="mailto:info@iipvietnam.com">info@iipvietnam.com</a>
              </li>
            </ul>
          </div>

          {/* Cột 5: Mạng xã hội */}
          <div className="footer-column">
            <h5 className="title">MẠNG XÃ HỘI</h5>
            <ul className="link-list">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer-container {
          /* Gradient giống màu trong Figma */
          background: linear-gradient(
            90deg,
            #2c53c0 0%,
            #3c7dda 50%,
            #274dbd 100%
          );
          color: #ffffff;
          padding: 3rem 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }

        .container {
          max-width: 1473px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-column {
          flex: 1;
          min-width: 200px;
          padding: 0 10px;
        }

        .logo-column {
          flex-grow: 1.5;
        }

        .logo {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
        }

        .title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .link-list li {
          margin-bottom: 0.75rem;
        }

        .link-list a,
        .address {
          color: #ffffff;
          text-decoration: none;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .link-list a:hover {
          text-decoration: underline;
        }

        .address {
          margin: 0;
          white-space: pre-line;
        }

        @media (max-width: 992px) {
          .container {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-column {
            min-width: 100%;
            margin-bottom: 2rem;
          }

          .logo-column {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default FooterOne;
