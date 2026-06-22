---
title: "Digispark Attiny85"
date: 2023-09-28
image: /images/attiny85.jpg
tags: ["digispark", "atmel","attiny85"]
description: The Digispark is a tiny, low-cost development board from Digistump built around an ATmega ATtiny85 and the micronucleus bootloader. It has no dedicated USB controller and instead bit-bangs a low-speed connection using the V-USB software stack, which is enough to enumerate as a Human Interface Device and inject keystrokes, making it a popular cheap BadUSB platform. Out of the box it enumerates under the micronucleus bootloader identity, and only after a HID payload such as DigisparkKeyboard is flashed does it re-enumerate as a USB keyboard. The identifiers are software-assigned and shared across many boards.
---

<p align="center">
  <img src="/images/attiny85.jpg" alt="Digispark Attiny85" width="50%" height="50%" decoding="async">
</p>

## Description

The Digispark is a tiny, low-cost development board from Digistump built around an ATmega ATtiny85 and the micronucleus bootloader. It has no dedicated USB controller and instead bit-bangs a low-speed connection using the V-USB software stack, which is enough to enumerate as a Human Interface Device and inject keystrokes, making it a popular cheap BadUSB platform. Out of the box it enumerates under the micronucleus bootloader identity, and only after a HID payload such as DigisparkKeyboard is flashed does it re-enumerate as a USB keyboard. The identifiers are software-assigned and shared across many boards.

### Limitations

The identifiers below are V-USB defaults and can be spoofed, so treat them as indicators. The bootloader-versus-runtime distinction matters here: `VID_16D0&PID_0753` is the micronucleus bootloader (from the MCS Electronics pool), which is the identity seen while the board is being programmed. The actual keystroke injection happens only after a DigisparkKeyboard or other V-USB HID payload is flashed, at which point the board re-enumerates as `VID_16C0&PID_27DB`, the shared obdev V-USB "Keyboard" identity. That `16C0:27DB` runtime ID is the one observed during the attack, so detection that watches only the `0753` bootloader will miss the injection itself.

### Device Instance Path

micronucleus bootloader (programming mode):
```text
USB\VID_16D0&PID_0753
```

Runtime HID keyboard (after a V-USB payload is flashed):
```text
USB\VID_16C0&PID_27DB
```

### VendorID

```text
16D0
```
MCS Electronics (bootloader). Runtime uses `16C0` (obdev/V-USB shared pool).

### ProductID

```text
0753
```
micronucleus bootloader. Runtime HID keyboard is `27DB`.

### Class

```text
HID (low-speed V-USB)
```
### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Digispark ATtiny85 USB Device Connected
id: eb6e3803-79e9-45f6-b6c4-5241f1cf15a3
status: experimental
description: Detects a Digispark ATtiny85 by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/digispark-attiny85/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection_bootloader:
        EventID: 6416
        DeviceId|contains: 'VID_16D0&PID_0753'
    selection_runtime:
        EventID: 6416
        DeviceId|contains: 'VID_16C0&PID_27DB'
    condition: selection_bootloader or selection_runtime
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://www.f1depo.com/Lilypad-Attiny85-Gelistirme-Karti,PR-2391.html \
2- https://digistump.com/wiki/digispark
