---
title: "Bash Bunny"
date: 2026-06-22
image: /images/bash-bunny.jpg
tags: ["hak5", "bash", "bunny", "usb", "composite"]
description: The Bash Bunny, made by Hak5, is a multi-function USB attack platform built around an embedded Linux system on a quad-core ARM SoC. It presents itself to a target host as a Linux USB gadget and can switch between attack modes that expose different USB device classes, including HID keyboard injection, mass storage, serial console, and the RNDIS and ECM Ethernet gadgets used for network-based attacks. Its default gadget vendor ID is F000, with per-mode product IDs assigned by its firmware for each attack mode and composite combination.
---

<p align="center">
  <img src="/images/bash-bunny.jpg" alt="Bash Bunny" width="50%" decoding="async">
</p>

## Description

The Bash Bunny is a Linux-based USB implant that runs payloads to compromise a host as soon as it is plugged in. Because it is a full Linux gadget device, it can emulate several USB classes and switch between them through its ATTACKMODE configuration. The default Linux gadget vendor ID is F000, and the firmware assigns a distinct product ID per mode and per composite combination of modes. The most common modes are HID, mass storage, serial, RNDIS Ethernet, and ECM Ethernet.

### Limitations

The vendor and product IDs are assigned by the on-device Linux gadget firmware and can be changed or spoofed by the operator, so they are indicators rather than guarantees. The exact product ID seen on the host depends on which attack mode or composite combination of modes is active.

### Device Instance Path

```text
USB\VID_F000&PID_FF01   (HID)
USB\VID_F000&PID_FF10   (STORAGE)
USB\VID_F000&PID_FF11   (SERIAL)
USB\VID_F000&PID_FF12   (RNDIS)
USB\VID_F000&PID_FF13   (ECM)
USB\VID_F000&PID_FF02   (composite, range FF02-FF21)
```

### VendorID

```text
F000   (Linux Foundation / generic Linux gadget)
```

### ProductID

```text
FF01   (HID)
FF10   (STORAGE)
FF11   (SERIAL)
FF12   (RNDIS)
FF13   (ECM)
FF02-FF21   (composite combinations)
```

### Class

```text
Composite (HID / Mass Storage / CDC Serial / RNDIS Ethernet / CDC ECM depending on mode)
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Bash Bunny USB Device Connected
id: a93cd332-5b2d-4f7d-b2db-581d8442731b
status: experimental
description: Detects a Bash Bunny by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/bash-bunny/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains:
            - 'VID_F000&PID_FF01'
            - 'VID_F000&PID_FF10'
            - 'VID_F000&PID_FF11'
            - 'VID_F000&PID_FF12'
            - 'VID_F000&PID_FF13'
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

1- https://docs.hak5.org/bash-bunny
2- https://github.com/hak5/bashbunny-wiki
