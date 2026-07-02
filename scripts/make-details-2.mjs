// Second asset pass: derive product shots for catalog expansion.
import sharp from "sharp";
import path from "node:path";

const ASSETS = path.resolve("src/assets");
const OUT = path.join(ASSETS, "details");

const crops = [
  // Cream tee (worn with Monaco Gurkha) — waist-up
  { src: "product-gurkha.jpg", out: "product-tee-cream.jpg", r: [0.3, 0.1, 0.42, 0.34] },
  { src: "product-gurkha.jpg", out: "detail-tee-cream.jpg", r: [0.36, 0.16, 0.3, 0.24] },
  // Sand linen trousers by the sea wall (lookbook-2 lower half)
  { src: "lookbook-2.jpg", out: "product-trouser-sand.jpg", r: [0.24, 0.55, 0.52, 0.42] },
  // Taupe pleated linen trousers (lookbook-1 lower band)
  { src: "lookbook-1.jpg", out: "product-trouser-taupe.jpg", r: [0.18, 0.58, 0.55, 0.36] },
  // Ostuni linen shirt torso (lookbook-1 left man)
  { src: "lookbook-1.jpg", out: "detail-linen-ostuni.jpg", r: [0.08, 0.42, 0.32, 0.34] },
  // Suede loafer (lookbook-1 bottom right)
  { src: "lookbook-1.jpg", out: "product-loafer-suede.jpg", r: [0.68, 0.76, 0.3, 0.22] },
  // Cream trousers in the library (journal-1, seated legs)
  { src: "journal-1.jpg", out: "product-trouser-ivory.jpg", r: [0.28, 0.55, 0.38, 0.43] },
  // Ribbed oat sweater (journal-2 bottom of stack)
  { src: "journal-2.jpg", out: "product-knit-oat.jpg", r: [0.0, 0.48, 0.46, 0.5] },
  // Poplin cuff detail (insta-4)
  { src: "insta-4.jpg", out: "detail-poplin-cuff.jpg", r: [0.3, 0.28, 0.5, 0.5] },
];

for (const { src, out, r } of crops) {
  const input = path.join(ASSETS, src);
  const meta = await sharp(input).metadata();
  const left = Math.round(meta.width * r[0]);
  const top = Math.round(meta.height * r[1]);
  const width = Math.min(Math.round(meta.width * r[2]), meta.width - left);
  const height = Math.min(Math.round(meta.height * r[3]), meta.height - top);
  await sharp(input)
    .extract({ left, top, width, height })
    .resize(900, 1125, { fit: "cover" })
    .jpeg({ quality: 84 })
    .toFile(path.join(OUT, out));
  console.log("✓", out, `${width}x${height}`);
}
console.log("done");
