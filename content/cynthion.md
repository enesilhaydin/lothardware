---
title: "Cynthion"
date: 2026-06-22
image: /images/cynthion.jpg
tags: ["cynthion","great-scott-gadgets","usb","fpga","facedancer"]
description: The Cynthion is an FPGA based USB test, analysis, and attack platform from Great Scott Gadgets. Out of the box it acts as a High-Speed USB protocol analyzer, and combined with the LUNA gateware and the FaceDancer framework it becomes a tool for creating, emulating, and tampering with real USB devices, including man in the middle attacks between a host and a device. It enumerates over USB as a vendor specific device and is the modern hardware backend for FaceDancer.
---

<p align="center">
  <img src="/images/cynthion.jpg" alt="Cynthion" width="50%" decoding="async">
</p>

## Description

Cynthion is an all in one tool from Great Scott Gadgets for building, testing, monitoring, and experimenting with USB devices, built around an FPGA based architecture. Out of the box it works as a High-Speed USB protocol analyzer with the open source Packetry software. Combined with the LUNA gateware and the FaceDancer library it becomes a USB research and attack platform that can create or tamper with real USB devices rather than just emulating them. It is the modern FaceDancer backend and enumerates as a vendor specific device under the pid.codes community vendor ID.

### Limitations

The Cynthion reports fixed USB identities for its built in modes, but as a FaceDancer backend it can be driven to emulate other USB devices with arbitrary VID/PID values, so the device presented to a target may bear no relation to the IDs below. The FPGA gateware and firmware are open source and the identity can be changed by the operator. The two product IDs below correspond to its FaceDancer backend modes.

### Device Instance Path

FaceDancer backend:
```text
USB\VID_1D50&PID_615B
```
FaceDancer backend (alternate):
```text
USB\VID_1D50&PID_615C
```

### VendorID

```text
1D50
```
OpenMoko / community.

### ProductID

FaceDancer backend:
```text
615B
```
FaceDancer backend (alternate):
```text
615C
```

### Class

```text
Vendor-specific
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Cynthion USB Device Connected
id: e8f8e404-806c-4e97-9fd4-34564d80cdfb
status: experimental
description: Detects a Cynthion by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/cynthion/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains:
            - 'VID_1D50&PID_615B'
            - 'VID_1D50&PID_615C'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate USB protocol analysis and development use
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://greatscottgadgets.com/cynthion/
2- https://github.com/greatscottgadgets/facedancer
