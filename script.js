// Пауза
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  var vacancies = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]');
  var vacancy = document.querySelector('[data-qa="vacancy-response-link-top"]');
  var i = 0;

  // Функция для автоматического выбора резюме
  function selectResume() {
    var resume = document.querySelector('#resume_cd1c20ffff0ce01c000039ed1f4d7377344779');
    var message = document.querySelector('[data-qa="vacancy-response-letter-toggle"]');

    if (!message) {
      resume.click();
    } else {
      resume.click();
      message.click();
    }
  }

  // Функция для автоматической отправки Сопроводительного письма
  function handlerCoverLetter() {
    // Шаблон Сопроводительного письма
    var vacancyTitle = document.querySelector(
      '.bloko-modal-header_outlined > div'
    ).textContent;
    var vacancyName = vacancyTitle.slice(1, vacancyTitle.length - 1);
    var messagesData = {
      frontend: `
        Hello!) I hope my letter finds you well!

        After carefully reading the job description, I am confident that my experience and skills can make a significant contribution to your company.

        My ability to understand FSD architecture, experience with Vue (including Vue 2/3, vuex, pinia), React and even React-Native, knowledge of JavaScript, Typescript, HTML, CSS, as well as experience with CSS preprocessors (SASS, Pug) and TailwindCSS make me a suitable candidate for your team.
        I can make correct decisions in accordance with the requirements and design business logic on the client side.
        
        During the last 4 years, I have been involved in the development of a large dashboard (FamilyOffice), iOS app with UnityFramework integration, panels for displaying transactions and warehouse balances, kanban with Youtrack API, and the creation of an Electron app for touch-screen terminals. Additionally, I actively worked on adaptive layout, wrote npm libraries, authored some articles. And I work on my own project in free time.

        So, thank you for considering my application, and I look forward to your reply.

        Best regards,
        Dmitrii
      `,
    };

    var messageArea = document.querySelector(
      '[data-qa="vacancy-response-popup-form-letter-input"]'
    );
    messageArea.value = '';
    messageArea.value = messagesData.frontend;

    // Добавить изменения в поле текста
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, true);
    messageArea.dispatchEvent(evt);

    // Отправить отклик
    var btnSubmit = document.querySelector('[data-qa="vacancy-response-submit-popup"]');
    btnSubmit.click();
  }

  // Вызвать функцию на странице с вакансией
  if (vacancy) {
    vacancy.click();

    await delay(1000);
    selectResume();

    await delay(500);
    handlerCoverLetter();
  }
  // Иначе вызвать функцию на странице со списком вакансий
  else {
    while (i <= vacancies.length) {
      vacancies[i].click();

      await delay(1000);

      const wrongLocationBtn = document.querySelector('button[data-qa="relocation-warning-confirm"]')
      if (wrongLocationBtn) {
        wrongLocationBtn.click();
        await delay(1500);
      }

      selectResume();

      await delay(1000);
      handlerCoverLetter();
      i++;

      await delay(1000);
    }
  }
}

// Добавить на панель доп. функционал
(async function addNavLinks() {
  await delay(1000);

  const navLinks = document.querySelectorAll(
    '.supernova-navi-item.supernova-navi-item_lvl-2.supernova-navi-item_no-mobile'
  );

  const itemLetters = document.createElement('div');

  function createElement(item, attribute, title) {
    item.classList.add(
      'supernova-navi-item',
      'supernova-navi-item_lvl-2',
      'supernova-navi-item_no-mobile'
    );

    item.innerHTML = `
    <a
      data-qa="mainmenu_vacancyResponses"
      class="supernova-link"
      ${attribute}
    >
      ${title}
    </a>
    <div class="supernova-navi-underline">${title}</div>
    `;
  }

  createElement(itemLetters, 'handler-letters', 'Отправить отклики');

  navLinks[2].append(itemLetters);
  document.querySelector('[handler-letters]').addEventListener('click', init);
})();
