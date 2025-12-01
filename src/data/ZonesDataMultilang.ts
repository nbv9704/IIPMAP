// ============================================
// IMPORTS
// ============================================
import { LanguageCode } from "@/hooks/useLanguage";

// ============================================
// TYPES
// ============================================
interface ZoneTranslation {
  name: string;
  address: string;
  land: string;
  description?: string;
  features?: string[];
  infrastructure?: string[];
}

interface ZoneMultilang {
  slug: string;
  area: string;
  timeline: string;
  price: string;
  image: string;
  translations: {
    [key in LanguageCode]: ZoneTranslation;
  };
}

// ============================================
// ZONES DATA - Multilingual
// ============================================
const zones_data_multilang: ZoneMultilang[] = [
  {
    slug: "kcn-tien-son",
    area: "402.82 ha",
    timeline: "2019 - 2036",
    price: "115 USD/m²",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=60",
    translations: {
      vi: {
        name: "KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH",
        address: "Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh",
        land: "Quỹ đất: Còn",
      },
      en: {
        name: "TIEN SON INDUSTRIAL PARK - BAC NINH",
        address: "Dong Nguyen Ward, Dai Dong Commune, Tam Son Ward, Bac Ninh",
        land: "Land: Available",
      },
      ja: {
        name: "Tien Son 工業団地 - Bac Ninh",
        address: "Dong Nguyen区、Dai Dong社、Tam Son区、Bac Ninh",
        land: "土地: 利用可能",
      },
      ko: {
        name: "Tien Son 산업단지 - Bac Ninh",
        address: "Dong Nguyen구, Dai Dong사, Tam Son구, Bac Ninh",
        land: "토지: 이용 가능",
      },
      zh: {
        name: "Tien Son 工业园区 - Bac Ninh",
        address: "Dong Nguyen坊、Dai Dong社、Tam Son坊、Bac Ninh",
        land: "土地: 可用",
      },
    },
  },
  {
    slug: "kcn-dai-dong-hoan-son",
    area: "300 ha",
    timeline: "2020 - 2035",
    price: "120 USD/m²",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=500&q=60",
    translations: {
      vi: {
        name: "KHU CÔNG NGHIỆP ĐẠI ĐỒNG HOÀN SƠN",
        address: "Thị xã Từ Sơn, tỉnh Bắc Ninh",
        land: "Quỹ đất: Ít",
      },
      en: {
        name: "DAI DONG HOAN SON INDUSTRIAL PARK",
        address: "Tu Son Town, Bac Ninh",
        land: "Land: Limited",
      },
      ja: {
        name: "Dai Dong Hoan Son 工業団地",
        address: "Tu Son町、Bac Ninh",
        land: "土地: 限定的",
      },
      ko: {
        name: "Dai Dong Hoan Son 산업단지",
        address: "Tu Son읍, Bac Ninh",
        land: "토지: 제한적",
      },
      zh: {
        name: "Dai Dong Hoan Son 工业园区",
        address: "Tu Son镇、Bac Ninh",
        land: "土地: 有限",
      },
    },
  },
  {
    slug: "kcn-nam-son-ha-noi",
    area: "260 ha",
    timeline: "2018 - 2030",
    price: "98 USD/m²",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=500&q=60",
    translations: {
      vi: {
        name: "KHU CÔNG NGHIỆP NAM SƠN HẠ NỘI",
        address: "Huyện Tiên Du, tỉnh Bắc Ninh",
        land: "Quỹ đất: Còn",
      },
      en: {
        name: "NAM SON HA NOI INDUSTRIAL PARK",
        address: "Tien Du District, Bac Ninh",
        land: "Land: Available",
      },
      ja: {
        name: "Nam Son Ha Noi 工業団地",
        address: "Tien Du県、Bac Ninh",
        land: "土地: 利用可能",
      },
      ko: {
        name: "Nam Son Ha Noi 산업단지",
        address: "Tien Du군, Bac Ninh",
        land: "토지: 이용 가능",
      },
      zh: {
        name: "Nam Son Ha Noi 工业园区",
        address: "Tien Du县、Bac Ninh",
        land: "土地: 可用",
      },
    },
  },
  {
    slug: "kcn-van-trung",
    area: "425 ha",
    timeline: "2021 - 2040",
    price: "110 USD/m²",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=500&q=60",
    translations: {
      vi: {
        name: "KHU CÔNG NGHIỆP VÂN TRUNG",
        address: "Huyện Việt Yên, Bắc Giang",
        land: "Quỹ đất: Nhiều",
      },
      en: {
        name: "VAN TRUNG INDUSTRIAL PARK",
        address: "Viet Yen District, Bac Giang",
        land: "Land: Abundant",
      },
      ja: {
        name: "Van Trung 工業団地",
        address: "Viet Yen県、Bac Giang",
        land: "土地: 豊富",
      },
      ko: {
        name: "Van Trung 산업단지",
        address: "Viet Yen군, Bac Giang",
        land: "토지: 풍부",
      },
      zh: {
        name: "Van Trung 工业园区",
        address: "Viet Yen县、Bac Giang",
        land: "土地: 充足",
      },
    },
  },
];

export const getAllZones = (lang: LanguageCode) => {
  return zones_data_multilang.map((zone) => ({
    slug: zone.slug,
    name: zone.translations[lang].name,
    address: zone.translations[lang].address,
    area: zone.area,
    land: zone.translations[lang].land,
    timeline: zone.timeline,
    price: zone.price,
    image: zone.image,
  }));
};

export const getZoneBySlug = (slug: string, lang: LanguageCode) => {
  const zone = zones_data_multilang.find((z) => z.slug === slug);
  if (!zone) return null;
  
  return {
    slug: zone.slug,
    name: zone.translations[lang].name,
    address: zone.translations[lang].address,
    area: zone.area,
    land: zone.translations[lang].land,
    timeline: zone.timeline,
    price: zone.price,
    image: zone.image,
  };
};

export default zones_data_multilang;
