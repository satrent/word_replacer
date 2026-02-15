// Function to replace text in a node
function replaceText(node, replacements) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        let modified = false;

        replacements.forEach(item => {
            // Create a regex to match the target word globally and case-insensitively
            // We use word boundaries \b to avoid replacing substrings (e.g. "cat" in "category")
            // However, user might want substring replacement. Let's stick to simple string replacement first for simplicity.
            // Actually, simple string replacement is safer for now.
            // Let's do a global replace using split/join or replaceAll which is modern JS.

            // Case sensitive? Usually better to be case-insensitive for this kind of tool.
            // But preserving case is hard. Simple approach: Case-insensitive match, but keep original case?
            // Simplest approach: Global case-insensitive replacement with the replacement word.

            const regex = new RegExp(escapeRegExp(item.target), 'gi');
            if (regex.test(text)) {
                text = text.replace(regex, item.replacement);
                modified = true;
            }
        });

        if (modified) {
            node.nodeValue = text;
        }
    } else {
        node.childNodes.forEach(child => replaceText(child, replacements));
    }
}

// Utility to escape regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Main function to start replacement
function runReplacements(replacements) {
    if (!replacements || replacements.length === 0) return;

    // Start replacing in the body
    replaceText(document.body, replacements);
}

// Load replacements on start
chrome.storage.local.get(['replacements'], (result) => {
    const replacements = result.replacements || [];
    runReplacements(replacements);
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replacementsUpdated") {
        runReplacements(request.replacements);
    }
});

// Optional: Observe DOM changes to handle dynamic content (advanced, but good for SPA)
const observer = new MutationObserver((mutations) => {
    chrome.storage.local.get(['replacements'], (result) => {
        const replacements = result.replacements || [];
        if (replacements.length === 0) return;

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                replaceText(node, replacements);
            });
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
