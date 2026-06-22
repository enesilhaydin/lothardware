---
title: "USB Nova"
date: 2023-09-27
image: /images/usb-nova.jpg
tags: ["nova", "spacehuhn"]
description: The USB Nova is an open-source BadUSB keystroke-injection tool from Spacehuhn Technologies, built on an RP2040, SAMD, or ESP32-class microcontroller. It masquerades as an ordinary USB device but acts as a Human Interface Device that types scripted payloads at machine speed, much like a Rubber Ducky. The firmware presents a composite HID and Mass Storage device, letting it inject keystrokes while also exposing storage. Its default USB identifiers are taken from the MCS Electronics shared pool, so they can be reassigned or spoofed in firmware.
---

<p align="center">
  <img src="/images/usb-nova.jpg" alt="USB Nova" width="50%" height="50%" decoding="async">
</p>

## Description

The USB Nova is an open-source BadUSB keystroke-injection tool from Spacehuhn Technologies, built on an RP2040, SAMD, or ESP32-class microcontroller. It masquerades as an ordinary USB device but acts as a Human Interface Device that types scripted payloads at machine speed, much like a Rubber Ducky. The firmware presents a composite HID and Mass Storage device, letting it inject keystrokes while also exposing storage. Its default USB identifiers are taken from the MCS Electronics shared pool, so they can be reassigned or spoofed in firmware.

### Limitations

The VendorID and ProductID below are the firmware defaults confirmed in the SpacehuhnTech/USBNova source. They are software-assigned and can be spoofed, so treat them as detection indicators rather than guarantees. The USB Nova always runs from its application firmware, so unlike bootloader-based boards there is no separate programming-mode identity to track; the IDs seen at runtime are the IDs listed here.

### Device Instance Path

```text
?\VID_16D0&PID_11A4
```

### VendorID

```text
16D0
```

### ProductID

```text
11A4
```
### Class

```text
Composite (HID / Mass Storage)
```
### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: USB Nova USB Device Connected
id: 460ce33f-6bc4-41fc-aa45-f4bde4bef264
status: experimental
description: Detects a USB Nova by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/usb-nova/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_16D0&PID_11A4'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://usbnova.com/ \
2- https://github.com/SpacehuhnTech/USBNova
