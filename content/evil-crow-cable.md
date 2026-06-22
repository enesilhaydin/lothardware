---
title: "Evil Crow Cable"
date: 2026-06-22
image: /images/evil-crow-cable.jpg
tags: ["evil-crow","cable","hid","attiny85","digispark"]
description: The Evil Crow Cable, developed by Joel Serna Moreno, is an open source keystroke injection cable based on the ATtiny85 and Digispark lineage. In its micronucleus bootloader state it enumerates as 16D0:0753, and once a HID payload is flashed it re-enumerates as 16C0:27DB, the shared V-USB keyboard identifier. Two later variants exist. The Evil Crow Cable Wind uses an ESP32-S3 with a configurable USB identity on Espressif base 303A, and the Evil Crow Cable Pro uses a different controller whose chipset and IDs are not documented.
---

<p align="center">
  <img src="/images/evil-crow-cable.jpg" alt="Evil Crow Cable" width="50%" decoding="async">
</p>

## Description

The Evil Crow Cable is an open source offensive cable that hides an ATtiny85-based, Digispark-style microcontroller inside a USB cable to perform keystroke injection as a Human Interface Device. The original cable shares the micronucleus toolchain used by Digispark boards. The Evil Crow Cable Wind variant moves to an ESP32-S3 with a configurable USB identifier and wireless control, while the Evil Crow Cable Pro is a separate model whose chipset and USB IDs are not documented in a primary source. The project is published by Joel Serna Moreno.

### Limitations

The cable shows the micronucleus bootloader ID 16D0:0753 only while being programmed; during an actual injection it presents the runtime HID ID 16C0:27DB, which is shared by every micronucleus ATtiny85 board and is therefore indistinguishable from a Digispark or LilyPad ATtiny85 over USB. The Wind variant lets the operator set any VID/PID under Espressif base 303A, so its identity is not fixed.

### Device Instance Path

```text
USB\VID_16D0&PID_0753  (bootloader, micronucleus)
USB\VID_16C0&PID_27DB  (runtime, HID-flashed)
```

### VendorID

```text
16D0 (MCS Electronics, bootloader)
16C0 (Van Ooijen Technische Informatica, runtime)
```

### ProductID

```text
0753 (micronucleus bootloader)
27DB (V-USB shared keyboard, runtime)
```

### Class

```text
HID
```

### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Evil Crow Cable USB Device Connected
id: 0f4591c1-8ad7-4afd-969f-4b9691a93395
status: experimental
description: Detects an Evil Crow Cable by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/evil-crow-cable/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_16C0&PID_27DB'
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

1- https://github.com/joelsernamoreno/EvilCrow-Cable
2- https://github.com/joelsernamoreno/EvilCrow-Cable-Wind
