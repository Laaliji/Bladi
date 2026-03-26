"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────
//  Geo calibration for map_bg.png
//  The image covers the full Morocco map (including Western Sahara).
//  Bounding box (approx):
//    West: -17.1°   East: -1.0°  → 16.1° lon span
//    North: 36.0°   South: 20.8° → 15.2° lat span
//
//  x% = (lon + 17.1) / 16.1 × 100
//  y% = (36.0 − lat)  / 15.2 × 100
// ─────────────────────────────────────────────────────────────────

export type CityType = 'heritage' | 'artisan' | 'food'

export interface MapCity {
  id: string
  name: string
  nameAr: string
  x: number   // % of image width
  y: number   // % of image height
  type: CityType
  heritageSites: number
  artisans: number
  highlights: string[]
}

function geo(lon: number, lat: number) {
  return {
    x: +((lon + 17.1) / 16.1 * 100).toFixed(1),
    y: +((36.0 - lat)  / 15.2 * 100).toFixed(1),
  }
}

// Helper: Create city with easily adjustable x/y offsets
function createCity(
  id: string,
  name: string,
  nameAr: string,
  lon: number,
  lat: number,
  type: CityType,
  xOffset: number = 0,
  yOffset: number = 0,
  config: Omit<MapCity, 'id' | 'name' | 'nameAr' | 'x' | 'y' | 'type'> = {}
): MapCity {
  const pos = geo(lon, lat)
  return {
    id,
    name,
    nameAr,
    x: pos.x + xOffset,
    y: pos.y + yOffset,
    type,
    ...config,
  }
}

// 9 selected cities – precisely calibrated to match screenshot
// Formulas: x% = (lon + 17.1) / 16.1 × 100, y% = (36.0 − lat) / 15.2 × 100
export const MOROCCO_CITIES: MapCity[] = [
  createCity(
    'tangier', 'Tanger', 'طنجة',
    -5.80, 35.78, 'heritage',
    -1.2, -0.8, // Fine-tuned to exact position
    { heritageSites: 18, artisans: 42, highlights: ['Kasbah Museum', 'Caves of Hercules', 'Grand Socco'] }
  ),
  createCity(
    'chefchaouen', 'Chefchaouen', 'شفشاون',
    -5.27, 35.17, 'heritage',
    0.3, -0.2, // Fine-tuned positioning
    { heritageSites: 9, artisans: 55, highlights: ['Blue Medina', 'Ras Elma Spring', 'Spanish Mosque'] }
  ),
  createCity(
    'fes', 'Fès', 'فاس',
    -5.00, 34.05, 'heritage',
    1.5, 0.5, // Fine-tuned positioning
    { heritageSites: 31, artisans: 180, highlights: ['Al-Qarawiyyin', 'Bou Inania Madrasa', 'Chouara Tannery'] }
  ),
  createCity(
    'meknes', 'Meknès', 'مكناس',
    -5.55, 33.90, 'heritage',
    -0.8, 0.8, // Fine-tuned positioning
    { heritageSites: 14, artisans: 70, highlights: ['Bab Mansour', 'Mausoleum of Moulay Ismail', 'Place El Hedim'] }
  ),
  createCity(
    'rabat', 'Rabat', 'الرباط',
    -6.85, 34.02, 'heritage',
    -1.5, 0.3, // Fine-tuned to exact position
    { heritageSites: 22, artisans: 90, highlights: ['Hassan Tower', 'Chellah', 'Kasbah des Oudaias'] }
  ),
  createCity(
    'casablanca', 'Casablanca', 'الدار البيضاء',
    -7.60, 33.60, 'artisan',
    -0.5, 0.6, // Fine-tuned positioning
    { heritageSites: 15, artisans: 120, highlights: ['Hassan II Mosque', 'Morocco Mall', 'Quartier Habous'] }
  ),
  createCity(
    'safi', 'Safi', 'آسفي',
    -9.24, 32.30, 'artisan',
    0.2, 0.4, // Fine-tuned positioning
    { heritageSites: 9, artisans: 75, highlights: ['Kechla Fortress', 'Pottery Quarter', 'Portuguese Chapel'] }
  ),
  createCity(
    'essaouira', 'Essaouira', 'الصويرة',
    -9.77, 31.51, 'food',
    0.3, -0.6, // Fine-tuned positioning
    { heritageSites: 12, artisans: 88, highlights: ['Medina UNESCO', 'Skala Ramparts', 'Gnawa Festival'] }
  ),
  createCity(
    'marrakech', 'Marrakech', 'مراكش',
    -8.01, 31.65, 'artisan',
    0.6, 0.2, // Fine-tuned positioning
    { heritageSites: 24, artisans: 156, highlights: ['Jemaa el-Fna', 'Bahia Palace', 'Majorelle Garden'] }
  ),
]

export const TYPE_META: Record<CityType, { label: string; hex: string }> = {
  heritage: { label: 'Heritage', hex: '#C1121F' },
  artisan:  { label: 'Artisan',  hex: '#C9A84C' },
  food:     { label: 'Food',     hex: '#1B7A34' },
}

