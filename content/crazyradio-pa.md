---
title: "Crazyradio PA"
date: 2026-06-22
tags: ["crazyradio","bitcraze","nrf24","mousejack","rf"]
description: The Crazyradio PA is a long range 2.4GHz USB radio dongle from Bitcraze built around the Nordic Semiconductor nRF24LU1+ chip with a power amplifier. Although it ships as the radio link for the Crazyflie drone platform, it is the primary tool used by the MouseJack and JackIt projects to discover and inject keystrokes into vulnerable wireless mice and keyboards. It enumerates over USB as a vendor specific device using a libusb driver rather than as a HID peripheral.
---

<!-- TODO: owner adds a photo at static/images/crazyradio-pa.jpg then an `image: /images/crazyradio-pa.jpg` line to the front matter -->

## Description

The Crazyradio PA is a USB radio dongle based on the nRF24LU1+ from Nordic Semiconductor, featuring a 20 dBm power amplifier and a low noise amplifier for extended range. In an offensive context it is the reference hardware for Bastille's MouseJack research and the JackIt framework, which use the nRF24 radio to find and exploit unencrypted 2.4GHz wireless input devices and inject keystrokes into the targeted receiver. The dongle communicates over USB as a vendor specific device controlled through libusb.

### Limitations

The Crazyradio PA reports a fixed Bitcraze vendor and product ID, but the firmware is open source and can be reflashed, so the identity can be changed by the operator. It is a radio injector, so the actual attack happens over the air against a separate wireless receiver and is not visible as a USB HID event on the victim host. The USB identity below only indicates that the dongle itself is present on the operator machine.

### Device Instance Path

```text
USB\VID_1915&PID_7777
```

### VendorID

```text
1915
```
Nordic Semiconductor (Bitcraze).

### ProductID

```text
7777
```

### Class

```text
Vendor-specific (libusb)
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Crazyradio PA USB Device Connected
id: 3395db4f-10a5-4efc-86df-4b262d52af41
status: experimental
description: Detects a Crazyradio PA by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/crazyradio-pa/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_1915&PID_7777'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate Bitcraze Crazyradio or Crazyflie development use
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://www.bitcraze.io/products/crazyradio-pa/
2- https://github.com/insecurityofthings/jackit
