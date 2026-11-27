#!/usr/bin/env python3
"""Losslessly remove EXIF/XMP (APP1) and comment segments from JPEG files.

Usage: python3 scripts/strip-jpeg-metadata.py public/assets/*.jpg
Pixel data is untouched: only metadata segments are dropped.
"""
import sys


def strip(data: bytes) -> bytes:
    if data[:2] != b"\xff\xd8":
        raise ValueError("not a JPEG")
    out = bytearray(b"\xff\xd8")
    i = 2
    while i < len(data):
        if data[i] != 0xFF:
            raise ValueError(f"bad marker at {i}")
        marker = data[i + 1]
        if marker == 0xDA:  # start of scan: copy the rest as-is
            out += data[i:]
            break
        length = int.from_bytes(data[i + 2:i + 4], "big")
        seg = data[i:i + 2 + length]
        # drop APP1 (EXIF/XMP), APP2..APP15 except ICC (APP2 'ICC_PROFILE'), and COM
        drop = marker == 0xE1 or marker == 0xFE or (
            0xE3 <= marker <= 0xEF
        ) or (marker == 0xE2 and not seg[4:16].startswith(b"ICC_PROFILE"))
        if not drop:
            out += seg
        i += 2 + length
    return bytes(out)


for path in sys.argv[1:]:
    with open(path, "rb") as f:
        raw = f.read()
    if raw[:2] != b"\xff\xd8":
        print(f"skip {path}: not a JPEG")
        continue
    clean = strip(raw)
    if clean != raw:
        with open(path, "wb") as f:
            f.write(clean)
        print(f"stripped {path}: {len(raw) - len(clean)} bytes")
