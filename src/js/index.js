const switchMode = document.querySelector('.switch__btn');
const captchaContainer = document.querySelector('.captcha__text');
const feedbackMsg = document.querySelector('.msg');
const captchaInput = document.querySelector('#captcha');
const resetCaptcha = document.querySelector('.captcha__btn');
const signupBtn = document.querySelector('.signup__btn');
let finalCaptcha = '';

/* DARK MODE SWITCHER */

switchMode.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark');

  document
    .querySelector('.switch__btn > span > span')
    .classList.toggle('translateY');
});

/* DARK MODE SWITCHER  END*/

/* CHECK FOR CORRECT CAPTCHA ON FORM SUBMIT */

const toggleMsg = (msg, visibility = 'visible') => {
  feedbackMsg.style.visibility = visibility;
  feedbackMsg.innerHTML = msg;
};

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let username = document.querySelector('#username');
  let password = document.querySelector('#password');
  let tempCaptcha = captchaInput.value.split(' ').join(''); //remove spaces from user input.
  if (!username.value.length || !password.value.length) {
    toggleMsg('enter valid username & password'); //display error
    feedbackMsg.classList.add('error');
    feedbackMsg.classList.remove('success');
    return;
  }
  if (finalCaptcha !== tempCaptcha) {
    toggleMsg('enter valid captcha'); //display error
    feedbackMsg.classList.add('error');
    feedbackMsg.classList.remove('success');
  } else {
    toggleMsg('Successfully logged in!'); // display success
    feedbackMsg.classList.add('success');
    feedbackMsg.classList.remove('error');

    setTimeout(() => {
      username.value = '';
      password.value = '';
      captchaInput.value = '';
      toggleMsg('', 'hidden');
      feedbackMsg.innerHTML = '';
      location.reload();
    }, 1000);
  }
});

/* CHECK FOR CORRECT CAPTCHA ON FORM SUBMIT END */

/* GENERATE CAPTCHA FUNCTION */

const generateCaptcha = () => {
  let randomAlpha = (Math.random() * 100000000).toString(36).slice(0, 5); //generate random number and convert to string
  finalCaptcha = '';

  /* ADD THE GENERATED STRING TO THE CAPTCHA PARENT CONTAINER */

  let captcha = randomAlpha.split('').map((item, idx) => {
    let index = Math.floor(Math.random() * randomAlpha.length); //generate random index to convert letter to uppercase
    const rotate = Math.random() * 45; // generate random rotate value to rotate the letters
    finalCaptcha += idx === index ? item.toUpperCase() : item;
    return `<span style="display:inline-block;transform:rotate(${rotate}deg)">${finalCaptcha[idx]}</span>`;
  });

  captchaContainer.innerHTML = captcha.join('');
};

resetCaptcha.addEventListener('click', (e) => {
  e.preventDefault();
  generateCaptcha();
});

/* GENERATE CAPTCHA END */

generateCaptcha(); // call the function once on pageload;
