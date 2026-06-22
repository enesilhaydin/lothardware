---
title: "Sandisk Ultra 16GB"
date: 2023-09-27
image: /images/sandisk-ultra.jpg
tags: ["sandisk", "usb","PS2251-03"]
description: The SanDisk Ultra 16GB USB drive featuring the PS2251-03 chip is a notable inclusion due to its potential for bad USB exploitation. This particular chip, known for its versatility, can be repurposed to execute malicious activities. By leveraging its capabilities, it's possible to manipulate the device to behave in ways contrary to its intended use. This opens doors to various cybersecurity scenarios, making it a valuable addition for examining security vulnerabilities and reinforcing defenses. 
---

<p align="center">
  <img src="/images/sandisk-ultra.jpg" alt="Sandisk Ultra 16GB" width="50%" height="50%" decoding="async">
</p>

### Device Instance Path

```text
USB\VID_0781&PID_5581
```
This is a legitimate flash drive; the entry covers its abuse as a malicious-storage / BadUSB carrier when the controller is reprogrammed.

### VendorID

```text
0781
```
SanDisk Corp.

### ProductID

Ultra:
```text
5581
```
Related Ultra-family variants:
```text
5583  (Ultra Fit)
5590  (Ultra Dual)
5591  (Ultra Flair)
556C  (Ultra)
5580  (SDCZ80)
```

### Class

```text
Mass Storage
```
### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: SanDisk Ultra USB Device Connected
id: 7a6262c6-2998-4fa9-944f-563d00eeb860
status: experimental
description: Detects a SanDisk Ultra by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/sandisk-ultra/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_0781&PID_5581'
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

1- https://www.amazon.com.tr/SanDisk-SDCZ48-016G-U46-Flash-Bellek-16GB/dp/B00DQG9DDU \
2- https://www.mertsarica.com/bad-usb/
