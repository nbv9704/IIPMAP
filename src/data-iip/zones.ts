export type ZoneInfo = {
  slug: string
  name: string
  address: string
  area: string
  land: string
  timeline: string
  price: string
  image: string
}

export const zones: ZoneInfo[] = [
  {
    slug: "kcn-tien-son",
    name: "KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH",
    address: "Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh",
    area: "402.82 ha",
    land: "Quỹ đất: Còn",
    timeline: "2019 - 2036",
    price: "115 USD/m²",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=60",
  },
  {
    slug: "kcn-dai-dong-hoan-son",
    name: "KHU CÔNG NGHIỆP ĐẠI ĐỒNG HOÀN SƠN",
    address: "Thị xã Từ Sơn, tỉnh Bắc Ninh",
    area: "300 ha",
    land: "Quỹ đất: Ít",
    timeline: "2020 - 2035",
    price: "120 USD/m²",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=500&q=60",
  },
  {
    slug: "kcn-nam-son-ha-noi",
    name: "KHU CÔNG NGHIỆP NAM SƠN HẠ NỘI",
    address: "Huyện Tiên Du, tỉnh Bắc Ninh",
    area: "260 ha",
    land: "Quỹ đất: Còn",
    timeline: "2018 - 2030",
    price: "98 USD/m²",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=500&q=60",
  },
  {
    slug: "kcn-van-trung",
    name: "KHU CÔNG NGHIỆP VÂN TRUNG",
    address: "Huyện Việt Yên, Bắc Giang",
    area: "425 ha",
    land: "Quỹ đất: Nhiều",
    timeline: "2021 - 2040",
    price: "110 USD/m²",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=500&q=60",
  },
]

export const getZoneBySlug = (slug: string) => zones.find((zone) => zone.slug === slug)
