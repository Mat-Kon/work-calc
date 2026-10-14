import { type MetadataRoute } from "next";

const THEME_COLOR = "#f5862f";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MKcalc",
    short_name: "MKc",
    description:
      "Приложение для мастеров по ремонту балконов. Расчёт стоимости ремонта и остекления.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: THEME_COLOR,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
