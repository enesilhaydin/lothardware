---
title: "Shark Jack"
date: 2026-06-22
image: /images/shark-jack.jpg
tags: ["hak5", "shark", "jack", "network", "serial"]
description: The Shark Jack, made by Hak5, is a portable network attack and reconnaissance tool, not a keystroke injection device. It runs payloads against a wired network the moment it is connected to an Ethernet port. For configuration and payload management it exposes a serial console over a Silicon Labs CP2102 USB-to-UART bridge, which enumerates with the vendor and product ID 10C4:EA60. The CP2102 is a generic USB serial controller, so that identifier is shared with many unrelated devices.
---

<p align="center">
  <img src="/images/shark-jack.jpg" alt="Shark Jack" width="50%" decoding="async">
</p>

## Description

The Shark Jack is a network tool that automates scanning and attack payloads against a wired LAN. It is not a HID device and does not inject keystrokes. Its USB interface is a serial console used for setup and payload management, provided by a Silicon Labs CP2102 USB-to-UART bridge that enumerates as 10C4:EA60. Because the CP2102 is a common off-the-shelf serial chip, this VID/PID appears on a wide range of unrelated hardware and is not unique to the Shark Jack.

### Limitations

The 10C4:EA60 identifier belongs to the generic Silicon Labs CP2102 USB-to-UART bridge and is shared by many unrelated serial devices, so it is a weak indicator on its own. The vendor and product ID can also be reprogrammed in the CP2102 EEPROM.

### Device Instance Path

```text
USB\VID_10C4&PID_EA60   (serial console, CP2102 USB-to-UART bridge)
```

### VendorID

```text
10C4   (Silicon Labs)
```

### ProductID

```text
EA60   (CP210x UART bridge, serial console)
```

### Class

```text
CDC Serial
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Shark Jack USB Device Connected
id: 4c3dab8a-1d77-4a1e-9096-602490137475
status: experimental
description: Detects a Shark Jack by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/shark-jack/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_10C4&PID_EA60'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Any device using a Silicon Labs CP2102 USB-to-UART bridge
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://docs.hak5.org/shark-jack
2- https://shop.hak5.org/products/shark-jack
