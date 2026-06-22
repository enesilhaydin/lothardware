# LOTHardware

Living Off The Hardware (LOTHardware) is a reference catalog of malicious and
attack capable USB and HID devices, such as the Hak5 Rubber Ducky, Digispark,
Flipper Zero and the Logitech Unifying receiver. Each entry documents how the
device identifies itself to a host (USB vendor and product IDs, device instance
path and class) so defenders can write detection or blocking rules for their AV
and EDR tooling.

Live site: https://lothardware.com.tr/

## How it works

The site is built with [Hugo](https://gohugo.io/) using the
[hugo-index](https://github.com/adityatelange/hugo-index) theme, included as a
git submodule. Every device is a single Markdown file under `content/`, and
`hardwares.json` is a machine readable copy of the catalog that visitors can
download.

## Running locally

You need Hugo (extended) installed. Clone with submodules so the theme is
present:

```
git clone --recurse-submodules https://github.com/enesilhaydin/lothardware.git
cd lothardware
```

If you already cloned without submodules:

```
git submodule update --init --recursive
```

Start the development server (drafts included):

```
hugo server -D
```

Build the production site into `public/`:

```
hugo --minify
```

## Adding a device

```
hugo new content/<slug>.md
```

Fill in the front matter (title, date, tags, description) and the body sections
(Device Instance Path, VendorID, ProductID, Class, Author, Sigma/Yara Rules,
Links). Use `content/hak5-rubber-ducky.md` as a reference. New pages are drafts
by default, so set `draft: false` once the entry is ready. Remember to add the
same device to `hardwares.json`.

## Contributing

Found an error, or want a device added? Open an issue or contact
enesilhaydin@gmail.com. Note that the listed IDs are defaults and can be spoofed
by an attacker, so treat them as indicators rather than guarantees.
