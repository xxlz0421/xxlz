"""Convert a local image inventory to web assets and a project manifest.

Usage: python scripts/import-portfolio-images.py inventory.json
The inventory is generated locally and never becomes part of the site.
"""

import json
import sys
from pathlib import Path

from PIL import Image, ImageOps


project = Path(__file__).resolve().parents[1]
inventory = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8-sig"))
output = project / "public" / "portfolio"
grouped = {}

for entry in inventory:
    category = entry["category"]
    source = Path(entry["path"])
    index = len(grouped.setdefault(category, [])) + 1
    target_dir = output / category
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"{index:03d}.webp"
    try:
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((1600, 6000), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            image.save(target, "WEBP", quality=82, method=5)
    except Exception as exc:
        print(f"Skipped {source.name}: {exc}", file=sys.stderr)
        continue
    grouped[category].append({
        "src": f"/portfolio/{category}/{index:03d}.webp",
        "alt": f"{category} · {entry['section']} · {index:02d}",
        "label": entry["section"],
        "width": image.width,
        "height": image.height,
    })

manifest = project / "src" / "portfolioMedia.js"
manifest.write_text(
    "// Generated from the user's selected portfolio folder.\n"
    + "export const portfolioMedia = "
    + json.dumps(grouped, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8",
)
for category, images in grouped.items():
    print(f"{category}: {len(images)} images")
