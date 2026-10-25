import { ImageResponse } from "next/og";
import { identity } from "@/content";

export const alt = `${identity.name}: ${identity.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static social preview. Contains no metrics, awards or affiliations.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#0e121b",
          borderTop: "12px solid #047857",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.5 19.5 5.5v6c0 4.4-3.1 8-7.5 10-4.4-2-7.5-5.6-7.5-10v-6L12 2.5Z"
              stroke="#047857"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path d="m8.5 12 2.5 2.5 4-4.5" stroke="#047857" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="15" cy="10" r="1.25" fill="#047857" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{identity.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            Verify medication orders with evidence, context, and human oversight.
          </div>
          <div style={{ fontSize: 30, color: "#525866", maxWidth: 900 }}>{identity.descriptor}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#733e0a",
            background: "#fefce8",
            border: "2px solid #fff085",
            borderRadius: 12,
            padding: "14px 20px",
            alignSelf: "flex-start",
          }}
        >
          Research and demonstration project. Not for clinical use.
        </div>
      </div>
    ),
    { ...size },
  );
}
