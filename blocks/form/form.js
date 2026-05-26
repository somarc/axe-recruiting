function text(cell) {
  return cell?.textContent.trim() || '';
}

function toName(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function createField(label, type, config) {
  const wrapper = document.createElement('label');
  const labelText = document.createElement('span');
  const name = toName(label);
  const required = config.toLowerCase().includes('required');
  let field;

  if (type === 'textarea') {
    field = document.createElement('textarea');
    field.rows = 5;
  } else if (type === 'select') {
    field = document.createElement('select');
    config.split('|').map((option) => option.trim()).filter(Boolean).forEach((option) => {
      const item = document.createElement('option');
      item.value = option;
      item.textContent = option;
      field.append(item);
    });
  } else {
    field = document.createElement('input');
    field.type = type || 'text';
  }

  labelText.textContent = label;
  field.name = name;
  field.id = name;
  field.required = required;
  wrapper.append(labelText, field);

  return wrapper;
}

export default function decorate(block) {
  const form = document.createElement('form');
  let submitLabel = 'Submit';

  form.method = 'post';

  [...block.children].forEach((row) => {
    const [labelCell, typeCell, configCell] = row.children;
    const label = text(labelCell);
    const type = text(typeCell).toLowerCase();
    const config = text(configCell);

    if (label.toLowerCase() === 'action') {
      form.action = text(typeCell);
      return;
    }

    if (type === 'submit') {
      submitLabel = label || submitLabel;
      return;
    }

    form.append(createField(label, type, config));
  });

  const actions = document.createElement('div');
  const button = document.createElement('button');

  actions.className = 'form-actions';
  button.type = 'submit';
  button.className = 'button primary';
  button.textContent = submitLabel;
  actions.append(button);
  form.append(actions);

  block.replaceChildren(form);
}
