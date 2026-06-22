---
title: "USBNinja"
date: 2026-06-22
image: /images/usbninja.jpg
tags: ["usbninja", "cable", "implant", "hid", "ble"]
description: USBNinja, from the RFID Research Group, is a USB cable and connector implant that behaves like a normal cable until it is triggered over Bluetooth Low Energy, at which point it emulates a USB HID keyboard or mouse and runs a preloaded payload. It is Arduino programmable, and the vendor and product IDs it presents are defined by the operator in its firmware, with no published factory default.
---

<p align="center">
  <img src="/images/usbninja.jpg" alt="USBNinja" width="50%" decoding="async">
</p>

## Description

USBNinja is a covert implant built into a USB cable that stays inert until a paired Bluetooth Low Energy remote or phone app triggers it. When triggered it enumerates as a USB HID device and types a preprogrammed payload. The firmware is Arduino based and the USB descriptor, including the vendor and product IDs, is set by the operator, so there is no fixed identifier.

### Limitations

The USB identity is operator-defined in the firmware, so the device has no reliable default VID/PID and cannot be matched by a fixed signature. The Bluetooth trigger means it can sit dormant and only act on command.

### Device Instance Path

```text
unknown (operator-defined in firmware)
```

### VendorID

```text
operator-defined (no published default)
```

### ProductID

```text
operator-defined (no published default)
```

### Class

```text
HID (keyboard / mouse)
```

### Author

```text
@enesilhaydin
```

### Sigma Rules

USBNinja sets its own USB vendor and product IDs in firmware, so there is no fixed signature to match, and detection relies on behavior rather than identifier: a new HID keyboard or mouse appearing on insert, scripted keystroke timing, or an unexpected Bluetooth Low Energy device paired near the host.

### Links

1- https://www.crowdsupply.com/rfid-research-group/usbninja
2- https://github.com/USBNinjaRRG/USBNinja
