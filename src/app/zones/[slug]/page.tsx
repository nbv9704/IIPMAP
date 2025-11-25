"use client"
import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { getZoneBySlug, getAllZones } from "@/data-iip/ZonesDataMultilang"
import HeaderIIP from "@/layouts-iip/headers/HeaderIIP"
import FooterIIP from "@/layouts-iip/footers/FooterIIP"
import CustomSelect from "@/components/common/CustomSelect"
import Image from "next/image"
import Link from "next/link"
import { HiEye, HiChevronLeft, HiChevronRight, HiArrowsRightLeft } from "react-icons/hi2"
import { HiLocationMarker } from "react-icons/hi"
import { BiTimeFive, BiMoney } from "react-icons/bi"
import { MdConstruction } from "react-icons/md"
import { IoAirplane } from "react-icons/io5"
import { BsClock, BsPlayCircle, BsImage, BsDownload } from "react-icons/bs"
import { TbRulerMeasure } from "react-icons/tb"
import styles from './page.module.scss'

type ZonePageParams = { slug?: string | string[] }

export default function ZoneDetailPage({ params }: { params: ZonePageParams }) {
  const { currentLang } = useLanguage()
  const slug = useMemo(() => {
    if (!params?.slug) return ""
    return Array.isArray(params.slug) ? params.slug[0] : params.slug
  }, [params])

  const zone = useMemo(() => slug ? getZoneBySlug(slug, currentLang) : null, [slug, currentLang])
  const allZones = getAllZones(currentLang)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [compareZone1, setCompareZone1] = useState("")
  const [compareZone2, setCompareZone2] = useState("")

  useEffect(() => {
    if (slug) {
      setCompareZone1(slug)
    }
  }, [slug])

  useEffect(() => {
    if (zone) {
      document.title = `${zone.name} - ${getTranslation(currentLang, 'pageTitle.siteName')}`
    }
  }, [zone, currentLang])

  if (!zone) {
    return (
      <>
        <HeaderIIP />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>{slug ? 'Zone not found' : 'Loading...'}</h2>
        </div>
        <FooterIIP />
      </>
    )
  }

  const images = [zone.image, zone.image, zone.image]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const getLocationName = (address: string) => {
    const parts = address.split(/[,、]/)
    const lastPart = parts[parts.length - 1].trim()
    return lastPart.replace(/^(tỉnh|thành phố|tp\.|tp)\s+/i, '').trim()
  }

  const getShortAddress = (address: string) => {
    const parts = address.split(/[,、]/).map(p => p.trim())
    if (parts.length <= 2) return address
    return parts.slice(-2).join(', ')
  }

  return (
    <>
      <HeaderIIP />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image 
              src={images[currentImageIndex]} 
              alt={zone.name}
              width={949}
              height={373}
            />
            <button className={`${styles.navArrow} ${styles.left}`} onClick={handlePrevImage}>
              <HiChevronLeft />
            </button>
            <button className={`${styles.navArrow} ${styles.right}`} onClick={handleNextImage}>
              <HiChevronRight />
            </button>
            <div className={styles.carouselDots}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={index === currentImageIndex ? styles.active : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Video Cards */}
          <div className={styles.videoCards}>
            <div className={styles.videoCard} style={{ backgroundImage: `url(${zone.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className={styles.videoLabel}>{getTranslation(currentLang, 'home.video.labels.trend')}</div>
              <div className={styles.playIcon}>▶</div>
              <div className={styles.videoMeta}>
                <span>@iip</span>
                <span>29k {getTranslation(currentLang, 'home.video.views')}</span>
              </div>
            </div>
            <div className={styles.videoCard} style={{ backgroundImage: `url(${zone.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className={styles.videoLabel}>{getTranslation(currentLang, 'home.video.labels.hot')}</div>
              <div className={styles.playIcon}>▶</div>
              <div className={styles.videoMeta}>
                <span>@iip</span>
                <span>25k {getTranslation(currentLang, 'home.video.views')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Title */}
        <div className={styles.titleSection}>
          <h1>
            {zone.name}
            <span className={styles.viewCount}>
              <HiEye />
              <span>130</span>
            </span>
          </h1>
        </div>

        {/* Info Cards */}
        <section className={styles.infoCards}>
          <div className={`${styles.infoCard} ${styles.location}`}>
            <HiLocationMarker className={styles.cardIcon} />
            <div className={styles.cardLabel}>{getTranslation(currentLang, 'zoneDetail.infoCards.location')}</div>
            <div className={styles.cardValue}>{getLocationName(zone.address)}</div>
          </div>
          <div className={`${styles.infoCard} ${styles.timeline}`}>
            <BiTimeFive className={styles.cardIcon} />
            <div className={styles.cardLabel}>{getTranslation(currentLang, 'zoneDetail.infoCards.timeline')}</div>
            <div className={styles.cardValue}>50 {getTranslation(currentLang, 'zoneDetail.infoCards.years')}</div>
          </div>
          <div className={`${styles.infoCard} ${styles.price}`}>
            <BiMoney className={styles.cardIcon} />
            <div className={styles.cardLabel}>{getTranslation(currentLang, 'zoneDetail.infoCards.price')}</div>
            <div className={styles.cardValue}>{zone.price}</div>
          </div>
          <div className={`${styles.infoCard} ${styles.density}`}>
            <MdConstruction className={styles.cardIcon} />
            <div className={styles.cardLabel}>{getTranslation(currentLang, 'zoneDetail.infoCards.density')}</div>
            <div className={styles.cardValue}>60%</div>
          </div>
        </section>

        {/* Main Container */}
        <div className={styles.mainContainer}>
          {/* Action Buttons */}
          <section className={styles.actionButtons}>
            <button className={styles.email}>
              <span>{getTranslation(currentLang, 'zoneDetail.actions.email')}</span>
              <span>✉️</span>
            </button>
            <button className={styles.booking}>
              <span>{getTranslation(currentLang, 'zoneDetail.actions.booking')}</span>
              <span>📅</span>
            </button>
            <button className={styles.chat}>
              <span>{getTranslation(currentLang, 'zoneDetail.actions.chat')}</span>
              <span>💬</span>
            </button>
            <button className={styles.call}>
              <span>{getTranslation(currentLang, 'zoneDetail.actions.call')}</span>
              <span>📞</span>
            </button>
          </section>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {/* Detail Info */}
            <section className={styles.detailInfo}>
              <h2>{getTranslation(currentLang, 'zoneDetail.detail.title')}</h2>
              <div className={styles.detailContent}>
                <p><strong>{getTranslation(currentLang, 'zoneDetail.detail.address')}:</strong> {zone.address}</p>
                <p><strong>{getTranslation(currentLang, 'zoneDetail.detail.operatingTime')}:</strong> {zone.timeline}</p>
                <p><strong>{getTranslation(currentLang, 'zoneDetail.detail.totalArea')}:</strong> {zone.area}</p>
                <p><strong>{getTranslation(currentLang, 'zoneDetail.detail.landPrice')}:</strong> {zone.price} {getTranslation(currentLang, 'zoneDetail.detail.vatNote')}</p>
                <p>
                  <strong>{zone.land.split(':')[0]}:</strong>
                  {zone.land.split(':')[1] || ''}
                </p>
                
                <h3>{getTranslation(currentLang, 'zoneDetail.detail.strategicLocation')}</h3>
                <ul>
                  <li>Cach san bay Phu Cat khoang 10km</li>
                  <li>Cach cang Quy Nhon khoang 35km</li>
                  <li>Cach ga Dieu Tri khoang 25km</li>
                </ul>

                <h3>{getTranslation(currentLang, 'zoneDetail.detail.infrastructure')}</h3>
                <h4>{getTranslation(currentLang, 'zoneDetail.detail.electricSystem')}</h4>
                <p>{getTranslation(currentLang, 'zoneDetail.detail.electricDesc')}</p>
                
                <h4>{getTranslation(currentLang, 'zoneDetail.detail.waterSystem')}</h4>
                <p>{getTranslation(currentLang, 'zoneDetail.detail.waterDesc')}</p>
              </div>
            </section>

            {/* Map */}
            <section className={styles.mapSection}>
              <div className={styles.mapPlaceholder}>
                {getTranslation(currentLang, 'zoneDetail.map.placeholder')}
              </div>
            </section>
          </div>

          {/* Nearby Zones */}
          <section className={styles.nearbyZones}>
            <h2>{getTranslation(currentLang, 'zoneDetail.nearby.title')} {getTranslation(currentLang, 'zoneDetail.nearby.count')}</h2>
            <div className={styles.zonesScroll}>
              {allZones.slice(0, 6).map((nearbyZone) => (
                <Link href={`/zones/${nearbyZone.slug}`} key={nearbyZone.slug} className={styles.zoneCard}>
                  <h3>{nearbyZone.name}</h3>
                  <div className={styles.zoneInfo}>
                    <span>
                      <HiLocationMarker />
                      {getShortAddress(nearbyZone.address)}
                    </span>
                    <span>
                      <TbRulerMeasure />
                      {nearbyZone.area}
                    </span>
                    <span>
                      <BiMoney />
                      {nearbyZone.price}
                    </span>
                  </div>
                  <div className={styles.zoneDistance}>
                    <IoAirplane />
                    17.5 km
                  </div>
                  <div className={styles.zoneActions}>
                    <button><BsClock /></button>
                    <button><BsPlayCircle /></button>
                    <button><BsImage /></button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Compare Section */}
        <section className={styles.compareSection}>
          <h2>{getTranslation(currentLang, 'zoneDetail.compare.title')}</h2>
          <div className={styles.compareSelects}>
            <CustomSelect
              placeholder={zone.name}
              options={allZones.map(z => z.name)}
              value={allZones.find(z => z.slug === compareZone1)?.name}
              onChange={(value) => {
                const selectedZone = allZones.find(z => z.name === value)
                if (selectedZone) setCompareZone1(selectedZone.slug)
              }}
            />
            <div className={styles.compareDivider}>
              <HiArrowsRightLeft />
            </div>
            <CustomSelect
              placeholder={getTranslation(currentLang, 'zoneDetail.compare.select')}
              options={allZones.map(z => z.name)}
              value={compareZone2 ? allZones.find(z => z.slug === compareZone2)?.name : ""}
              onChange={(value) => {
                const selectedZone = allZones.find(z => z.name === value)
                if (selectedZone) setCompareZone2(selectedZone.slug)
              }}
            />
          </div>

          {compareZone2 && (
            <div className={styles.compareTable}>
              <div className={styles.tableHeader}>
                <div>{getTranslation(currentLang, 'zoneDetail.compare.criteria.stt')}</div>
                <div>{getTranslation(currentLang, 'zoneDetail.compare.criteria.criterion')}</div>
                <div>{allZones.find(z => z.slug === compareZone1)?.name}</div>
                <div>{allZones.find(z => z.slug === compareZone2)?.name}</div>
              </div>
              <div className={styles.tableRow}>
                <div>1</div>
                <div>{getTranslation(currentLang, 'zoneDetail.compare.criteria.location')}</div>
                <div>{allZones.find(z => z.slug === compareZone1)?.address}</div>
                <div>{allZones.find(z => z.slug === compareZone2)?.address}</div>
              </div>
              <div className={`${styles.tableRow} ${styles.alt}`}>
                <div>2</div>
                <div>{getTranslation(currentLang, 'zoneDetail.compare.criteria.scale')}</div>
                <div>{allZones.find(z => z.slug === compareZone1)?.area}</div>
                <div>{allZones.find(z => z.slug === compareZone2)?.area}</div>
              </div>
              <div className={styles.tableRow}>
                <div>3</div>
                <div>{getTranslation(currentLang, 'zoneDetail.compare.criteria.price')}</div>
                <div>{allZones.find(z => z.slug === compareZone1)?.price}</div>
                <div>{allZones.find(z => z.slug === compareZone2)?.price}</div>
              </div>
            </div>
          )}
        </section>

        {/* Download Section */}
        <section className={styles.downloadSection}>
          <h2>{getTranslation(currentLang, 'zoneDetail.download.title')}</h2>
          <a href="#">
            <span>{getTranslation(currentLang, 'zoneDetail.download.link')}</span>
            <BsDownload />
          </a>
        </section>
      </div>
      <FooterIIP />
    </>
  )
}
