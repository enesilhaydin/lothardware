---
title: "Screen Crab"
date: 2026-06-22
tags: ["hak5", "screen", "crab", "hdmi", "implant"]
description: The Screen Crab, made by Hak5, is a covert HDMI man-in-the-middle implant that sits inline between a video source and a display and captures screenshots or video of what is shown. It is built on an embedded Linux system and, when connected to a host over USB for configuration, exposes an Android Debug Bridge gadget interface that enumerates with the vendor and product ID 18D1:4EE7. That identifier is the standard Google ADB gadget ID used by Android devices in debugging mode.
---

<!-- TODO: owner adds a photo at static/images/screen-crab.jpg then an `image: /images/screen-crab.jpg` line to the front matter -->

## Description

The Screen Crab is a video man-in-the-middle implant placed inline on an HDMI cable to capture screenshots and video from the target display. It runs an embedded Linux system, and when attached to a host over USB it presents an Android Debug Bridge gadget that enumerates as 18D1:4EE7. That VID/PID is the generic Google ADB interface identifier, the same one exposed by Android devices in debug mode, so it is not unique to the Screen Crab.

### Limitations

The 18D1:4EE7 identifier is the standard Google ADB gadget VID/PID and is shared with Android devices in debugging mode, so it is a weak indicator on its own. As an embedded Linux gadget, the identifier can also be changed or spoofed.

### Device Instance Path

```text
USB\VID_18D1&PID_4EE7   (ADB gadget interface)
```

### VendorID

```text
18D1   (Google)
```

### ProductID

```text
4EE7   (ADB gadget)
```

### Class

```text
Composite (ADB gadget)
```

### Author

```text
@enesilhaydin
```

### Sigma/Yara Rules

```yaml
title: Screen Crab USB Device Connected
id: 267792bb-cd97-4f53-b034-5ccea5b18cac
status: experimental
description: Detects a Screen Crab by its default USB VID/PID. These identifiers can be spoofed, so treat this as an indicator.
references:
    - https://lothardware.com.tr/screen-crab/
author: '@enesilhaydin'
date: 2026/06/22
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 6416
        DeviceId|contains: 'VID_18D1&PID_4EE7'
    condition: selection
falsepositives:
    - Unrelated hardware sharing the same controller VID/PID
    - Android devices connected in ADB debugging mode
level: medium
tags:
    - attack.initial_access
    - attack.t1200
```

Requires Windows Audit PNP Activity (Security Event 6416).

### Links

1- https://docs.hak5.org/screen-crab
2- https://github.com/mthcht/awesome-lists/blob/main/Lists/suspicious_usb_ids_list.csv
