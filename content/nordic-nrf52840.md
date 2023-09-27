---
title: "Nordic NRF52840"
date: 2023-09-25
tags: ["nordic", "nrf52840", "usb","logitech"]
description: First and foremost, it's worth noting that this capability functions by exploiting the CVE-2019-13052 vulnerability. Many contemporary Logitech products incorporate the Unifying feature, which proves to be highly versatile. This functionality allows for up to six pairing processes to be carried out using a Unifying Receiver, which can be particularly useful in scenarios where the primary receiver is damaged or lost. In essence, the process revolves around leveraging this vulnerability. A Nordic nRF52840 RF IoT device is employed, and it's introduced to the Unifying receiver in a manner similar to connecting a regular mouse. This facilitates the establishment of AES Key Pairing between the two devices. The core of the operation involves transmitting HID commands to the computer, much like what occurs during standard mouse operations. However, in my approach, RF hardware is utilized to send a variety of distinct HID commands, effectively enabling the Logitech Unifying Receiver to perform the role of a Rubber Ducky.
---

<p align="center">
  <img src="/images/nordic.jpg" alt="image" width="50%" height="50%">
</p>

### Device Instance Path

```text
USB\VID_1915&PID_520C&MI_00\6&20A3E423

```

### VendorID

```text
1915
```

### ProductID

```text
520C
```
### Class

```text
USB
```
### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

Coming Soon...

## Links

1- https://www.amazon.com.tr/Nordic-nRF52840-Dongle-Bluetooth-Zigbee/dp/B07MCYTZ2S \
2- https://medium.com/@enesilhaydin/mini-mini-logitech-rubber-ducky-6016c72916eb
