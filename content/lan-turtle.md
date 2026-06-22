---
title: "LAN Turtle"
date: 2026-06-22
tags: ["hak5", "lan", "turtle", "implant", "ethernet"]
description: The LAN Turtle, made by Hak5, is a covert systems administration and penetration testing implant housed in a generic USB-to-Ethernet adapter casing. It is built around a Realtek RTL8152 USB Ethernet controller and enumerates on the host with the vendor and product ID 0BDA:8152. Once connected it provides remote network access, man-in-the-middle, and surveillance capabilities while appearing to be an ordinary USB network adapter.
---

<!-- TODO: owner adds a photo at static/images/lan-turtle.jpg then an `image: /images/lan-turtle.jpg` line to the front matter -->

## Description

The LAN Turtle is a network implant disguised as a common USB Ethernet adapter. It is built on a Realtek RTL8152 USB-to-Ethernet controller and enumerates as 0BDA:8152, the standard identifier for that Realtek chip. After it is plugged into a host it can establish remote access and run network attack and reconnaissance payloads while blending in with legitimate USB Ethernet hardware. Because it uses a stock Realtek controller, its USB identifier is shared with genuine RTL8152 adapters.

### Limitations

The 0BDA:8152 identifier belongs to the generic Realtek RTL8152 USB Ethernet controller and is shared by many legitimate USB Ethernet adapters, so it cannot by itself distinguish a LAN Turtle from an ordinary adapter. The identifier can also be spoofed.

### Device Instance Path

```text
USB\VID_0BDA&PID_8152   (Realtek RTL8152 USB-to-Ethernet)
```

### VendorID

```text
0BDA   (Realtek Semiconductor)
```

### ProductID

```text
8152   (RTL8152 USB 10/100 Ethernet adapter)
```

### Class

```text
RNDIS Ethernet
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: LAN Turtle USB Device Connected
id: 5e735d00-dfd3-4a6a-86ee-66712834839e
status: experimental
description: Detects a LAN Turtle by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/lan-turtle/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_0BDA&PID_8152'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate Realtek RTL8152 USB Ethernet adapters
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://docs.hak5.org/lan-turtle
2- https://github.com/mthcht/awesome-lists/blob/main/Lists/suspicious_usb_ids_list.csv
