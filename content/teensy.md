---
title: "Teensy"
date: 2023-09-27
image: /images/teensy.jpg
tags: ["teensy", "usb","halfkay"]
description: The Teensy is a family of compact USB development boards from PJRC, built around AVR, Kinetis, and i.MX RT microcontrollers. Although designed for legitimate embedded projects, its native USB stack lets it enumerate as a Human Interface Device, which makes it a long-standing platform for BadUSB keystroke-injection attacks. A Teensy ships with the HalfKay bootloader, and the firmware can be configured to present many different USB personalities (keyboard, mouse, joystick, serial, RawHID, and combinations of these), each with its own ProductID. Because the identifiers come from the firmware they are software-assigned and can be changed by the operator.
---

<p align="center">
  <img src="/images/teensy.jpg" alt="Teensy" width="50%" height="50%" decoding="async">
</p>

## Description

The Teensy is a family of compact USB development boards from PJRC, built around AVR, Kinetis, and i.MX RT microcontrollers. Although designed for legitimate embedded projects, its native USB stack lets it enumerate as a Human Interface Device, which makes it a long-standing platform for BadUSB keystroke-injection attacks. A Teensy ships with the HalfKay bootloader, and the firmware can be configured to present many different USB personalities (keyboard, mouse, joystick, serial, RawHID, and combinations of these), each with its own ProductID. Because the identifiers come from the firmware they are software-assigned and can be changed by the operator.

### Limitations

The identifiers below are firmware defaults from the PJRC cores and can be spoofed, so treat them as indicators rather than proof. There is an important bootloader-versus-runtime distinction here: `VID_16C0&PID_0478` is the HalfKay programming bootloader, not the identity seen during an actual attack. Its appearance means a Teensy was just programmed on the host, which is itself a useful indicator, but the runtime keystroke-injection device enumerates under a different PID, most commonly `VID_16C0&PID_0482` (Keyboard+Mouse+Joystick), `VID_16C0&PID_04D0` (keyboard-only), or `VID_16C0&PID_0486` (RawHID). Detection that only watches the `0478` bootloader will miss the injection phase entirely.

### Device Instance Path

USB Universal HalfKay (bootloader, programming mode):
```text
USB\VID_16C0&PID_0478
```

USB_HID Mode (runtime Keyboard+Mouse+Joystick):
```text
USB\VID_16C0&PID_0482
```

USB_KEYBOARDONLY Mode (runtime keyboard-only):
```text
USB\VID_16C0&PID_04D0
```

USB_RAWHID Mode (runtime RawHID):
```text
USB\VID_16C0&PID_0486
```

### VendorID

```text
16C0
```
Van Ooijen Technische Informatica (PJRC's shared pool).

### ProductID

```text
0478
```
HalfKay bootloader (programming mode).

```text
0482
```
Runtime HID (Keyboard+Mouse+Joystick).

### Class

```text
HID / Composite
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Teensy USB Device Connected
id: bc925534-9939-46e4-84d7-0423760c604c
status: experimental
description: Detects a Teensy by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/teensy/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection_bootloader:
        EventID: 6416
        DeviceId|contains: 'VID_16C0&PID_0478'
    selection_runtime:
        EventID: 6416
        DeviceId|contains: 'VID_16C0&PID_0482'
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

1- https://www.pjrc.com/teensy/ \
2- https://github.com/PaulStoffregen/cores/pull/582/commits/ea2a70eaed6b78782cd4d5d504cd0ecc79ab46f2
