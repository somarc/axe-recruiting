export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const [labelCell, bodyCell] = row.children;
    const li = document.createElement('li');
    const label = document.createElement('strong');
    const body = document.createElement('div');

    label.textContent = labelCell?.textContent.trim() || '';
    body.innerHTML = bodyCell?.innerHTML || '';
    li.append(label, body);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
