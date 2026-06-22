---
title: "Logitech Unifying Receiver"
date: 2023-09-25
image: /images/unifying.png
tags: ["logitech", "unifying","c-u0007","usb"]
description: First and foremost, it's worth noting that this capability functions by exploiting the CVE-2019-13052 vulnerability. Many contemporary Logitech products incorporate the Unifying feature, which proves to be highly versatile. This functionality allows for up to six pairing processes to be carried out using a Unifying Receiver, which can be particularly useful in scenarios where the primary receiver is damaged or lost. In essence, the process revolves around leveraging this vulnerability. A Nordic nRF52840 RF IoT device is employed, and it's introduced to the Unifying receiver in a manner similar to connecting a regular mouse. This facilitates the establishment of AES Key Pairing between the two devices. The core of the operation involves transmitting HID commands to the computer, much like what occurs during standard mouse operations. However, in my approach, RF hardware is utilized to send a variety of distinct HID commands, effectively enabling the Logitech Unifying Receiver to perform the role of a Rubber Ducky.
---

<p align="center">
  <img src="/images/unifying.png" alt="Logitech Unifying Receiver" width="50%" height="50%" decoding="async">
</p>

### Device Instance Path

Unifying:
```text
USB\VID_046D&PID_C52B
```

Older Unifying:
```text
USB\VID_046D&PID_C532
```

### VendorID

```text
046D
```
Logitech.

### ProductID

Unifying receivers:
```text
C52B
C532
```
Nano receivers (also Unifying-class):
```text
C526
C52F
C531
C534
```
Logi Bolt (current generation):
```text
C548
```
Lightspeed (gaming) receiver, NOT Unifying:
```text
C539
```

Note: MouseJack (Bastille) keystroke-injection also affects non-Logitech dongles, including AmazonBasics `04F2:0976`, Dell `413C:2501`, Gigabyte `04B4:0060`, HP `03F0:D407`, Lenovo `17EF:6071`, and Microsoft `045E:0745`.

### Class

```text
HID
```
Wireless receiver. The attack relays HID reports through the receiver by exploiting CVE-2019-13052 (the Unifying AES key-pairing weakness), turning the receiver into a Rubber Ducky.

### Author

```text
@enesilhaydin
```

### Sigma Rules

```yaml
title: Logitech Unifying Receiver USB Device Connected
id: 1c9a654d-30f8-4443-ad47-754c8fc878e5
status: experimental
description: Detects a Logitech Unifying Receiver by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/logitech-unifying/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_046D&PID_C52B'
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

1- https://www.logitech.com/tr-tr/products/mice/unifying-receiver-usb.910-005236.html \
2- https://medium.com/@enesilhaydin/mini-mini-logitech-rubber-ducky-6016c72916eb \
3- https://www.bastille.net/research/vulnerabilities/mousejack/affected-devices
