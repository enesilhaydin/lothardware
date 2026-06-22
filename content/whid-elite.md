---
title: "WHID Elite"
date: 2026-06-22
image: /images/whid-elite.jpg
tags: ["whid","elite","hid","atmega32u4","gsm","wireless"]
description: The WHID Elite, from the whid-injector project, is a remote keystroke injection platform that combines an ATmega32U4 for USB HID with an ESP module and a GSM modem for long range command and control. It enumerates with the Arduino LilyPadUSB profile identifier 1B4F:9207, the same profile used by the Cactus WHID. The GSM channel allows an operator to trigger payloads over the cellular network rather than relying on local Wi-Fi proximity.
---

<p align="center">
  <img src="/images/whid-elite.jpg" alt="WHID Elite" width="50%" decoding="async">
</p>

## Description

The WHID Elite is a remote attack tool that pairs an ATmega32U4 microcontroller for USB Human Interface Device keystroke injection with an ESP module and a GSM modem for out of band control. The ATmega32U4 types scripted payloads into the host, while the GSM modem lets the operator send commands over the cellular network for long range operation. It uses the Arduino LilyPadUSB bootloader profile, so it enumerates as 1B4F:9207, the same identifier as the Cactus WHID. The project is published under the whid-injector repository.

### Limitations

The USB VendorID and ProductID 1B4F:9207 come from the Arduino LilyPadUSB board profile and are shared with the Cactus WHID and any other board using that profile, so the pair identifies the profile rather than the specific device. The firmware can be rebuilt with a different identity, which means the IDs are an indicator and not a guarantee.

### Device Instance Path

```text
USB\VID_1B4F&PID_9207  (Arduino LilyPadUSB profile)
```

### VendorID

```text
1B4F (SparkFun)
```

### ProductID

```text
9207 (Arduino LilyPadUSB profile)
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
title: WHID Elite USB Device Connected
id: 9537759b-512a-4458-b4c5-39f8ee844e95
status: experimental
description: Detects a WHID Elite by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/whid-elite/
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

1- https://github.com/whid-injector/WHID
2- https://github.com/whid-injector
