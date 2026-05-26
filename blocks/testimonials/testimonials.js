export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const [quoteCell, nameCell] = row.children;
    const li = document.createElement('li');
    const quote = document.createElement('blockquote');
    const cite = document.createElement('cite');

    quote.innerHTML = quoteCell?.innerHTML || '';
    cite.textContent = nameCell?.textContent.trim() || '';
    li.append(quote, cite);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
