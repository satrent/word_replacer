document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('target');
  const replacementInput = document.getElementById('replacement');
  const addBtn = document.getElementById('add-btn');
  const listContainer = document.getElementById('replacements-list');

  // Load saved replacements
  chrome.storage.local.get(['replacements'], (result) => {
    const replacements = result.replacements || [];
    renderList(replacements);
  });

  // Add new replacement
  addBtn.addEventListener('click', () => {
    const target = targetInput.value.trim();
    const replacement = replacementInput.value.trim();

    if (target && replacement) {
      chrome.storage.local.get(['replacements'], (result) => {
        const replacements = result.replacements || [];
        // Check for duplicates or update existing? Let's just append for now.
        // Or remove existing entry with same target to avoid conflicts.
        const newReplacements = replacements.filter(item => item.target !== target);
        newReplacements.push({ target, replacement });
        
        chrome.storage.local.set({ replacements: newReplacements }, () => {
          renderList(newReplacements);
          targetInput.value = '';
          replacementInput.value = '';
          // Optional: Notify current tab to update immediately
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "replacementsUpdated", replacements: newReplacements});
          });
        });
      });
    }
  });

  function renderList(replacements) {
    listContainer.innerHTML = '';
    replacements.forEach(item => {
      const div = document.createElement('div');
      div.className = 'replacement-item';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'replacement-text';
      textSpan.textContent = `${item.target} -> ${item.replacement}`;
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = () => removeReplacement(item.target);

      div.appendChild(textSpan);
      div.appendChild(removeBtn);
      listContainer.appendChild(div);
    });
  }

  function removeReplacement(targetToRemove) {
    chrome.storage.local.get(['replacements'], (result) => {
      const replacements = result.replacements || [];
      const newReplacements = replacements.filter(item => item.target !== targetToRemove);
      
      chrome.storage.local.set({ replacements: newReplacements }, () => {
        renderList(newReplacements);
        // Notify current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
           chrome.tabs.sendMessage(tabs[0].id, {action: "replacementsUpdated", replacements: newReplacements});
        });
      });
    });
  }
});
