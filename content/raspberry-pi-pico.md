---
title: "Raspberry Pi Pico"
date: 2026-06-22
image: /images/raspberry-pi-pico.jpg
tags: ["raspberry-pi","pico","rp2040","hid","pico-ducky"]
description: The Raspberry Pi Pico is a low cost microcontroller board built around the RP2040 chip from Raspberry Pi. It is widely repurposed as a keystroke injection tool through firmware such as pico-ducky, which turns the board into a USB HID keyboard that types out scripted payloads. Because the RP2040 can present several different USB identities depending on the firmware loaded, the Pico is a flexible platform for offensive USB work and a common false negative when detection only watches for the Raspberry Pi vendor ID.
---

<p align="center">
  <img src="/images/raspberry-pi-pico.jpg" alt="Raspberry Pi Pico" width="50%" decoding="async">
</p>

## Description

The Raspberry Pi Pico is an RP2040 based development board that is frequently used as a DIY keystroke injection device. When running the pico-ducky firmware it enumerates as a USB HID keyboard and replays DuckyScript payloads against a target host. The board exposes several distinct USB identities: the built in BOOTSEL mass storage mode, a MicroPython build, and the official CircuitPython build, each with its own product ID under the Raspberry Pi vendor ID 2E8A.

### Limitations

The USB identity depends entirely on the firmware that is loaded, so the IDs below are indicators rather than guarantees and can be changed by the operator. A particularly important caveat is that pico-ducky on a stock Pico is built on Adafruit CircuitPython and therefore enumerates as Adafruit 239A:80F4, not under the Raspberry Pi vendor ID. Detection that only watches for VID 2E8A will miss a pico-ducky running this build. The 2E8A:0003 BOOTSEL identity is a bootloader and programming mode ID, so seeing it means a flashable board was just mounted on the host, which is itself a useful indicator.

### Device Instance Path

BOOTSEL (RP2040 mass storage):
```text
USB\VID_2E8A&PID_0003
```
MicroPython:
```text
USB\VID_2E8A&PID_0005
```
Official CircuitPython:
```text
USB\VID_2E8A&PID_000B
```
pico-ducky on a stock Pico (Adafruit CircuitPython build):
```text
USB\VID_239A&PID_80F4
```

### VendorID

```text
2E8A
```
Raspberry Pi. Note the alternate vendor for pico-ducky:
```text
239A
```
Adafruit (pico-ducky CircuitPython build).

### ProductID

BOOTSEL:
```text
0003
```
MicroPython:
```text
0005
```
CircuitPython:
```text
000B
```
pico-ducky on stock Pico:
```text
80F4
```

### Class

```text
HID / Composite / Mass storage (BOOTSEL)
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Raspberry Pi Pico USB Device Connected
id: bd45d4be-8edc-452d-8645-5c73e01af00e
status: experimental
description: Detects a Raspberry Pi Pico by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/raspberry-pi-pico/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains:
            - 'VID_2E8A&PID_0003'
            - 'VID_2E8A&PID_0005'
            - 'VID_2E8A&PID_000B'
            - 'VID_239A&PID_80F4'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Legitimate Raspberry Pi Pico or Adafruit development boards
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links
1- https://github.com/raspberrypi/usb-pid
2- https://github.com/dbisu/pico-ducky
