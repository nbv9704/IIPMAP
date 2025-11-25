"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import HeaderIIP from "@/layouts-iip/headers/HeaderIIP"
import FooterIIP from "@/layouts-iip/footers/FooterIIP"
import { getZoneBySlug, zones } from "@/data-iip/zones"
import "@/styles-iip/index.scss"

type ZoneDetailPageProps = {
  params: {
    slug: string
  }
}

const statsPalette = [
  { label: "Vị trí", value: "Bắc Ninh", bg: "#E4F7EC" },
  { label: "Thời hạn sử dụng đất", value: "50 năm", bg: "#DBF3FA" },
  { label: "Giá thuê đất", value: "70 USD/m2", bg: "#F9F7DD" },
  { label: "Mật độ xây dựng", value: "60%", bg: "#F8E6E6" },
]

const detailBullets = [
  "Địa chỉ: Xã Hòa Hội, tỉnh Gia Lai",
  "Thời gian vận hành: 50 năm kể từ quyết định cho thuê đất",
  "Tổng diện tích: 50 ha",
  "Giá thuê đất: 70 USD/m2 (chưa bao gồm VAT)",
  "Cách sân bay Phù Cát khoảng 10km; cách cảng Quy Nhơn khoảng 35km; cách ga Diêu Trì khoảng 25km.",
  "Hệ thống cấp điện ổn định, kết nối lưới điện quốc gia.",
  "Hệ thống thoát nước tách riêng nước mưa và nước thải.",
  "Hệ thống viễn thông đầy đủ (Internet, điện thoại, cáp quang).",
]

export default function ZoneDetailPage({ params }: ZoneDetailPageProps) {
  const zone = getZoneBySlug(params.slug)
  if (!zone) return notFound()

  const relatedZones = zones.filter((z) => z.slug !== zone.slug).slice(0, 10)

  return (
    <div className="test-iip-page">
      <HeaderIIP />
      <main className="zone-detail-page">
        <div className="zone-detail__nav">
          <Link href="/test-iip">← Quay lại danh sách</Link>
        </div>

        <section className="zone-hero">
          <div className="zone-hero__main">
            <Image src={zone.image} alt={zone.name} width={1000} height={420} />
          </div>
          <div className="zone-hero__side">
            <div className="zone-hero__video" />
            <div className="zone-hero__video" />
          </div>
        </section>

        <section className="zone-heading">
          <div>
            <h1>{zone.name}</h1>
            <p>{zone.address}</p>
          </div>
          <div className="zone-heading__meta">
            <span>👁 130</span>
            <button>Xem thêm →</button>
          </div>
        </section>

        <section className="zone-stats-grid">
          {statsPalette.map((stat) => (
            <article key={stat.label} style={{ background: stat.bg }}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="zone-actions">
          <button className="primary">Email</button>
          <Link href="/booking" className="action-link">Đặt lịch khảo sát</Link>
          <button>Chat</button>
          <button>Call</button>
        </section>

        <section className="zone-info-block">
          <div className="zone-info-block__left">
            <div className="audio-bar">
              <span className="control">⏯</span>
              <span className="progress" />
            </div>
            <h2>Thông tin chi tiết</h2>
            <ul>
              {detailBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="zone-info-block__right">
            <div className="map-filters">
              <span className="pin red" />
              <span className="pin yellow" />
              <span className="pin blue" />
              <span className="pin gray" />
              <span className="pin orange" />
            </div>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Vietnam_Da_Nang.png"
              alt="Bản đồ tổng"
              width={640}
              height={520}
            />
          </div>
        </section>

        <section className="zone-nearby">
          <h2>Các khu, cụm công nghiệp lân cận (10)</h2>
          <div className="zone-nearby__list">
            {relatedZones.map((near) => (
              <div key={near.slug} className="zone-nearby__card">
                <Image src={near.image} alt={near.name} width={110} height={70} />
                <div>
                  <strong>{near.name}</strong>
                  <p>{near.address}</p>
                  <div className="zone-nearby__meta">
                    <span>{near.area}</span>
                    <span>{near.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="zone-compare">
          <h2>So sánh khu, cụm công nghiệp</h2>
          <div className="compare-row">
            <select defaultValue={zone.slug}>
              {zones.map((z) => (
                <option key={z.slug} value={z.slug}>
                  {z.name}
                </option>
              ))}
            </select>
            <div className="compare-divider" />
            <input placeholder="Nhập tên khu/ cụm công nghiệp" />
          </div>
        </section>

        <section className="zone-download">
          <div>
            <h2>Xem đầy đủ tài liệu giới thiệu khu công nghiệp</h2>
            <p>Tài liệu giới thiệu khu công nghiệp</p>
          </div>
          <button>Tải tài liệu</button>
        </section>
      </main>
      <FooterIIP />
    </div>
  )
}
