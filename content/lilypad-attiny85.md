---
title: "Lilypad Attiny85"
date: 2023-09-28
image: /images/lilypad.jpg
tags: ["lilypad", "attiny85","atmel"]
description: This LilyPad-style board is an ATtiny85 running the micronucleus bootloader, the same software platform as the Digispark. With no dedicated USB controller, it bit-bangs a low-speed connection through the V-USB software stack, which is enough to enumerate as a Human Interface Device and inject keystrokes once a HID payload is flashed. Because every micronucleus ATtiny85 board ships with the same default USB identifiers, this board is effectively indistinguishable from a Digispark, or any other micronucleus board, over USB alone. The identifiers are software-assigned and can be spoofed.
---

<p align="center">
  <img src="/images/lilypad.jpg" alt="Lilypad Attiny85" width="50%" height="50%" decoding="async">
</p>

## Description

This LilyPad-style board is an ATtiny85 running the micronucleus bootloader, the same software platform as the Digispark. With no dedicated USB controller, it bit-bangs a low-speed connection through the V-USB software stack, which is enough to enumerate as a Human Interface Device and inject keystrokes once a HID payload is flashed. Because every micronucleus ATtiny85 board ships with the same default USB identifiers, this board is effectively indistinguishable from a Digispark, or any other micronucleus board, over USB alone. The identifiers are software-assigned and can be spoofed.

### Limitations

The identifiers below are micronucleus and V-USB defaults and can be spoofed, so treat them as indicators. The shared `VID_16D0&PID_0753` is the micronucleus bootloader identity, and it is shared by design across all micronucleus ATtiny85 boards, which means this board cannot be told apart from a Digispark or any other micronucleus board purely from its USB ID. As with the Digispark, the bootloader ID is only seen during programming; the actual keystroke injection happens after a V-USB HID payload is flashed, when the board re-enumerates as the runtime `VID_16C0&PID_27DB` keyboard.

### Device Instance Path

micronucleus bootloader (programming mode, shared by all micronucleus boards):
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
title: LilyPad ATtiny85 USB Device Connected
id: 21ba266e-ad22-4031-99ea-e843431b0719
status: experimental
description: Detects a LilyPad ATtiny85 by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/lilypad-attiny85/
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
    - Indistinguishable from a Digispark or any other micronucleus ATtiny85 board
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://www.f1depo.com/Lilypad-Attiny85-Gelistirme-Karti,PR-2391.html \
2- https://github.com/micronucleus/micronucleus
