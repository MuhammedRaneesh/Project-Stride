import { Link } from "react-router-dom";
import "./brand-strip.css";

// Brand and notes data — edit or reorder items here
const BRAND_ITEMS = [
  { type: "brand", name: "NIKE", slug: "nike" },
  { type: "note", text: "New drops every week" },
  { type: "brand", name: "ADIDAS", slug: "adidas" },
  { type: "note", text: "Easy returns" },
  { type: "brand", name: "PUMA", slug: "puma" },
  { type: "note", text: "Authentic sneakers" },
  { type: "brand", name: "NEW BALANCE", slug: "new-balance" },
  { type: "note", text: "Secure payments" },
];

// Repeat list 3 times per group to ensure each half exceeds any screen width (including 4K)
const REPEATED_ITEMS = [...BRAND_ITEMS, ...BRAND_ITEMS, ...BRAND_ITEMS];

function BrandStrip({ twoRows = false, dark = false }) {
  // Renders one half of the infinite loop
  const renderGroup = (isDuplicate = false, isReverse = false) => (
    <div
      className={`brand-strip-group ${isReverse ? "reverse" : ""}`}
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      {REPEATED_ITEMS.map((item, index) => (
        <span key={index} className="brand-strip-item-wrapper">
          {item.type === "brand" ? (
            <Link
              to={`/shop?brand=${item.slug}`}
              className="brand-strip-link"
              tabIndex={isDuplicate ? -1 : 0}
            >
              {item.name}
            </Link>
          ) : (
            <span className="brand-strip-note">{item.text}</span>
          )}
          <span className="brand-strip-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      className={`brand-strip-section ${dark ? "dark" : ""}`}
      aria-label="Brands we carry"
    >
      <div className="brand-strip-label">BRANDS WE CARRY</div>

      <div className="brand-strip-band">
        {/* Row 1 (standard right-to-left) */}
        <div className="brand-strip-row">
          {renderGroup(false, false)}
          {renderGroup(true, false)}
        </div>

        {/* Optional Row 2 (opposite direction) */}
        {twoRows && (
          <div className="brand-strip-row">
            {renderGroup(false, true)}
            {renderGroup(true, true)}
          </div>
        )}
      </div>
    </section>
  );
}

export default BrandStrip;
