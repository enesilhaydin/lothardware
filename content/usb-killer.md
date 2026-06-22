---
title: "USB Killer"
date: 2026-06-22
image: /images/usb-killer.jpg
tags: ["usb-killer","hardware","electrical","destruction"]
description: The USB Killer is a malicious hardware device designed to physically destroy equipment through its USB port. It rapidly charges internal capacitors from the USB power line and then discharges a high voltage surge back into the host, damaging or destroying the data lines and other components. Unlike keystroke injection tools it is not a data attack device and does not enumerate over USB at all, presenting no descriptor and no vendor or product ID, so it cannot be detected through USB device events.
---

<p align="center">
  <img src="/images/usb-killer.jpg" alt="USB Killer" width="50%" decoding="async">
</p>

## Description

The USB Killer is an electrical destruction weapon shaped like a USB flash drive. When inserted, it draws power from the USB port to charge an internal bank of capacitors, then discharges a high voltage pulse back into the port. This cycle repeats rapidly and is intended to damage or destroy the host device's circuitry. It is purely a hardware attack tool and carries no payload, no firmware behavior, and no data component.

### Limitations

The USB Killer performs no USB communication. It does not present a USB descriptor and exposes no vendor or product ID, so the host never enumerates it as a device. As a result there is nothing for software based USB monitoring to observe, and the only meaningful defenses are physical, such as optically isolated ports, sacrificial adapters, and controlling physical access to ports.

### Device Instance Path

```text
none
```

### VendorID

```text
none (does not enumerate)
```

### ProductID

```text
none (does not enumerate)
```

### Class

```text
none (does not enumerate)
```

### Author

```text
@enesilhaydin
```

### Sigma Rules

This device does not enumerate over USB (no descriptor, no VID/PID), so it cannot be detected through USB device events. Detection is physical/electrical only.

### Links
1- https://usbkill.com/
2- https://en.wikipedia.org/wiki/USB_Killer
