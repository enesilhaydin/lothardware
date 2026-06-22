---
title: "GreatFET One"
date: 2026-06-22
image: /images/greatfet-one.jpg
tags: ["greatfet","great-scott-gadgets","lpc4330","usb","facedancer"]
description: The GreatFET One is an open source hardware hacking peripheral from Great Scott Gadgets built around the NXP LPC4330 microcontroller. It functions as a versatile interface board for interacting with electronic devices and can act as a USB device emulation backend for the FaceDancer framework, allowing it to present arbitrary USB devices to a target host. It enumerates over USB as a vendor specific device, with separate identities for its normal run mode and its DFU programming mode.
---

<p align="center">
  <img src="/images/greatfet-one.jpg" alt="GreatFET One" width="50%" decoding="async">
</p>

## Description

The GreatFET One is a hardware hacking and USB research multitool from Great Scott Gadgets, based on the NXP LPC4330. It provides a large number of general purpose IO pins and high speed interfaces for connecting to and analyzing other hardware. As a USB attack platform it serves as a backend for the FaceDancer framework, which uses GreatFET to implement or tamper with real USB devices in Python. It enumerates as a vendor specific device under the pid.codes community vendor ID.

### Limitations

The GreatFET One reports fixed run mode and DFU mode USB identities, but as a FaceDancer backend it can be driven to emulate other USB devices with arbitrary VID/PID values, so the device presented to a target may bear no relation to the IDs below. The firmware is open source and the identity can be changed by the operator. The 1FC9:000C DFU identity is the NXP boot ROM programming mode and indicates the board was just being flashed.

### Device Instance Path

Run mode:
```text
USB\VID_1D50&PID_60E6
```
DFU mode:
```text
USB\VID_1FC9&PID_000C
```

### VendorID

```text
1D50
```
OpenMoko / community (run mode). Also:
```text
1FC9
```
NXP Semiconductors (DFU mode).

### ProductID

Run mode:
```text
60E6
```
DFU mode:
```text
000C
```

### Class

```text
Vendor-specific
```

### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: GreatFET One USB Device Connected
id: 19b69805-f537-4b49-94e2-08a2b3d0128a
status: experimental
description: Detects a GreatFET One by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/greatfet-one/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains:
            - 'VID_1D50&PID_60E6'
            - 'VID_1FC9&PID_000C'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate hardware development or NXP LPC DFU flashing
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://greatscottgadgets.com/greatfet/
2- https://github.com/greatscottgadgets/greatfet
