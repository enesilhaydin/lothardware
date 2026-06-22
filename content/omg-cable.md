---
title: "O.MG Cable"
date: 2026-06-22
image: /images/omg-cable.jpg
tags: ["omg", "cable", "implant", "hid", "wifi"]
description: The O.MG Cable, made by Mischief Gadgets, is a USB cable with a covert implant hidden inside the connector. It looks and works like an ordinary charging or data cable but contains an ESP32 class system on chip with Wi-Fi that lets an operator inject keystrokes and run payloads over a remote web interface. Because the implant emulates a USB HID keyboard, the vendor and product IDs it presents to the host are chosen by the operator and have no fixed factory default.
---

<p align="center">
  <img src="/images/omg-cable.jpg" alt="O.MG Cable" width="50%" decoding="async">
</p>

## Description

The O.MG Cable hides an ESP32-S2 or ESP32-S3 class controller inside a normal looking USB cable. When triggered over its Wi-Fi interface it enumerates as a USB HID keyboard and injects keystrokes into the host. The same platform ships in several form factors, including the O.MG Plug and the O.MG Keylogger Cable. The cable is configured and flashed through a separate O.MG Programmer board, which enumerates as a Silicon Labs CP2102 serial bridge.

### Limitations

The covert HID identity is fully defined by the operator, so the cable has no fixed VID/PID to match on and signature detection by USB identifier is unreliable. The widely cited identifier 10C4:EA60 belongs to the O.MG Programmer board (a CP2102 serial bridge used for flashing), not to the cable while it is attacking a host.

### Device Instance Path

```text
unknown (operator-defined; the covert HID identity is set in firmware)
USB\VID_10C4&PID_EA60   (O.MG Programmer board, CP2102, flashing only)
```

### VendorID

```text
operator-defined (no fixed default)
10C4   (Silicon Labs, O.MG Programmer only)
```

### ProductID

```text
operator-defined (no fixed default)
EA60   (CP2102 on the O.MG Programmer only)
```

### Class

```text
HID (keyboard). Programmer board: CDC Serial.
```

### Author

```text
@enesilhaydin
```

### Sigma Rules

Because the O.MG Cable lets the operator choose any VID and PID for its covert HID interface, there is no reliable signature to match while it is operating, so behavioral detection is needed: a new HID keyboard appearing on insert, scripted keystroke timing, or an unexpected Wi-Fi access point near the host. The appearance of the O.MG Programmer board (Silicon Labs CP2102, `VID_10C4&PID_EA60`) can indicate that an O.MG device is being flashed, but that controller is used by many legitimate devices, so it is a weak indicator on its own.

### Links

1- https://o.mg.lol/
2- https://www.pwndefend.com/2021/10/18/hid-attacks-using-omg-cables/
