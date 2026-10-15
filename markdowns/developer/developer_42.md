# Xcode Device Hub - Simulator Photos Import Tutorial

**Date:** 2026-09-22 18:35 CST  
**Operator:** Cursor agent (xcrun simctl)

## Goal

Add every photo in `/Users/user/Desktop/photos` to the **Photos library** of the booted **iPhone 18 Pro** simulator, not Files / File Provider storage.

## Target device

| Field | Value |
|---|---|
| Name | iPhone 18 Pro |
| UDID | `87133C9B-8CB3-47F0-A9CA-74165E66D456` |
| State | Booted |

A second simulator was also booted (`Duo Beta`, `A01ACDCB-F232-44F0-8F49-098AE6F4E481`). Import used the **UDID**, not `booted`, so media could not land on the wrong device.

## Source files

- Folder: `/Users/user/Desktop/photos`
- Count: **69** `.jpg` files (122 MB)
- Other image/video types in that folder: **none**
- Filenames: `1.jpg` … `99.jpg` (non-contiguous numbering; 69 files total)

## Steps

### 1. Confirm the simulator is booted

```bash
xcrun simctl list | grep Booted 
```

Result:

```
iPhone 18 Pro (87133C9B-8CB3-47F0-A9CA-74165E66D456) (Booted) 
Duo Beta (A01ACDCB-F232-44F0-8F49-098AE6F4E481) (Booted) 
```

### 2. Import into Photos (not Files)

Do **not** copy into `File Provider Storage` / Documents. That only appears in the Files app.

```bash
UDID="87133C9B-8CB3-47F0-A9CA-74165E66D456"
xcrun simctl addmedia "$UDID" /Users/user/Desktop/photos/*
```

**Note:** `*` imports every file in the folder (`.jpg`, `.jpeg`, `.png`, `.gif`, `.heic`, and the rest). Keep the folder to photos only.

To import only some formats:

```bash
xcrun simctl addmedia "$UDID" /Users/user/Desktop/photos/*.{jpg,jpeg,png,gif,heic}
```

zsh fails with `no matches found` if any listed extension is missing. Use only extensions that exist, or run `setopt NULL_GLOB` first.

### 3. Refresh Photos (usually not needed, system will auto refresh the photo library)

```bash
xcrun simctl terminate 87133C9B-8CB3-47F0-A9CA-74165E66D456 com.apple.mobileslideshow
xcrun simctl launch 87133C9B-8CB3-47F0-A9CA-74165E66D456 com.apple.mobileslideshow
```

## Results

| Check | Result |
|---|---|
| `simctl addmedia` exit code | **0** (success; command prints nothing on success) |
| Source files passed | **69** |
| Photos app launch | PID **37570**, exit **0** |
| `Photos.sqlite` `ZASSET` count | **75** |
| Files in `DCIM/100APPLE` | **75** |

Breakdown of the 75 camera-roll files:

- **IMG_0001–IMG_0006** — existing simulator sample assets (dated Jun 18; includes `IMG_0006.HEIC`)
- **IMG_0007–IMG_0075** — **69 newly imported JPEGs** (source mtimes Jun 6 2024, matching Desktop originals)

On-disk location:

```
~/Library/Developer/CoreSimulator/Devices/87133C9B-8CB3-47F0-A9CA-74165E66D456/data/Media/DCIM/100APPLE/
```

## How to view them

1. In Xcode Device Hub, select **iPhone 18 Pro** (not Duo Beta).
2. Open the **Photos** app → Recents / Library.
3. The 69 imported shots should appear with the 6 built-in samples.

## What did not work (and why)

| Attempt | Outcome |
|---|---|
| `xcrun simctl addmedia booted …` | Ambiguous with two booted sims; may import to Duo Beta |
| `rsync` into File Provider Storage | Files app only; Photos never indexes those copies |
| Drag-and-drop onto Device Hub | Xcode 27 Device Hub does not import media that way |

## Repeat later

```bash
setopt NULL_GLOB; for UDID in $(xcrun simctl list devices booted | grep -oE '[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}'); do xcrun simctl addmedia "$UDID" /Users/gavinxiang/Documents/Resources/Photos/*.{jpg,jpeg,png}; done
```

`NULL_GLOB` skips any listed extension that is not in the folder, and the loop imports into every booted simulator.