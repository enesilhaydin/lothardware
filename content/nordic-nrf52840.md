---
title: "Nordic NRF52840"
date: 2023-09-25
image: /images/nordic.jpg
tags: ["nordic", "nrf52840", "usb","logitech"]
description: First and foremost, it's worth noting that this capability functions by exploiting the CVE-2019-13052 vulnerability. Many contemporary Logitech products incorporate the Unifying feature, which proves to be highly versatile. This functionality allows for up to six pairing processes to be carried out using a Unifying Receiver, which can be particularly useful in scenarios where the primary receiver is damaged or lost. In essence, the process revolves around leveraging this vulnerability. A Nordic nRF52840 RF IoT device is employed, and it's introduced to the Unifying receiver in a manner similar to connecting a regular mouse. This facilitates the establishment of AES Key Pairing between the two devices. The core of the operation involves transmitting HID commands to the computer, much like what occurs during standard mouse operations. However, in my approach, RF hardware is utilized to send a variety of distinct HID commands, effectively enabling the Logitech Unifying Receiver to perform the role of a Rubber Ducky.
---

<p align="center">
  <img src="/images/nordic.jpg" alt="Nordic NRF52840" width="50%" height="50%" decoding="async">
</p>

### Device Instance Path

Operational (HID injector):
```text
USB\VID_1915&PID_520C&MI_00\6&20A3E423
```
Open DFU bootloader (the common real-world enumeration when the dongle is flashed):
```text
USB\VID_1915&PID_521F
```

### VendorID

```text
1915
```
Nordic Semiconductor ASA.

### ProductID

Operational:
```text
520C
```
Open DFU bootloader:
```text
521F
```

### Class

```text
HID
```
The dongle acts as a wireless HID injector. Paired to a Logitech Unifying receiver via the CVE-2019-13052 flaw, it relays keystrokes so the receiver behaves like a Rubber Ducky.

### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Nordic nRF52840 Dongle USB Device Connected
id: 2a42d6d7-731b-4a15-97e8-09b421c2f84d
status: experimental
description: Detects a Nordic nRF52840 Dongle by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/nordic-nrf52840/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_1915&PID_520C'
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

1- https://www.amazon.com.tr/Nordic-nRF52840-Dongle-Bluetooth-Zigbee/dp/B07MCYTZ2S \
2- https://medium.com/@enesilhaydin/mini-mini-logitech-rubber-ducky-6016c72916eb \
3- https://github.com/NordicSemiconductor/pc-nrfutil
