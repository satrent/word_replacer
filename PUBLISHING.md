# How to Publish your Chrome Extension

Congratulations on building your first Chrome Extension! Here is how to publish it to the Chrome Web Store.

## 1. Prepare your Extension for Distribution

1.  **Create a ZIP file**:
    *   Navigate to your extension folder (`c:\code\word_replacer`).
    *   Select all files (`manifest.json`, `popup.html`, `popup.js`, `content.js`).
    *   Right-click and choose **Send to -> Compressed (zipped) folder**.
    *   Name it `word_replacer.zip`.

2.  **Create Icons**:
    *   You will need a 128x128 pixel icon file (PNG) for the store listing.
    *   I temporarily removed icon references from the `manifest.json` to prevent errors during testing, but for publishing, you should add them back.
    *   Update `manifest.json` to include icons:
        ```json
        "icons": {
          "16": "icon16.png",
          "48": "icon48.png",
          "128": "icon128.png"
        }
        ```

## 2. Register a Developer Account

1.  Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/dev/dashboard).
2.  Sign in with your Google Account.
3.  Pay the one-time developer registration fee (currently $5 USD).

## 3. Upload your Item

1.  Click on **+ New Item**.
2.  Upload the `word_replacer.zip` file you created.
3.  The dashboard will analyze your manifest file.

## 4. Fill in Store Listing

1.  **Description**: Write a clear description of what your extension does.
2.  **Screenshots**: Take screenshots of your extension in action (the popup and a website with replaced words). You need at least one screenshot.
3.  **Category**: choose "Productivity" or "Fun".
4.  **Language**: Select English.

## 5. Privacy Practices

1.  Go to the **Privacy** tab.
2.  **Single Purpose**: Explain that the extension's single purpose is to replace user-defined words on web pages.
3.  **Permission Justification**:
    *   `activeTab`: To modify the content on the current tab.
    *   `scripting`: To inject the replacement script.
    *   `storage`: To save the user's word list locally.
    *   `host_permissions`: Explain that it needs access to all sites so the user can replace words on any page they visit.
4.  Check the boxes certifying you don't collect user data (since we are only using local storage).

## 6. Submit for Review

1.  Click **Submit for Review**.
2.  Google's team will review your extension. This can take anywhere from a few hours to a few weeks.
3.  Once approved, it will be live on the Chrome Web Store!
