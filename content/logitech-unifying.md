---
title: "Logitech Unifying Receiver"
date: 2023-09-25
tags: ["logitech", "unifying","c-u0007","usb"]
---

<p align="center">
  <img src="/images/unifying.png" alt="image" width="50%" height="50%">
</p>

## Description

First and foremost, it's worth noting that this capability functions by exploiting the CVE-2019-13052 vulnerability. Many contemporary Logitech products incorporate the Unifying feature, which proves to be highly versatile. This functionality allows for up to six pairing processes to be carried out using a Unifying Receiver, which can be particularly useful in scenarios where the primary receiver is damaged or lost. In essence, the process revolves around leveraging this vulnerability. A Nordic nRF52840 RF IoT device is employed, and it's introduced to the Unifying receiver in a manner similar to connecting a regular mouse. This facilitates the establishment of AES Key Pairing between the two devices. The core of the operation involves transmitting HID commands to the computer, much like what occurs during standard mouse operations. However, in my approach, RF hardware is utilized to send a variety of distinct HID commands, effectively enabling the Logitech Unifying Receiver to perform the role of a Rubber Ducky.

### Device Instance Path

V2:
```text
USB\VID_046D&PID_C52B
```

V1:
```text
USB\VID_046D&PID_C539
```

### VendorID
V2:
```text
046D
```

V1:
```text
046D
```

### ProductID

V2:
```text
C52B
```

V1:
```text
C539
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

## Product Link

1- https://www.logitech.com/tr-tr/products/mice/unifying-receiver-usb.910-005236.html
2- https://medium.com/@enesilhaydin/mini-mini-logitech-rubber-ducky-6016c72916eb
