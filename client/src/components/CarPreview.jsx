import React from 'react'
import { CAR_OPTIONS } from '../utilities/calcPrice'

const CarPreview = ({ exterior, roof, wheels, interior, convertible }) => {
  const exteriorOpt = CAR_OPTIONS.exterior.find(o => o.value === exterior)
  const wheelsOpt   = CAR_OPTIONS.wheels.find(o => o.value === wheels)
  const interiorOpt = CAR_OPTIONS.interior.find(o => o.value === interior)

  const bodyColor     = exteriorOpt?.color    || '#1a1a2e'
  const wheelColor    = wheelsOpt?.color      || '#555555'
  const interiorColor = interiorOpt?.color    || '#9e9e9e'

  // Lighten body color slightly for highlights
  const highlight = 'rgba(255,255,255,0.15)'

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <svg
        viewBox="0 0 520 230"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: '520px', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
      >
        {/* Ground shadow */}
        <ellipse cx="260" cy="222" rx="230" ry="8" fill="rgba(0,0,0,0.4)" />

        {/* Car body (lower panel) */}
        <path
          d="M 55 175 L 55 145 Q 58 130 75 128 L 445 128 Q 462 130 465 145 L 465 175 Q 462 185 445 188 L 75 188 Q 58 185 55 175 Z"
          fill={bodyColor}
        />

        {/* Cabin / roof area */}
        {!convertible && (
          <path
            d="M 115 128 Q 130 68 185 58 L 335 58 Q 390 68 405 128 Z"
            fill={bodyColor}
          />
        )}

        {/* Windshield / windows */}
        {!convertible && (
          <path
            d="M 135 126 Q 148 78 188 70 L 332 70 Q 372 78 385 126 Z"
            fill={interiorColor}
            opacity="0.55"
          />
        )}

        {/* Sunroof overlay */}
        {!convertible && roof === 'Sunroof' && (
          <rect x="220" y="62" width="80" height="50" rx="4" fill={interiorColor} opacity="0.45" />
        )}

        {/* Panoramic roof overlay */}
        {!convertible && roof === 'Panoramic' && (
          <rect x="155" y="62" width="210" height="50" rx="4" fill={interiorColor} opacity="0.45" />
        )}

        {/* Roof highlight */}
        {!convertible && (
          <path
            d="M 155 120 Q 165 82 190 74 L 265 72 Q 215 76 205 120 Z"
            fill={highlight}
          />
        )}

        {/* Body highlight */}
        <rect x="70" y="132" width="120" height="12" rx="6" fill={highlight} />

        {/* Door line */}
        <line x1="258" y1="128" x2="258" y2="188" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />

        {/* Headlights */}
        <rect x="452" y="138" width="22" height="14" rx="4" fill="#ffe97a" opacity="0.95" />
        <rect x="452" y="155" width="14" height="8" rx="3" fill="#ffe97a" opacity="0.6" />

        {/* Taillights */}
        <rect x="46" y="138" width="22" height="14" rx="4" fill="#ff2200" opacity="0.9" />
        <rect x="52" y="155" width="14" height="8" rx="3" fill="#ff2200" opacity="0.6" />

        {/* Front bumper */}
        <rect x="453" y="153" width="20" height="28" rx="5" fill={bodyColor} />

        {/* Rear bumper */}
        <rect x="47" y="153" width="20" height="28" rx="5" fill={bodyColor} />

        {/* Front wheel */}
        <circle cx="385" cy="193" r="35" fill="#111" />
        <circle cx="385" cy="193" r="24" fill={wheelColor} />
        <circle cx="385" cy="193" r="10" fill="#111" />
        {/* Wheel spokes */}
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <line
            key={angle}
            x1={385 + Math.cos((angle * Math.PI) / 180) * 10}
            y1={193 + Math.sin((angle * Math.PI) / 180) * 10}
            x2={385 + Math.cos((angle * Math.PI) / 180) * 22}
            y2={193 + Math.sin((angle * Math.PI) / 180) * 22}
            stroke="#111"
            strokeWidth="3"
          />
        ))}

        {/* Rear wheel */}
        <circle cx="135" cy="193" r="35" fill="#111" />
        <circle cx="135" cy="193" r="24" fill={wheelColor} />
        <circle cx="135" cy="193" r="10" fill="#111" />
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <line
            key={angle}
            x1={135 + Math.cos((angle * Math.PI) / 180) * 10}
            y1={193 + Math.sin((angle * Math.PI) / 180) * 10}
            x2={135 + Math.cos((angle * Math.PI) / 180) * 22}
            y2={193 + Math.sin((angle * Math.PI) / 180) * 22}
            stroke="#111"
            strokeWidth="3"
          />
        ))}
      </svg>

      {convertible && (
        <div style={{
          display: 'inline-block',
          background: 'var(--primary)',
          color: 'white',
          padding: '4px 14px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          marginTop: '4px'
        }}>
          CONVERTIBLE
        </div>
      )}

      {roof !== 'Standard' && !convertible && (
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          padding: '4px 14px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          marginTop: '4px',
          marginLeft: '6px'
        }}>
          {roof.toUpperCase()} ROOF
        </div>
      )}
    </div>
  )
}

export default CarPreview
