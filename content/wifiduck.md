---
title: "WiFi Duck"
date: 2026-06-22
image: /images/wifiduck.jpg
tags: ["wifiduck","spacehuhn","dstike","hid","atmega32u4","esp8266"]
description: The WiFi Duck, developed by Spacehuhn and sold in hardware form as the DSTIKE WiFi Duck, is a keystroke injection platform that pairs an ATmega32U4 for USB HID with an ESP8266 for a Wi-Fi management interface. By default it enumerates with the SparkFun Pro Micro sketch identifier 1B4F:9206. The ESP8266 hosts a web interface that lets an operator write and launch DuckyScript style payloads over Wi-Fi without physical access to the target after deployment.
---

<p align="center">
  <img src="/images/wifiduck.jpg" alt="WiFi Duck" width="50%" decoding="async">
</p>

## Description

The WiFi Duck is an open source keystroke injection project by Spacehuhn that combines an ATmega32U4 microcontroller for USB Human Interface Device emulation with an ESP8266 for wireless control. The ATmega32U4 handles typing scripted payloads into the host, while the ESP8266 exposes a web based interface for editing and running payloads over Wi-Fi. The most common hardware implementation is the DSTIKE WiFi Duck. By default the USB side enumerates using the SparkFun Pro Micro sketch identifier 1B4F:9206.

### Limitations

The default USB VendorID and ProductID 1B4F:9206 are shared with the SparkFun Pro Micro development board and any other ATmega32U4 sketch using that profile, and they can be changed by reflashing the firmware. The IDs are therefore an indicator and not a reliable unique fingerprint.

### Device Instance Path

```text
USB\VID_1B4F&PID_9206  (SparkFun Pro Micro sketch profile, default)
```

### VendorID

```text
1B4F (SparkFun)
```

### ProductID

```text
9206 (Pro Micro sketch profile)
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
title: WiFi Duck USB Device Connected
id: c7708df0-448a-42f3-96f6-4a91c34861ce
status: experimental
description: Detects a WiFi Duck by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/wifiduck/
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

1- https://github.com/SpacehuhnTech/WiFiDuck
2- https://dstike.com/
