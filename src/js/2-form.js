const formRef = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', () => {
  const email = formRef.elements.email.value.trim();
  const message = formRef.elements.message.value.trim();
  const userData = {
    email,
    message,
  };
  saveToLS(STORAGE_KEY, userData);
});

function saveToLS(key, value) {
  const saveValue = JSON.stringify(value);
  localStorage.setItem(key, saveValue);
}

function getFromLS(key) {
  const loadData = localStorage.getItem(key);
  try {
    return JSON.parse(loadData);
  } catch (error) {
    return loadData;
  }
}
const initalizationForm = () => {
  const userStorageData = getFromLS(STORAGE_KEY) || {};

  formRef.elements.email.value = userStorageData.email ?? '';
  formRef.elements.message.value = userStorageData.message ?? '';
};
initalizationForm();

formRef.addEventListener('submit', e => {
  e.preventDefault();
  if (
    formRef.elements.email.value !== '' &&
    formRef.elements.message.value !== ''
  ) {
    console.log(getFromLS(STORAGE_KEY) ?? '');
    localStorage.removeItem(STORAGE_KEY);
    formRef.reset();
  }
});
