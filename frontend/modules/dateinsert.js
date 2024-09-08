// date-button.js
import Quill from 'quill';

class DateButton {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;

    const toolbar = quill.getModule('toolbar');

    toolbar.addHandler('insertDate', this.insertDate.bind(this));

    // Create a button with Vuetify's icon class
    const button = document.createElement('button');
    button.classList.add('ql-insertDate'); // Add a custom class for styling
    button.innerHTML = '<span style="font-size:22px" class="v-icon mdi mdi-calendar x-small"></span>'; // Vuetify icon class

    button.addEventListener('click', this.onClick.bind(this));

    toolbar.container.appendChild(button);
  }

  insertDate() {
    const currentDate = new Date().toLocaleDateString('en-GB');;
    this.quill.clipboard.dangerouslyPasteHTML(this.quill.getSelection(), currentDate);
  }

  onClick() {
    this.insertDate();
  }
}

Quill.register('modules/dateButton', DateButton);

export default DateButton;
