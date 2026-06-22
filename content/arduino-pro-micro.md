---
title: "Arduino Pro Micro"
date: 2023-09-28
image: /images/arduino-pro-micro.jpg
tags: ["arduino", "32u4"]
description: This page covers the ATmega32U4 board family commonly used for BadUSB keystroke injection. The naming here is a frequent source of confusion. The identifier `2341:8037` recorded for "Pro Micro" is actually the Arduino Micro (a CDC ACM board made by Arduino), while the Arduino Leonardo is `2341:8036`. The genuine "Pro Micro" is a SparkFun product with its own identifiers, `1B4F:9205` (bootloader) and `1B4F:9206` (5V sketch), plus `1B4F:9203`/`9204` for the 3.3V variant. Because the ATmega32U4 has native USB, any of these boards can enumerate as a Human Interface Device and type scripted payloads, and the firmware can spoof the VID/PID. dog hunter manufactured Arduinos use the `2A03:8036`/`8037` pool.
---

<p align="center">
  <img src="/images/arduino-pro-micro.jpg" alt="Arduino Pro Micro" width="50%" height="50%" decoding="async">
</p>

## Description

This page covers the ATmega32U4 board family commonly used for BadUSB keystroke injection. The naming here is a frequent source of confusion. The identifier `2341:8037` recorded for "Pro Micro" is actually the Arduino Micro (a CDC ACM board made by Arduino), while the Arduino Leonardo is `2341:8036`. The genuine "Pro Micro" is a SparkFun product with its own identifiers, `1B4F:9205` (bootloader) and `1B4F:9206` (5V sketch), plus `1B4F:9203`/`9204` for the 3.3V variant. Because the ATmega32U4 has native USB, any of these boards can enumerate as a Human Interface Device and type scripted payloads, and the firmware can spoof the VID/PID. dog hunter manufactured Arduinos use the `2A03:8036`/`8037` pool.

### Limitations

These identifiers are firmware and board-profile defaults, not fixed hardware values, so they can be spoofed and should be treated as indicators. There is also a bootloader-versus-runtime nuance: the SparkFun Pro Micro presents `1B4F:9205` while in its Caterina bootloader and `1B4F:9206` once the sketch is running, so the injection phase enumerates under the sketch PID. Just as importantly, the "Pro Micro" label is widely misapplied; the `2341:8037` value below belongs to the Arduino Micro, so a detection should account for the Arduino Micro/Leonardo IDs and the real SparkFun Pro Micro IDs together.

### Device Instance Path

Arduino Micro (the ID historically recorded here):
```text
USB\VID_2341&PID_8037
```

Arduino Leonardo:
```text
USB\VID_2341&PID_8036
```

SparkFun Pro Micro (5V, sketch running):
```text
USB\VID_1B4F&PID_9206
```

### VendorID

```text
2341
```
Arduino. Also `1B4F` (SparkFun) and `2A03` (dog hunter).

### ProductID

```text
8037
```
Arduino Micro. Also `8036` (Leonardo) and `9206` (SparkFun Pro Micro 5V sketch).

### Class

```text
HID / CDC
```
### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Arduino Pro Micro USB Device Connected
id: b6b2d8f1-80b9-4082-8699-8787b7b4ec10
status: experimental
description: Detects an Arduino Pro Micro by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/arduino-pro-micro/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection_arduino:
        EventID: 6416
        DeviceId|contains: 'VID_2341&PID_8037'
    selection_sparkfun:
        EventID: 6416
        DeviceId|contains: 'VID_1B4F&PID_9206'
    condition: selection_arduino or selection_sparkfun
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://www.robotistan.com/arduino-pro-micro-klon-5v-16-mhz \
2- https://nuriacar.com/cevizlab/2020/10/16/badusb.html
