"use client";

import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker, NavigationControl, addProtocol, removeProtocol } from "maplibre-gl";
import { Protocol } from "pmtiles";
import { layers, namedFlavor } from "@protomaps/basemaps";
import "maplibre-gl/dist/maplibre-gl.css";
import { useI18n } from "@/components/i18n-provider";
import { business, mapArea } from "@/data/site-config";

// Marker: lucide "map-pin" in the brand colours, tip at the bottom centre.
const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1f4a43" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 2px 4px rgba(18,33,29,.35))"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" fill="#f3f5f1"/><circle cx="12" cy="10" r="3" fill="#1f4a43"/></svg>`;

// Interactive map served entirely from this origin — vector tiles
// (public/map/tetovo.pmtiles), glyphs and sprites under public/map/ — so no request
// leaves the site and no cookie consent is involved. MapLibre is ~250 KB gzipped,
// which is why MapEmbed only mounts this once the contact section is near.
export default function LocalMap() {
  const container = useRef<HTMLDivElement>(null);
  const { locale, t } = useI18n();

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const protocol = new Protocol();
    addProtocol("pmtiles", protocol.tile);
    const origin = window.location.origin;
    const [west, south, east, north] = mapArea.bounds;
    const pad = 0.01;

    const map = new MapLibreMap({
      container: el,
      style: {
        version: 8,
        glyphs: `${origin}/map/fonts/{fontstack}/{range}.pbf`,
        sprite: `${origin}/map/sprites/light`,
        sources: {
          protomaps: {
            type: "vector",
            url: `pmtiles://${origin}/map/tetovo.pmtiles`,
            attribution:
              '<a href="https://github.com/protomaps/basemaps" target="_blank" rel="noopener noreferrer">Protomaps</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
          },
        },
        layers: layers("protomaps", namedFlavor("light"), { lang: locale }),
      },
      center: [business.geo.lng, business.geo.lat],
      zoom: mapArea.initialZoom,
      minZoom: mapArea.minZoom,
      maxZoom: mapArea.maxZoom,
      maxBounds: [
        [west - pad, south - pad],
        [east + pad, north + pad],
      ],
      cooperativeGestures: true,
      attributionControl: { compact: false },
      locale: {
        "NavigationControl.ZoomIn": t.map.zoomIn,
        "NavigationControl.ZoomOut": t.map.zoomOut,
        "CooperativeGesturesHandler.WindowsHelpText": t.map.gestureWindows,
        "CooperativeGesturesHandler.MacHelpText": t.map.gestureMac,
        "CooperativeGesturesHandler.MobileHelpText": t.map.gestureTouch,
      },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");

    const pin = document.createElement("div");
    pin.innerHTML = PIN_SVG;
    pin.setAttribute("aria-hidden", "true");
    new Marker({ element: pin, anchor: "bottom" })
      .setLngLat([business.geo.lng, business.geo.lat])
      .addTo(map);

    return () => {
      map.remove();
      removeProtocol("pmtiles");
    };
  }, [locale, t]);

  return <div ref={container} role="img" aria-label={t.map.label} className="absolute inset-0" />;
}
