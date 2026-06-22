---
title: "HackRF One"
date: 2026-06-22
image: /images/hackrf-one.jpg
tags: ["hackrf","great-scott-gadgets","sdr","rf","wireless"]
description: The HackRF One is an open source Software Defined Radio peripheral from Great Scott Gadgets capable of transmitting and receiving radio signals from 1 MHz to 6 GHz. It is a half duplex transceiver that lets security researchers capture, analyze, and replay a wide range of wireless protocols. It connects over Hi-Speed USB 2.0 and enumerates as a vendor specific SDR device rather than as a HID peripheral, so it is not a keystroke injector but a general purpose radio attack and research tool.
---

<p align="center">
  <img src="/images/hackrf-one.jpg" alt="HackRF One" width="50%" decoding="async">
</p>

## Description

The HackRF One from Great Scott Gadgets is a Software Defined Radio peripheral capable of transmission or reception of radio signals from 1 MHz to 6 GHz. It is a half duplex transceiver that handles up to 20 million samples per second and works with software such as GNU Radio and SDR#. In an offensive context it is used to capture, analyze, and transmit arbitrary wireless signals across a very broad frequency range. It connects as a USB peripheral and is identified by a fixed vendor specific USB identity.

### Limitations

The HackRF One reports a fixed USB identity, but the firmware is open source and can be reflashed, so the identity can be changed by the operator and a separate DFU mode exists for programming. Because it is an SDR and not a USB HID device, its attacks happen over the air and are not visible as USB keystroke events on a victim host. The USB identity below only indicates that the HackRF itself is connected to the operator machine.

### Device Instance Path

```text
USB\VID_1D50&PID_6089
```

### VendorID

```text
1D50
```
OpenMoko / community.

### ProductID

```text
6089
```

### Class

```text
Vendor-specific (SDR, not HID)
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: HackRF One USB Device Connected
id: ecad86cf-cb64-4bdf-95f3-ce007e2233e4
status: experimental
description: Detects a HackRF One by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/hackrf-one/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_1D50&PID_6089'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate SDR research and radio development use
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://greatscottgadgets.com/hackrf/one/
2- https://github.com/greatscottgadgets/hackrf
