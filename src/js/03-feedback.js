import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  name: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
let formData = null;
const STORAGE_FEEDBACK_KEY = 'feedback-form-state';
if (!localStorage.getItem(STORAGE_FEEDBACK_KEY)) {
  localStorage.setItem(
    STORAGE_FEEDBACK_KEY,
    JSON.stringify({
      name: '',
      message: '',
    })
  );
}
refs.name.value = JSON.parse(localStorage.getItem(STORAGE_FEEDBACK_KEY)).name;
refs.textarea.value = JSON.parse(
  localStorage.getItem(STORAGE_FEEDBACK_KEY)
).message;
function saver(e) {
  if (!(e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA')) {
    return;
  }
  localStorage.setItem(
    STORAGE_FEEDBACK_KEY,
    JSON.stringify({
      name: refs.name.value,
      message: refs.textarea.value,
    })
  );
}

refs.form.addEventListener('input', throttle(saver, 1000));
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  formData = {
    name: refs.name.value,
    message: refs.textarea.value,
  };
  localStorage.clear();
  console.log(formData);
});
