"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";
import CustomSelect from "@/components/common/CustomSelect";
import {
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineShare,
} from "react-icons/hi2";
import { TbRulerMeasure } from "react-icons/tb";
import { MdOutlineLandscape } from "react-icons/md";
import { PROVINCES, AREA_OPTIONS, PRICE_OPTIONS } from "@/constants";
import { useGetIndustrialAreaQuery } from "@/redux/slice/industrialAreaApiSlice";
import { formatDate } from "@/utils/formatters";

function ZonesSection() {
  const { currentLang } = useLanguage();
  const [activeZoneTab, setActiveZoneTab] = useState<
    "all" | "industrial" | "cluster"
  >("all");
  const { data, isLoading } = useGetIndustrialAreaQuery(5);
  console.log("Data:", data);

  return (
    <section className="zones-section">
      <div className="zones-header">
        <div className="zones-tabs">
          <button
            className={`zone-tab ${activeZoneTab === "all" ? "active" : ""}`}
            onClick={() => setActiveZoneTab("all")}
          >
            {getTranslation(currentLang, "home.zones.tabs.all")}{" "}
            <span>(840)</span>
          </button>
          <button
            className={`zone-tab ${
              activeZoneTab === "industrial" ? "active" : ""
            }`}
            onClick={() => setActiveZoneTab("industrial")}
          >
            {getTranslation(currentLang, "home.zones.tabs.industrial")}{" "}
            <span>(800)</span>
          </button>
          <button
            className={`zone-tab ${
              activeZoneTab === "cluster" ? "active" : ""
            }`}
            onClick={() => setActiveZoneTab("cluster")}
          >
            {getTranslation(currentLang, "home.zones.tabs.cluster")}{" "}
            <span>(40)</span>
          </button>
        </div>
        <div className="zones-filters">
          <CustomSelect
            placeholder={getTranslation(
              currentLang,
              "home.zones.filters.location"
            )}
            options={PROVINCES}
          />
          <CustomSelect
            placeholder={getTranslation(
              currentLang,
              "home.zones.filters.scale"
            )}
            options={AREA_OPTIONS}
          />
          <CustomSelect
            placeholder={getTranslation(
              currentLang,
              "home.zones.filters.price"
            )}
            options={PRICE_OPTIONS}
          />
        </div>
      </div>

      <div className="zones-content">
        <div className="zones-list">
          {data?.map((data) => (
            <Link href={`${data.slug}`} key={data.slug} className="zone-card">
              <div className="zone-card-image">
                <Image
                  src={
                    data.images && data.images.length > 0
                      ? data.images[0]
                      : "https://placehold.co/300x200?text=No+Image"
                  }
                  alt={data.name}
                  width={180}
                  height={120}
                />
              </div>
              <div className="zone-card-content">
                <div className="zone-card-title">
                  <h3>{data.name}</h3>
                </div>
                <div className="zone-card-address">
                  <HiOutlineMapPin />
                  <span>{data.addressDetail ? data.addressDetail : "N/A"}</span>
                </div>
                <div className="zone-card-info">
                  <div className="zone-info-item">
                    <TbRulerMeasure />
                    <span>{data.totalArea} ha</span>
                  </div>
                  <div className="zone-info-item">
                    <MdOutlineLandscape />
                    <span>Quỹ đất: {data.vacantArea} ha</span>
                  </div>
                  <div className="zone-info-item">
                    <HiOutlineCurrencyDollar />
                    <span>
                      {data.landLeasePrice ? data.landLeasePrice : "N/A"} USD/m²
                    </span>
                  </div>
                  <div className="zone-info-item">
                    <HiOutlineClock />
                    <span>
                      {data.operationStartDate
                        ? formatDate(data.operationStartDate)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="zone-card-actions">
                <button className="zone-action-btn" aria-label="View location">
                  <HiOutlineMapPin />
                </button>
                <button className="zone-action-btn" aria-label="Watch video">
                  <HiOutlineVideoCamera />
                </button>
                <button className="zone-action-btn" aria-label="Share">
                  <HiOutlineShare />
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="zones-map">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Vietnam_relief_location_map.jpg"
            alt="Vietnam Map"
            width={620}
            height={520}
          />
        </div>
      </div>
    </section>
  );
}

export default ZonesSection;
