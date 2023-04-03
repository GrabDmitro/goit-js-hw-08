import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  name: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
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

refs.name.addEventListener(
  'input',
  throttle(e => {
    localStorage.setItem(
      STORAGE_FEEDBACK_KEY,
      JSON.stringify({
        name: e.target.value,
        message: refs.textarea.value,
      })
    );
  }),
  1000
);
refs.textarea.addEventListener(
  'input',
  throttle(e => {
    localStorage.setItem(
      STORAGE_FEEDBACK_KEY,
      JSON.stringify({
        name: refs.name.value,
        message: e.target.value,
      })
    );
  }),
  1000
);
