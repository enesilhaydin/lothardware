---
title: "Cactus WHID"
date: 2023-09-25
image: /images/cactus.jpg
tags: ["cactus", "whid","hid"]
description: The Cactus WHID, developed by the open-source community and available on GitHub, is a covert and advanced keystroke injection device. Designed to cater to the needs of penetration testers and cybersecurity experts, this compact device discreetly disguises itself as a regular USB peripheral while harboring a completely different set of capabilities. Harnessing powerful scripting features and preloaded payloads, the Cactus WHID can swiftly execute intricate and covert operations on target systems. Its ability to inject keystrokes, replicate human typing patterns, and execute payloads within milliseconds renders it an indispensable asset for security assessments, vulnerability detection, and fortifying digital defenses. The Cactus WHID is an essential tool for professionals aiming to evaluate and enhance the security of computer systems with precision and efficiency.
---

<p align="center">
  <img src="/images/cactus.jpg" alt="Cactus WHID" width="50%" height="50%" decoding="async">
</p>

### Device Instance Path

```text
HID\VID_1B4F&PID_9207
```
`1B4F:9207` is the Arduino LilyPadUSB profile, the caterina-LilyPadUSB bootloader that the WHID's ATmega32U4 runs; `1B4F:9208` is that bootloader's own ID.

### VendorID

```text
1B4F
```
SparkFun Electronics block.

### ProductID

Runtime (LilyPadUSB profile):
```text
9207
```
Bootloader:
```text
9208
```

### Class

```text
HID
```
Note: the WHID's onboard WiFi firmware lets the operator spoof another vendor's VID/PID, often a Logitech device, so the IDs above are indicators rather than guarantees.

### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Cactus WHID USB Device Connected
id: a18483fe-c1f4-4c1c-8d01-ec6968787b4e
status: experimental
description: Detects a Cactus WHID by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/cactus-whid/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_1B4F&PID_9207'
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

https://github.com/whid-injector/WHID
