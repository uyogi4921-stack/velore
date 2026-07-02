// One-off asset pipeline: derive PDP detail crops from campaign photography.
// Usage: node scripts/make-details.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.resolve("src/assets");
const OUT = path.join(ASSETS, "details");

// Regions are fractions of source dimensions: [left, top, width, height]
const crops = [
  { src: "product-polo.jpg", out: "detail-polo-sage.jpg", r: [0.3, 0.24, 0.42, 0.34] },
  { src: "product-polo-navy.jpg", out: "detail-polo-navy.jpg", r: [0.3, 0.2, 0.42, 0.34] },
  { src: "product-polo-cream.jpg", out: "detail-polo-cream.jpg", r: [0.3, 0.2, 0.42, 0.34] },
  { src: "product-linen.jpg", out: "detail-linen-white.jpg", r: [0.32, 0.28, 0.4, 0.32] },
  { src: "product-linen-blue.jpg", out: "detail-linen-blue.jpg", r: [0.3, 0.24, 0.42, 0.34] },
  { src: "product-linen-sand.jpg", out: "detail-linen-sand.jpg", r: [0.3, 0.24, 0.42, 0.34] },
  { src: "product-chino.jpg", out: "detail-chino-olive.jpg", r: [0.3, 0.48, 0.4, 0.32] },
  { src: "product-chino.jpg", out: "detail-knit-taupe.jpg", r: [0.3, 0.22, 0.42, 0.3] },
  { src: "product-chino-sand.jpg", out: "detail-chino-sand.jpg", r: [0.3, 0.45, 0.4, 0.32] },
  { src: "product-chino-navy.jpg", out: "detail-chino-navy.jpg", r: [0.3, 0.45, 0.4, 0.32] },
  { src: "product-gurkha.jpg", out: "detail-gurkha-cream.jpg", r: [0.32, 0.36, 0.38, 0.3] },
  { src: "product-gurkha-olive.jpg", out: "detail-gurkha-olive.jpg", r: [0.3, 0.36, 0.4, 0.32] },
  { src: "product-gurkha-stone.jpg", out: "detail-gurkha-stone.jpg", r: [0.3, 0.36, 0.4, 0.32] },
  { src: "insta-6.jpg", out: "detail-polo-stone.jpg", r: [0.3, 0.3, 0.42, 0.4] },
  { src: "lookbook-2.jpg", out: "detail-linen-air.jpg", r: [0.26, 0.26, 0.48, 0.38] },
  { src: "lookbook-3.jpg", out: "detail-polo-blanc.jpg", r: [0.28, 0.18, 0.44, 0.36] },
  { src: "journal-2.jpg", out: "detail-knit-camel.jpg", r: [0.0, 0.04, 0.46, 0.9] },
  { src: "insta-2.jpg", out: "detail-loafer.jpg", r: [0.22, 0.35, 0.56, 0.5] },
];

await mkdir(OUT, { recursive: true });

for (const { src, out, r } of crops) {
  const input = path.join(ASSETS, src);
  const meta = await sharp(input).metadata();
  const left = Math.round(meta.width * r[0]);
  const top = Math.round(meta.height * r[1]);
  const width = Math.min(Math.round(meta.width * r[2]), meta.width - left);
  const height = Math.min(Math.round(meta.height * r[3]), meta.height - top);
  await sharp(input)
    .extract({ left, top, width, height })
    .resize(900, 1125, { fit: "cover" }) // 4:5 to match PDP gallery ratio
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT, out));
  console.log("✓", out, `${width}x${height}`);
}
console.log("done");
