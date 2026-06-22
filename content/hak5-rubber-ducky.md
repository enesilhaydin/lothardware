---
title: "Hak5 Rubber Ducky"
date: 2023-11-15
image: /images/rubber-ducky.jpg
tags: ["hak5","rubber","ducky","hid"]
description: The Rubber Ducky, crafted by Hak5, is a discreet and highly sophisticated keystroke injection tool. Designed for advanced penetration testers and security professionals, this pocket-sized device masquerades as a standard USB flash drive but operates with an entirely different purpose. Leveraging advanced scripting capabilities and preloaded payloads, the Rubber Ducky can execute complex and covert attacks on target systems with lightning speed. Its ability to inject keystrokes, mimic human typing patterns, and execute payloads in milliseconds makes it an invaluable asset for security assessments, uncovering vulnerabilities, and strengthening digital defenses. The Rubber Ducky is a must-have tool for professionals seeking to assess and fortify the security of computer systems with precision and efficiency.

---

<p align="center">
  <img src="/images/rubber-ducky.jpg" alt="Hak5 Rubber Ducky" width="50%" height="50%" decoding="async">
</p>

### Limitations

Take into consideration that VendorID and ProductID can be spoofed natively by the Rubber Ducky.\
The following IDs are the default ones. 

### Device Instance Path

Using `ATTACKMODE HID`:
```text
HID\VID_03EB&PID_2401&REV_0100
```
Using `ATTACKMODE HID STORAGE`:
```text
HID\VID_03EB&PID_2422&REV_0100
```

### VendorID

```text
03EB
```
Atmel Corp.

### ProductID

Using `ATTACKMODE HID`:
```text
2401
```
Using `ATTACKMODE HID STORAGE`:
```text
2422
```
Alternate firmware:
```text
2403
```
DFU bootloader:
```text
2FF6
```
Note: the 2022 USB-C Rubber Ducky model uses a closed firmware with no public teardown, so its chipset and default ID are unknown.

### Class

```text
HID (or HID + Mass Storage)
```
### Author

```text
@enesilhaydin
@_ezlucky_
```

### Sigma Rules

```yaml
title: Hak5 Rubber Ducky USB Device Connected
id: 3ee76c5b-08e1-466a-be7b-d1e94ffcb617
status: experimental
description: Detects a Hak5 Rubber Ducky by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/hak5-rubber-ducky/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_03EB&PID_2401'
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

- https://shop.hak5.org/products/usb-rubber-ducky
- https://docs.hak5.org/hak5-usb-rubber-ducky/attack-modes-constants-and-variables/attack-modes#vid-and-pid-overview
