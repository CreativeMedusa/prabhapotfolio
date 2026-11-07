import os
from pypdf import PdfReader
from PIL import Image
import io

pdf_path = "medusa_potfolio-main/Portfolio.pdf"
dest_dir = "medusa_potfolio-main/portfolio_assets"
os.makedirs(dest_dir, exist_ok=True)

reader = PdfReader(pdf_path)

# Let's map target pages to desired asset names
# We ignore the common background/decorative images by size/hashes
IGNORE_SIZES = {1263073, 2179505, 1339419, 320162, 74958, 84212, 27625}

extractions = {
    9: "2d_tree_of_life.png",
    10: "digital_painting_angel.png",
    11: "digital_painting_masks.png",
    20: "motion_graphic_cover.png",
    21: "motion_graphic_1.png",
    22: "motion_graphic_2.png",
    31: "logo_ground_zero.jpg",
    36: "breakthrough_satvik.png",
    37: "breakthrough_cashify.png",
    38: "breakthrough_azul.png",
    39: "breakthrough_kaleshi.png"
}

for p_num, filename in extractions.items():
    page = reader.pages[p_num - 1]
    saved = False
    for img in page.images:
        if len(img.data) not in IGNORE_SIZES:
            out_path = os.path.join(dest_dir, filename)
            with open(out_path, "wb") as f:
                f.write(img.data)
            print(f"Extracted Page {p_num} -> {filename} ({len(img.data)} bytes)")
            saved = True
            break
    if not saved:
        print(f"WARNING: No unique art found on Page {p_num}")

# Page 43 has 3 wallpapers
page_43 = reader.pages[42]
wp_idx = 1
for img in page_43.images:
    if len(img.data) not in IGNORE_SIZES:
        fname = f"wallpaper_{wp_idx}.jpg"
        out_path = os.path.join(dest_dir, fname)
        with open(out_path, "wb") as f:
            f.write(img.data)
        print(f"Extracted Page 43 Wallpaper {wp_idx} -> {fname} ({len(img.data)} bytes)")
        wp_idx += 1

print("\nExtraction complete! Listing assets in", dest_dir)
for f in sorted(os.listdir(dest_dir)):
    sz = os.path.getsize(os.path.join(dest_dir, f))
    print(f"  {f:32} {sz:>10} bytes")

