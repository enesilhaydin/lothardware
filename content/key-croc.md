---
title: "Key Croc"
date: 2026-06-22
tags: ["hak5", "key", "croc", "keylogger", "hid"]
description: The Key Croc, made by Hak5, is a keylogger and keystroke injection implant built on an embedded Linux system that sits inline between a USB keyboard and the host. It logs keystrokes and can trigger payloads that inject its own keystrokes as a HID keyboard. By default it presents the gadget vendor and product ID F000:FF01, but it can clone the vendor and product ID of the keyboard plugged into it so that it blends in with the legitimate device on the target.
---

<!-- TODO: owner adds a photo at static/images/key-croc.jpg then an `image: /images/key-croc.jpg` line to the front matter -->

## Description

The Key Croc is a Linux-based inline keylogger that captures keystrokes from an attached USB keyboard and passes them through to the host. When armed it can act as a HID keyboard itself and inject scripted keystrokes. Its distinguishing detection feature is that by default it clones the vendor and product ID of the keyboard connected to it, so the IDs seen on the host usually belong to the victim keyboard rather than to the Key Croc. When not cloning, it presents the Hak5 Linux gadget ID F000:FF01.

### Limitations

Because the Key Croc clones the attached keyboard's vendor and product ID by default, its USB identifiers are not fixed and cannot be relied upon, and the non-cloning default F000:FF01 can also be spoofed. Detection by VID/PID alone is therefore weak and behavioural signals are more reliable.

### Device Instance Path

```text
USB\VID_F000&PID_FF01   (default, non-cloning mode)
unknown (firmware-spoofable; clones the attached keyboard's VID/PID by default)
```

### VendorID

```text
F000   (Linux Foundation / generic Linux gadget, default non-cloning mode)
```

### ProductID

```text
FF01   (default, non-cloning mode)
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
title: Key Croc USB Device Connected
id: b83679b9-8538-4e0d-beb7-ad007456f184
status: experimental
description: Detects a Key Croc by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/key-croc/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_F000&PID_FF01'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Key Croc cloning the attached keyboard's VID/PID, which evades this rule
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://docs.hak5.org/key-croc
2- https://shop.hak5.org/products/key-croc
