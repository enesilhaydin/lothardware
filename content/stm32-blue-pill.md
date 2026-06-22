---
title: "STM32 Blue Pill"
date: 2026-06-22
tags: ["stm32","blue-pill","stm32f103","hid","cdc"]
description: The STM32 Blue Pill is an inexpensive development board based on the STMicroelectronics STM32F103 microcontroller. It is commonly used as a DIY USB attack platform because the chip can act as a native USB HID device, allowing operators to flash keystroke injection sketches that present the board as a keyboard. The Blue Pill enumerates with several different USB identities depending on whether it is running a Maple bootloader, an STM32 HID bootloader, the native ST DFU bootloader, or user defined application firmware.
---

<!-- TODO: owner adds a photo at static/images/stm32-blue-pill.jpg then an `image: /images/stm32-blue-pill.jpg` line to the front matter -->

## Description

The STM32 Blue Pill is a low cost STM32F103 board that is widely repurposed for offensive USB work. Because the STM32F103 has a native USB peripheral, it can be programmed to enumerate as a HID keyboard or as a composite CDC and HID device for keystroke injection. The board is typically programmed through one of several bootloaders, each of which presents its own USB vendor and product ID, while the running attack firmware uses a product ID chosen by the operator in the sketch.

### Limitations

The application USB identity is user defined, so any HID product ID seen during an actual attack is whatever the operator compiled into the sketch and cannot be relied upon. The IDs listed below are mostly bootloader and programming mode identities. Their appearance means a flashable board was just programmed or DFU flashed on the host, which is itself a useful indicator, but the runtime attack identity will differ. All of these values can be spoofed.

### Device Instance Path

Maple serial (Leaflabs Maple):
```text
USB\VID_1EAF&PID_0004
```
Maple DFU bootloader:
```text
USB\VID_1EAF&PID_0003
```
STM32 HID bootloader:
```text
USB\VID_1209&PID_BEBA
```
Native ST DFU bootloader:
```text
USB\VID_0483&PID_DF11
```
HID application sketch:
```text
USB\VID_xxxx&PID_yyyy
```
(user-defined, set in the sketch)

### VendorID

```text
1EAF
```
LeafLabs (Maple). Also:
```text
1209
```
pid.codes community (STM32 HID bootloader), and:
```text
0483
```
STMicroelectronics (native ST DFU).

### ProductID

Maple serial:
```text
0004
```
Maple DFU:
```text
0003
```
STM32 HID bootloader:
```text
BEBA
```
Native ST DFU:
```text
DF11
```
HID sketch:
```text
yyyy
```
(user-defined)

### Class

```text
HID / CDC
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: STM32 Blue Pill USB Device Connected
id: 8bfa5f26-9487-4510-87e7-895381449d69
status: experimental
description: Detects an STM32 Blue Pill by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/stm32-blue-pill/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains:
            - 'VID_1EAF&PID_0004'
            - 'VID_1EAF&PID_0003'
            - 'VID_1209&PID_BEBA'
            - 'VID_0483&PID_DF11'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate STM32 development or DFU firmware update activity
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://github.com/rogerclarkmelbourne/Arduino_STM32
2- https://github.com/Serasidis/STM32_HID_Bootloader
