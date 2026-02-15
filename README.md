# Word Replacer Chrome Extension

A simple Chrome Extension that allows you to replace specific words on any website with your own custom text.

## Features

- **Custom Replacements**: Define pairs of "Target Word" and "Replacement Word".
- **Instant Updates**: Replacements are applied immediately to the current page.
- **Persistent Storage**: Your replacement list is saved automatically and works across browser sessions.
- **Case-Insensitive**: Matches words regardless of capitalization (e.g., "The" matches "the").

## Installation (Developer Mode)

Since this extension is not yet in the Chrome Web Store, you can install it manually in Developer Mode:

1.  **Clone or Download** this repository to your local machine.
    ```bash
    git clone https://github.com/satrent/word_replacer.git
    ```
    (Or download the ZIP and extract it).

2.  Open Google Chrome and navigate to `chrome://extensions`.

3.  Enable **Developer mode** by toggling the switch in the top-right corner.

4.  Click the **Load unpacked** button in the top-left corner.

5.  Select the **directory** where you cloned/extracted this project (the folder containing `manifest.json`).

6.  The extension is now installed! You should see the "Word Replacer" icon in your toolbar.

## Usage

1.  Click the extension icon in the Chrome toolbar.
2.  Enter the word you want to replace in the **Target Word** field.
3.  Enter the new word in the **Replacement** field.
4.  Click **Add Replacement**.
5.  Navigate to any website (or refresh the current one) to see the magic happen!

## Development

- `manifest.json`: The extension configuration.
- `content.js`: The script that runs on web pages to find and replace text.
- `popup.html` & `popup.js`: The user interface for managing replacements.
