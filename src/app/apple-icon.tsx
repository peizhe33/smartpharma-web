import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#047857",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5 19.5 5.5v6c0 4.4-3.1 8-7.5 10-4.4-2-7.5-5.6-7.5-10v-6L12 2.5Z"
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="m8.5 12 2.5 2.5 4-4.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="10" r="1.25" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
