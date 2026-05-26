export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const [titleCell, bodyCell] = row.children;
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const body = document.createElement('div');

    title.textContent = titleCell?.textContent.trim() || '';
    body.innerHTML = bodyCell?.innerHTML || '';
    li.append(title, body);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
