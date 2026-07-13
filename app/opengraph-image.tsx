import { ImageResponse } from "next/og";
import { business } from "@/data/site-config";

export const dynamic = "force-static";
export const alt = business.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#142F2A",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              backgroundColor: "#F3F5F1",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C89448",
            }}
          >
            {business.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#F3F5F1" }}>
            {business.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#D8DED6", maxWidth: 920 }}>
            {business.descriptionShort}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
