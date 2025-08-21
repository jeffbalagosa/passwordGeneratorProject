/* eslint-disable no-use-before-define */

//randomize number for every list item
function randomizeNumber(digits) {
  let numArr = [];
  while (numArr.length < digits) {
    numArr.push(chance.integer({ min: -0, max: 9 }));
  }
  return numArr.join('');
}

//pick a valid random word from the array
async function randomWordPicker(minWordLength, maxWordLength) {
  let suitableWord = null;
  while (suitableWord === null) {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=50');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const words = await response.json();
      const suitableWords = words.filter(word => word.length >= minWordLength && word.length <= maxWordLength);
      if (suitableWords.length > 0) {
        suitableWord = chance.pickone(suitableWords);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return "error";
    }
  }
  return suitableWord;
}

const randomSymbol = () => {
  const symbols = ['.', '!', '?', '%', ',', '@', '^', ':', '-', '_', ';'];
  return chance.pickone(symbols);
};

const passPhrase = async (wordCount, numDigits, minWordLength, maxWordLength, separator) => {
  const wordArr = [];
  let password = '';

  // Since randomWordPicker is now async, we need to await it.
  // We can generate all the words in parallel.
  const wordPromises = [];
  for (let i = 0; i < wordCount; i++) {
    wordPromises.push(randomWordPicker(minWordLength, maxWordLength));
  }

  const randomWords = await Promise.all(wordPromises);

  // randomize 1st word in array to be all caps or all lowercase, then alternate case for next word.
  if (Math.random() < 0.5) {
    for (let i = 0; i < randomWords.length; i++) {
      if (i % 2 !== 0) {
        wordArr.push(randomWords[i].toUpperCase());
      } else {
        wordArr.push(randomWords[i]);
      }
    }
  } else {
    for (let i = 0; i < randomWords.length; i++) {
      if (i % 2 === 0) {
        wordArr.push(randomWords[i].toUpperCase());
      } else {
        wordArr.push(randomWords[i]);
      }
    }
  }

  wordArr.unshift(randomizeNumber(numDigits));
  wordArr.push(randomizeNumber(numDigits));
  // If user provided a separator use it, otherwise random symbol.
  const sep = (separator && separator.trim() !== '') ? separator : randomSymbol();
  password = `${wordArr.join(sep)}`;
  return password;
};

//build list item html for dom
const listBuilder = async (wordCount, numDigits, minWordLength, maxWordLength, listItemCount, separator) => {
  const passwordPromises = [];
  for (let i = 0; i < listItemCount; i++) {
  passwordPromises.push(passPhrase(wordCount, numDigits, minWordLength, maxWordLength, separator));
  }
  const passwords = await Promise.all(passwordPromises);
  const list = passwords.map(p => `<dt>${p}</dt>`);
  return list.join('');
};

//add generated html to index.html
async function buildSuggestionList() {
  const numWords = $('#numWords').val();
  const numDigits = $('#numDigits').val();
  const minWordLength = $('#minWordLength').val();
  const maxWordLength = $('#maxWordLength').val();
  const separator = $('#separator').val();
  const pwCountRaw = $('#pwCount').val();
  // sanitize and fallback
  let pwCount = parseInt(pwCountRaw, 10);
  if (isNaN(pwCount) || pwCount < 1) pwCount = 1;
  if (pwCount > 50) pwCount = 50;
  // Show a loading spinner with accessibility
  $('.pwList').attr('aria-busy', 'true').html('<div class="pwList-loading-bg"><div class="loading-text">Loading...</div><div class="spinner" role="status"><span class="visually-hidden">Loading...</span></div></div>');
  try {
    const listHtml = await listBuilder(numWords, numDigits, minWordLength, maxWordLength, pwCount, separator);
    $('.pwList').attr('aria-busy', 'false').html(
      `<div class="pwList-inner">
        <button type="button" class="copy-all-btn" title="Copy all passwords" aria-label="Copy all passwords">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        </button>
        <dl>
          ${listHtml}
        </dl>
      </div>`
    );
  } catch (error) {
    $('.pwList').html('<p>Could not generate passwords. Please try again.</p>');
    console.error(error);
  }
}

buildSuggestionList();

//get passwords on button click
$('.get-pass').on('click', function () {
  //place jquery function for dom manipulation here.
  buildSuggestionList();
});

// Delegate click for dynamically added copy button
$('.pwList').on('click', '.copy-all-btn', function () {
  const $btn = $(this);
  const pwTexts = $('.pwList dt').map(function () { return $(this).text().trim(); }).get();
  if (!pwTexts.length) return;
  const all = pwTexts.join('\n');
  const doFeedback = () => {
    $btn.addClass('copied');
    // replace icon path with a checkmark for a moment
    const originalHtml = $btn.html();
    $btn.html('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>');
    setTimeout(() => { $btn.removeClass('copied').html(originalHtml); }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(all).then(doFeedback).catch(() => fallbackCopy(all, doFeedback));
  } else {
    fallbackCopy(all, doFeedback);
  }
});

function fallbackCopy(text, cb) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (typeof cb === 'function') cb();
  } catch (e) {
    console.error('Copy failed', e);
  }
}
