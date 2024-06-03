# manifest.json

* Using WebExtensions API

Specify name, version, background scripts, content scripts, browser actions

JSON-formatted

// style comments allowed

access extension manifest in javascript using browser.runtime.getManifest()

# Find dom element to manipulate

Inspect page
documents.getElementsbyClassName("ytp-left-controls")[0]
document.getElementsByClassName("video-stream")[0]

# Content Script
match patterns for content scripts
background js file event listener

# Get the current tab from youtube

youtube documentation