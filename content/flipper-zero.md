---
title: "Flipper Zero"
date: 2023-09-27
image: /images/flipper-zero.jpg
tags: ["flipper", "usb"]
description: The Flipper Zero device, as documented in the insightful resource available at the provided link, is a multifunctional marvel of modern hardware hacking. It offers a diverse set of capabilities, allowing users to explore a wide range of security-related applications. By harnessing its potential, security professionals and enthusiasts can delve into tasks such as RFID and NFC analysis, remote control emulation, and much more. The Flipper Zero's flexibility makes it an indispensable tool for both offensive and defensive cybersecurity operations, empowering users to assess vulnerabilities and enhance digital protections effectively.
---

<p align="center">
  <img src="/images/flipper-zero.jpg" alt="Flipper Zero" width="50%" height="50%" decoding="async">
</p>

### Device Instance Path

VCP / serial:
```text
USB\VID_0483&PID_5740
```
DFU:
```text
USB\VID_0483&PID_DF11
```
Important: in BadUSB mode the Flipper Zero DEFAULTS to spoofing a Logitech keyboard, so `0483:5740` will NOT appear during a BadUSB attack. The spoofed identity is:
```text
USB\VID_046D&PID_C529
```

### VendorID

```text
0483
```
STMicroelectronics (reused; the Flipper uses an STM32, so this VID is not Flipper-specific).

### ProductID

VCP / serial:
```text
5740
```
DFU:
```text
DF11
```
BadUSB default (spoofed via Logitech VID 046D):
```text
C529
```

### Class

```text
CDC Serial / HID (BadUSB) / Composite
```
### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Flipper Zero USB Device Connected
id: e3162e1f-82c8-411c-9b8d-f4b835b94a75
status: experimental
description: Detects a Flipper Zero by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/flipper-zero/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_0483&PID_5740'
    selection_badusb:
        EventID: 6416
        DeviceId|contains: 'VID_046D&PID_C529'
    condition: selection or selection_badusb
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://flipperzero.one/ \
2- https://blog.grumpygoose.io/hunting-flipper-zero-db260274c45c