interface Props {
  hoveredCity: MapCity | null
  selectedCity: MapCity | null
  onCityHover: (c: MapCity | null) => void
  onCityClick: (c: MapCity) => void
  /** px from top of map container where image starts */
  topOffset?: number
  /** px at the bottom reserved by bottom sheet + nav */
  bottomOffset?: number
  /** whether the host background is dark (adjusts legend style) */
  isDark?: boolean
  className?: string
}

export function InteractiveMoroccoMap({
  hoveredCity,
  selectedCity,
  onCityHover,
  onCityClick,
  topOffset = 0,
  bottomOffset = 0,
  isDark = false,
  className,
}: Props) {

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {/*
       * Image wrapper: fixed aspect ratio, inset by topOffset / bottomOffset.
       * Dots are % within this box → always pixel-accurate.
       */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: topOffset,
          bottom: bottomOffset,
        }}
      >
        <Image
          src="/map_bg.png"
          alt="Map of Morocco"
          fill
          style={{ objectFit: 'contain', objectPosition: 'center top' }}
          priority
          draggable={false}
        />

        {MOROCCO_CITIES.map((city) => {
          const isHovered  = hoveredCity?.id  === city.id
          const isSelected = selectedCity?.id === city.id
          const meta       = TYPE_META[city.type]

          // Flip tooltip below dot when near the top edge
          const tipBelow = city.y < 15

          // Dot sizes per state
          const sz = isSelected ? 14 : isHovered ? 11 : 7

          return (
            <div
              key={city.id}
              className="absolute z-10 cursor-pointer"
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%,-50%)' }}
              onMouseEnter={() => onCityHover(city)}
              onMouseLeave={() => onCityHover(null)}
              onClick={(e) => { e.stopPropagation(); onCityClick(city) }}
            >
              {/* Pulse ring – hover only (not selected) */}
              {isHovered && !isSelected && (
                <span
                  className="absolute rounded-full animate-ping pointer-events-none"
                  style={{
                    width: sz * 2.8,
                    height: sz * 2.8,
                    top: -(sz * 0.9),
                    left: -(sz * 0.9),
                    backgroundColor: meta.hex,
                    opacity: 0.35,
                  }}
                />
              )}

              {/* Glow ring – selected only */}
              {isSelected && (
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: sz * 3.2,
                    height: sz * 3.2,
                    top: -(sz * 1.1),
                    left: -(sz * 1.1),
                    backgroundColor: meta.hex,
                    opacity: 0.22,
                    filter: 'blur(6px)',
                  }}
                />
              )}

              {/* Dot */}
              <span
                className="relative block rounded-full transition-all duration-200"
                style={{
                  width: sz,
                  height: sz,
                  backgroundColor: isSelected ? 'white' : meta.hex,
                  border: isSelected
                    ? `2.5px solid ${meta.hex}`
                    : isHovered
                    ? `2px solid white`
                    : `1.5px solid white`,
                  boxShadow: isSelected
                    ? `0 0 0 3px ${meta.hex}, 0 2px 6px rgba(0,0,0,0.3)`
                    : `0 1px 4px rgba(0,0,0,0.25)`,
                }}
              />

              {/* Tooltip – hover: minimal, selected: richer */}
              {(isHovered || isSelected) && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-0.5"
                  style={tipBelow ? { top: '110%', marginTop: 3 } : { bottom: '110%', marginBottom: 3 }}
                >
                  {/* Caret above tooltip (when tooltip is above dot) */}
                  {!tipBelow && (
                    <div
                      style={{
                        width: 0, height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: `5px solid ${isSelected ? meta.hex : meta.hex}`,
                        order: 99,
                      }}
                    />
                  )}

                  <div
                    className="px-2 py-1 rounded-lg shadow-xl whitespace-nowrap text-center"
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'rgba(255,255,255,0.97)',
                            border: `2px solid ${meta.hex}`,
                            backdropFilter: 'blur(4px)',
                          }
                        : {
                            backgroundColor: meta.hex,
                          }
                    }
                  >
                    <p
                      style={{
                        fontSize: isSelected ? 10.5 : 9,
                        fontWeight: 700,
                        color: isSelected ? '#1a1a1a' : 'white',
                        lineHeight: 1.2,
                      }}
                    >
                      {city.name}
                    </p>
                    {isSelected && (
                      <p style={{ fontSize: 8, color: meta.hex, marginTop: 1 }}>
                        {meta.label} · {city.heritageSites} sites
                      </p>
                    )}
                  </div>

                  {/* Caret below tooltip (when tooltip is below dot) */}
                  {tipBelow && (
                    <div
                      style={{
                        width: 0, height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderBottom: `5px solid ${meta.hex}`,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-1 z-20 flex flex-col gap-1 pointer-events-none">
        {(Object.entries(TYPE_META) as [CityType, (typeof TYPE_META)[CityType]][]).map(([type, meta]) => (
          <div key={type} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: meta.hex, border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.7)' }}
            />
            <span
              className="text-[7.5px] font-semibold px-1 py-0.5 rounded leading-none"
              style={{
                backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
                color: 'white',
              }}
            >
              {meta.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
