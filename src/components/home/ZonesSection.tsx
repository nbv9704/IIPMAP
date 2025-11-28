"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import CustomSelect from "@/components/common/CustomSelect"
import { getAllZones } from "@/data/ZonesDataMultilang"
import { HiOutlineMapPin, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineVideoCamera, HiOutlineShare } from "react-icons/hi2"
import { TbRulerMeasure } from "react-icons/tb"
import { MdOutlineLandscape } from "react-icons/md"

import { PROVINCES, AREA_OPTIONS, PRICE_OPTIONS } from "@/constants"

function ZonesSection() {
  const { currentLang } = useLanguage()
  const [activeZoneTab, setActiveZoneTab] = useState<"all" | "industrial" | "cluster">("all")
  const zones = getAllZones(currentLang)

  return (
    <section className="zones-section">
      <div className="zones-header">
        <div className="zones-tabs">
          <button 
            className={`zone-tab ${activeZoneTab === "all" ? "active" : ""}`} 
            onClick={() => setActiveZoneTab("all")}
          >
            {getTranslation(currentLang, 'home.zones.tabs.all')} <span>(840)</span>
          </button>
          <button 
            className={`zone-tab ${activeZoneTab === "industrial" ? "active" : ""}`} 
            onClick={() => setActiveZoneTab("industrial")}
          >
            {getTranslation(currentLang, 'home.zones.tabs.industrial')} <span>(800)</span>
          </button>
          <button 
            className={`zone-tab ${activeZoneTab === "cluster" ? "active" : ""}`} 
            onClick={() => setActiveZoneTab("cluster")}
          >
            {getTranslation(currentLang, 'home.zones.tabs.cluster')} <span>(40)</span>
          </button>
        </div>
        <div className="zones-filters">
          <CustomSelect 
            placeholder={getTranslation(currentLang, 'home.zones.filters.location')} 
            options={PROVINCES} 
          />
          <CustomSelect 
            placeholder={getTranslation(currentLang, 'home.zones.filters.scale')} 
            options={AREA_OPTIONS} 
          />
          <CustomSelect 
            placeholder={getTranslation(currentLang, 'home.zones.filters.price')} 
            options={PRICE_OPTIONS} 
          />
        </div>
      </div>

      <div className="zones-content">
        <div className="zones-list">
          {zones.map((zone) => (
            <div key={zone.slug} className="zone-card">
              <div className="zone-card-image">
                <Image src={zone.image} alt={zone.name} width={180} height={120} />
              </div>
              <div className="zone-card-content">
                <Link href={`/zones/${zone.slug}`} className="zone-card-title">
                  <h3>{zone.name}</h3>
                </Link>
                <div className="zone-card-address">
                  <HiOutlineMapPin />
                  <span>{zone.address}</span>
                </div>
                <div className="zone-card-info">
                  <div className="zone-info-item">
                    <TbRulerMeasure />
                    <span>{zone.area}</span>
                  </div>
                  <div className="zone-info-item">
                    <MdOutlineLandscape />
                    <span>{zone.land}</span>
                  </div>
                  <div className="zone-info-item">
                    <HiOutlineCurrencyDollar />
                    <span>{zone.price}</span>
                  </div>
                  <div className="zone-info-item">
                    <HiOutlineClock />
                    <span>{zone.timeline}</span>
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
            </div>
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
  )
}

export default ZonesSection
