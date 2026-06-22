---
title: "MalDuino"
date: 2026-06-22
image: /images/malduino.jpg
tags: ["malduino","maltronics","hid","atmega32u4","keystroke-injection"]
description: The MalDuino, made by Maltronics, is a keystroke injection device built on the ATmega32U4 microcontroller. Depending on the board profile it compiles against, it enumerates with the SparkFun Pro Micro sketch identifier 1B4F:9206 or the Arduino Leonardo identifier 2341:8036. It presents to the host as a Human Interface Device and types preprogrammed payloads. A wireless variant called MalDuino W adds Wi-Fi control on top of the same injection capability.
---

<p align="center">
  <img src="/images/malduino.jpg" alt="MalDuino" width="50%" decoding="async">
</p>

## Description

The MalDuino is a USB keystroke injection tool from Maltronics based on the ATmega32U4 chip used by Arduino Leonardo and SparkFun Pro Micro class boards. It acts as a Human Interface Device and injects scripted keystrokes into a host computer at high speed. Because it is programmed through the Arduino toolchain, the USB identity it presents follows the board profile selected at compile time. The MalDuino W variant adds a Wi-Fi interface for remote triggering and payload management.

### Limitations

The reported USB VendorID and ProductID depend on the board profile the firmware is compiled against, so the device may appear as 1B4F:9206 (SparkFun Pro Micro sketch) or 2341:8036 (Arduino Leonardo). These IDs are shared with legitimate development boards and can be changed by reflashing, so they are indicators rather than guarantees.

### Device Instance Path

```text
USB\VID_1B4F&PID_9206  (SparkFun Pro Micro sketch profile)
USB\VID_2341&PID_8036  (Arduino Leonardo profile)
```

### VendorID

```text
1B4F (SparkFun)
2341 (Arduino)
```

### ProductID

```text
9206 (Pro Micro sketch profile)
8036 (Leonardo profile)
```

### Class

```text
HID
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: MalDuino USB Device Connected
id: 3750c6e6-a4a4-427e-b33c-bdbbdf27345e
status: experimental
description: Detects a MalDuino by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/malduino/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_1B4F&PID_9206'
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

1- https://maltronics.com/products/malduino
2- https://github.com/SpacehuhnTech
