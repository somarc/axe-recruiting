function getText(cell) {
  return cell?.textContent.trim() || '';
}

export default function decorate(block) {
  const rows = [...block.children];
  const tabList = document.createElement('div');
  const panels = document.createElement('div');
  const blockId = `tabs-${Math.random().toString(36).slice(2, 8)}`;

  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');
  panels.className = 'tabs-panels';

  rows.forEach((row, index) => {
    const [labelCell, contentCell] = row.children;
    const tabId = `${blockId}-tab-${index}`;
    const panelId = `${blockId}-panel-${index}`;
    const button = document.createElement('button');
    const panel = document.createElement('div');
    const selected = index === 0;

    button.type = 'button';
    button.id = tabId;
    button.textContent = getText(labelCell);
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(selected));
    button.setAttribute('aria-controls', panelId);
    button.tabIndex = selected ? 0 : -1;

    panel.className = 'tabs-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.setAttribute('aria-hidden', String(!selected));
    panel.append(...[...(contentCell?.childNodes || [])]);

    button.addEventListener('click', () => {
      tabList.querySelectorAll('[role="tab"]').forEach((tab) => {
        const active = tab === button;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });

      panels.querySelectorAll('[role="tabpanel"]').forEach((item) => {
        item.setAttribute('aria-hidden', String(item !== panel));
      });
    });

    button.addEventListener('keydown', (event) => {
      const tabs = [...tabList.querySelectorAll('[role="tab"]')];
      const current = tabs.indexOf(event.currentTarget);
      let direction = 0;

      if (event.key === 'ArrowRight') direction = 1;
      if (event.key === 'ArrowLeft') direction = -1;

      if (!direction) return;
      event.preventDefault();
      tabs[(current + direction + tabs.length) % tabs.length].focus();
    });

    tabList.append(button);
    panels.append(panel);
  });

  block.replaceChildren(tabList, panels);
}
