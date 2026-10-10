const fs = require('fs');

const css = `
:root{--bg:#0a0f1c;--panel:#111a2e;--line:#22304d;--text:#e8edf7;--mut:#8d9bb8;--acc:#3dffa2;--acc2:#4d8bff;--r:14px}
[data-theme=light]{--bg:#ffffff;--panel:#f8fafc;--line:#e2e8f0;--text:#0f172a;--mut:#475569;--acc:#059669;--acc2:#2563eb}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--text);font:400 16px/1.6 Onest,sans-serif;padding:0;margin:0;}
header{padding:20px;border-bottom:1px solid var(--line);display:flex;align-items:center;background:var(--panel);position:sticky;top:0;z-index:100;}
.logo{font:700 20px Unbounded,sans-serif;color:var(--text);text-decoration:none;}
.logo i{color:var(--acc);font-style:normal}
section{padding:60px 20px;border-bottom:1px solid var(--line);}
.container{max-width:900px;margin:0 auto;}
h1,h2,h3{font-family:Unbounded,sans-serif;color:var(--text);margin-bottom:20px;}
h1{font-size:36px;color:var(--acc);}
h2{font-size:28px;text-align:center;}
.desc{font-size:18px;color:var(--mut);margin-bottom:30px;}
.price-box{display:flex;align-items:center;justify-content:space-between;padding:30px;background:linear-gradient(90deg,var(--panel),rgba(61,255,162,0.1));border-radius:12px;border:1px solid var(--acc);flex-wrap:wrap;gap:20px;}
.price{font-family:Unbounded,sans-serif;font-size:32px;}
.btn{background:var(--acc);color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;cursor:pointer;border:none;}
.btn:hover{filter:brightness(1.1);}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:30px;}
.card{background:var(--panel);padding:25px;border-radius:12px;border:1px solid var(--line);}
.card h3{font-size:18px;color:var(--acc2);margin-bottom:10px;}
ul.check-list{list-style:none;padding:0;}
ul.check-list li{padding:12px 0;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:15px;}
ul.check-list li:before{content:'✓';color:var(--acc);font-weight:bold;font-size:20px;}
ul.check-list li:last-child{border-bottom:none;}
.step{display:flex;gap:20px;margin-bottom:20px;}
.step-num{background:var(--line);color:var(--acc);font-family:Unbounded,sans-serif;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:20px;flex-shrink:0;}
.faq-item{background:var(--panel);margin-bottom:15px;padding:20px;border-radius:12px;border:1px solid var(--line);}
.faq-item h4{font-size:18px;margin-bottom:10px;color:var(--acc2);}
.faq-item p{color:var(--mut);font-size:15px;}
footer{padding:30px 20px;text-align:center;color:var(--mut);font-size:14px;}
`;

function getTemplate(lang, t) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<script>if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light';</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITLE}} — ${t.details}</title>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<!-- Block 1: Header -->
<header>
  <a href="${t.homeLink}" class="logo">Gotovo<i>.</i></a>
  <div style="margin-left:auto;display:flex;align-items:center;">
    <a href="{{UK_LINK}}" style="margin-right:15px;color:{{UK_COLOR}};font-weight:{{UK_WEIGHT}};text-decoration:none;">UK</a>
    <a href="{{EN_LINK}}" style="margin-right:20px;color:{{EN_COLOR}};font-weight:{{EN_WEIGHT}};text-decoration:none;">EN</a>
    <button id="theme" style="margin-right:15px;background:none;border:1px solid var(--line);color:var(--text);border-radius:8px;padding:4px 10px;cursor:pointer;font-size:16px;" aria-label="Toggle theme">◐</button>
    <a href="${t.homeLink}" style="color:var(--mut);text-decoration:none;">← ${t.back}</a>
  </div>
</header>

<!-- Block 2: Hero -->
<section style="padding-top:80px;padding-bottom:80px;">
  <div class="container">
    <h1>{{TITLE}}</h1>
    <p class="desc">{{DESC}}</p>
    <div class="price-box">
      <div>
        <div style="color:var(--mut);font-size:14px;">${t.estCost}</div>
        <div class="price">{{PRICE}}</div>
      </div>
      <a href="#order" class="btn">${t.orderNow}</a>
    </div>
  </div>
</section>

<!-- Block 3: Features -->
<section>
  <div class="container">
    <h2>${t.included}</h2>
    <div class="card" style="margin-top:30px;">
      <ul class="check-list">
        {{FEATURES}}
      </ul>
    </div>
  </div>
</section>

<!-- Block 4: Target Audience -->
<section style="background:var(--panel);">
  <div class="container">
    <h2>${t.forWhomTitle}</h2>
    <div class="grid">
      <div class="card" style="background:var(--bg);">
        <h3>${t.for1t}</h3>
        <p style="color:var(--mut);">${t.for1d}</p>
      </div>
      <div class="card" style="background:var(--bg);">
        <h3>${t.for2t}</h3>
        <p style="color:var(--mut);">${t.for2d}</p>
      </div>
      <div class="card" style="background:var(--bg);">
        <h3>${t.for3t}</h3>
        <p style="color:var(--mut);">${t.for3d}</p>
      </div>
    </div>
  </div>
</section>

<!-- Block 5: Workflow -->
<section>
  <div class="container">
    <h2>${t.howItWorks}</h2>
    <div style="margin-top:40px;max-width:600px;margin-inline:auto;">
      <div class="step">
        <div class="step-num">1</div>
        <div>
          <h3 style="margin-bottom:5px;">${t.step1t}</h3>
          <p style="color:var(--mut);">${t.step1d}</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div>
          <h3 style="margin-bottom:5px;">${t.step2t}</h3>
          <p style="color:var(--mut);">${t.step2d}</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div>
          <h3 style="margin-bottom:5px;">${t.step3t}</h3>
          <p style="color:var(--mut);">${t.step3d}</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div>
          <h3 style="margin-bottom:5px;">${t.step4t}</h3>
          <p style="color:var(--mut);">${t.step4d}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Block 6: Why Us -->
<section style="background:var(--panel);">
  <div class="container">
    <h2>${t.whyUs}</h2>
    <div class="grid">
      <div class="card" style="background:var(--bg);">
        <h3>${t.why1t}</h3>
        <p style="color:var(--mut);">${t.why1d}</p>
      </div>
      <div class="card" style="background:var(--bg);">
        <h3>${t.why2t}</h3>
        <p style="color:var(--mut);">${t.why2d}</p>
      </div>
      <div class="card" style="background:var(--bg);">
        <h3>${t.why3t}</h3>
        <p style="color:var(--mut);">${t.why3d}</p>
      </div>
    </div>
  </div>
</section>

<!-- Block 7: FAQ -->
<section>
  <div class="container">
    <h2>${t.faq}</h2>
    <div style="margin-top:30px;">
      <div class="faq-item">
        <h4>${t.faq1t}</h4>
        <p>${t.faq1d}</p>
      </div>
      <div class="faq-item">
        <h4>${t.faq2t}</h4>
        <p>${t.faq2d}</p>
      </div>
      <div class="faq-item">
        <h4>${t.faq3t}</h4>
        <p>${t.faq3d}</p>
      </div>
    </div>
  </div>
</section>

<!-- Block 8: CTA / Contact -->
<section id="order" style="background:linear-gradient(180deg, var(--bg), var(--panel));text-align:center;">
  <div class="container">
    <h2 style="color:var(--acc);">${t.readyTitle}</h2>
    <p class="desc">${t.readyDesc}</p>
    <a href="${t.homeLink}#contact" class="btn" style="font-size:20px;padding:15px 40px;">${t.orderNow}</a>
  </div>
</section>

<!-- Block 9: Footer -->
<footer>
  <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;align-items:center;">
    <div>© 2026 Gotovo. ${t.allRights}</div>
    <div style="display:flex;gap:20px;font-size:13px;">
      <a href="{{PRIVACY_LINK}}" style="color:#ffffff;text-decoration:underline;">{{PRIVACY_TEXT}}</a>
      <a href="{{TERMS_LINK}}" style="color:#ffffff;text-decoration:underline;">{{TERMS_TEXT}}</a>
    </div>
  </div>
</footer>
<script>document.getElementById('theme').onclick=()=>{const r=document.documentElement;const isL=r.dataset.theme==='light';r.dataset.theme=isL?'dark':'light';localStorage.setItem('theme',isL?'dark':'light');};</script>
</body>
</html>`;
}

const tUk = {
  details: 'Детальна інформація', homeLink: '/', back: 'Назад на головну', estCost: 'Орієнтовна вартість:', orderNow: 'Замовити зараз',
  included: 'Що входить у вартість:',
  forWhomTitle: 'Для кого підійде ця послуга?',
  for1t: 'Малому бізнесу', for1d: 'Для тих, хто хоче швидко запуститися і почати отримувати клієнтів.',
  for2t: 'Підприємцям', for2d: 'Для автоматизації рутини та збільшення продажів.',
  for3t: 'Компаніям', for3d: 'Для масштабування та виходу на новий рівень.',
  howItWorks: 'Як ми працюємо',
  step1t: 'Заявка', step1d: 'Ви залишаєте заявку, ми зв\'язуємося з вами для обговорення деталей.',
  step2t: 'Бриф', step2d: 'Фіксуємо вимоги, ціну та терміни в договорі.',
  step3t: 'Розробка', step3d: 'Ми створюємо продукт, налаштовуємо та тестуємо його.',
  step4t: 'Запуск', step4d: 'Ви отримуєте готовий результат та інструкції з використання.',
  whyUs: 'Чому варто обрати нас',
  why1t: 'Фіксована ціна', why1d: 'Жодних прихованих платежів. Ціна не змінюється в процесі.',
  why2t: 'Швидкий запуск', why2d: 'Ми використовуємо готові модулі, щоб запустити проєкт за лічені дні.',
  why3t: 'Підтримка 24/7', why3d: 'Ми завжди на зв\'язку і готові допомогти після запуску.',
  faq: 'Поширені запитання',
  faq1t: 'Чи можна змінити дизайн пізніше?', faq1d: 'Так, проєкт легко масштабується та змінюється за потреби.',
  faq2t: 'Як відбувається оплата?', faq2d: 'Оплата ділиться на дві частини: 50% перед початком, 50% після здачі.',
  faq3t: 'Чи потрібні мені технічні знання?', faq3d: 'Ні, ми беремо всю технічну частину на себе і даємо зручну адмінку.',
  readyTitle: 'Готові почати?', readyDesc: 'Залиште заявку, і ми безкоштовно проконсультуємо вас щодо проєкту.',
  allRights: 'Усі права захищено.'
};

const tEn = {
  details: 'Details', homeLink: '/en', back: 'Back to home', estCost: 'Estimated Cost:', orderNow: 'Order Now',
  included: 'What\'s included in the price:',
  forWhomTitle: 'Who is this for?',
  for1t: 'Small Business', for1d: 'For those who want to launch quickly and get clients.',
  for2t: 'Entrepreneurs', for2d: 'To automate routine and increase sales.',
  for3t: 'Companies', for3d: 'For scaling and reaching a new level.',
  howItWorks: 'How we work',
  step1t: 'Application', step1d: 'You leave a request, we contact you to discuss details.',
  step2t: 'Brief', step2d: 'We fix requirements, price and terms in the contract.',
  step3t: 'Development', step3d: 'We create the product, configure and test it.',
  step4t: 'Launch', step4d: 'You receive the finished result and usage instructions.',
  whyUs: 'Why choose us',
  why1t: 'Fixed Price', why1d: 'No hidden fees. The price does not change in the process.',
  why2t: 'Fast Launch', why2d: 'We use pre-built modules to launch the project in days.',
  why3t: '24/7 Support', why3d: 'We are always in touch and ready to help after launch.',
  faq: 'Frequently Asked Questions',
  faq1t: 'Can I change the design later?', faq1d: 'Yes, the project is easily scalable and changeable if needed.',
  faq2t: 'How does payment work?', faq2d: 'Payment is split: 50% upfront, 50% upon delivery.',
  faq3t: 'Do I need technical skills?', faq3d: 'No, we handle all technical aspects and provide an easy admin panel.',
  readyTitle: 'Ready to start?', readyDesc: 'Leave a request, and we will consult you for free.',
  allRights: 'All rights reserved.'
};

const ukSites=[
 {n:'Візитка',d:'Одна сторінка про вас і ваші послуги.',p:'3 900 ₴'},
 {n:'Лендинг',d:'Продаючий сайт під одну пропозицію.',p:'7 900 ₴'},
 {n:'Корпоративний сайт',d:'Повноцінний сайт компанії.',p:'14 900 ₴'},
 {n:'Інтернет-магазин',d:'Каталог, кошик і онлайн-оплата.',p:'19 900 ₴'}
];
const ukBots=[
 {n:'Автовідповідач',d:'Відповідає на типові питання 24/7.',p:'2 900 ₴'},
 {n:'Бот для заявок і оплат',d:'Приймає замовлення й гроші.',p:'6 900 ₴'},
 {n:'Бот з CRM-інтеграцією',d:'Автоматизація продажів і процесів.',p:'12 900 ₴'},
 {n:'Бот-меню ресторану',d:'Онлайн замовлення страв та доставка.',p:'5 500 ₴'},
 {n:'Бот техпідтримки (Helpdesk)',d:'Система тікетів для підтримки клієнтів.',p:'7 500 ₴'},
 {n:'Бот для запису (Салони/СТО)',d:'Автоматизація бронювання часу.',p:'8 900 ₴'},
 {n:'Крипто-бот',d:'Інтеграція з крипто-платежами та курсами.',p:'15 000 ₴'},
 {n:'Бот-вікторина (Квіз)',d:'Генерація лідів через гейміфікацію.',p:'4 500 ₴'},
 {n:'Бот для інфобізнесу',d:'Платформа для проведення курсів.',p:'11 500 ₴'},
 {n:'Бот-магазин (Web App)',d:'Повноцінний інтернет-магазин у Telegram.',p:'14 500 ₴'},
 {n:'Бот-розсильник',d:'Масові розсилки повідомлень.',p:'3 500 ₴'},
 {n:'Бот для HR / Рекрутингу',d:'Анкетування та онбординг персоналу.',p:'6 500 ₴'},
 {n:'Бот-афіша / Івенти',d:'Продаж квитків на події.',p:'9 900 ₴'},
 {n:'Бот для нерухомості',d:'Пошук та оренда житла.',p:'10 500 ₴'},
 {n:'Бот фітнес-тренера',d:'Програми тренувань та харчування.',p:'5 900 ₴'},
 {n:'Бот-перекладач спільнот',d:'Автоматичний переклад у чатах.',p:'4 000 ₴'},
 {n:'Бот таск-менеджер',d:'Управління завданнями для команди.',p:'8 000 ₴'},
 {n:'Бот бронювання готелів',d:'Перевірка номерів та бронювання.',p:'11 000 ₴'},
 {n:'Закритий клуб (Підписка)',d:'Приватний доступ за підпискою.',p:'7 900 ₴'},
 {n:'AI-бот (ChatGPT)',d:'Розумний ШІ-асистент для бізнесу.',p:'18 000 ₴'}
];
const ukHosts=[
 {n:'Старт',d:'Базовий хостинг для одного сайту.',p:'150 ₴ / міс'},
 {n:'Бізнес',d:'Оптимально для кількох проєктів.',p:'300 ₴ / міс'},
 {n:'Максимум',d:'Виділені ресурси для великих проєктів.',p:'700 ₴ / міс'}
];
const ukAll = [...ukSites, ...ukBots, ...ukHosts];

const enAll = [
 {n:'Business Card',d:'One page about you and your services.',p:'$99 fixed'},
 {n:'Landing Page',d:'Sales page for a single offer.',p:'$199 fixed'},
 {n:'Corporate Site',d:'Full-fledged company website.',p:'$375 fixed'},
 {n:'Online Store',d:'Catalog, cart, and online payment.',p:'$499 fixed'},
 {n:'Autoresponder',d:'Answers FAQs 24/7.',p:'from $75'},
 {n:'Order & Payment Bot',d:'Accepts orders and money.',p:'from $175'},
 {n:'CRM Integration Bot',d:'Automates sales and processes.',p:'from $325'},
 {n:'Restaurant Menu Bot',d:'Online food ordering & delivery.',p:'from $139'},
 {n:'Helpdesk Bot',d:'Ticket system for customer support.',p:'from $189'},
 {n:'Booking Bot',d:'Automates time booking.',p:'from $225'},
 {n:'Crypto Bot',d:'Crypto payments and live rates.',p:'from $375'},
 {n:'Quiz Bot',d:'Lead generation through gamification.',p:'from $115'},
 {n:'Course Bot',d:'Platform for conducting courses.',p:'from $289'},
 {n:'Web App Store',d:'Full online store in Telegram.',p:'from $365'},
 {n:'Broadcast Bot',d:'Mass message broadcasting.',p:'from $89'},
 {n:'HR & Recruiting Bot',d:'Questionnaires and onboarding.',p:'from $165'},
 {n:'Event Bot',d:'Ticket sales for events.',p:'from $249'},
 {n:'Real Estate Bot',d:'Search and rent properties.',p:'from $265'},
 {n:'Fitness Bot',d:'Training and nutrition programs.',p:'from $149'},
 {n:'Translator Bot',d:'Automatic translation in chats.',p:'from $99'},
 {n:'Task Manager Bot',d:'Task management for the team.',p:'from $199'},
 {n:'Hotel Booking Bot',d:'Check rooms and book.',p:'from $275'},
 {n:'Private Club (Sub)',d:'Private access by subscription.',p:'from $199'},
 {n:'AI Assistant (ChatGPT)',d:'Smart AI assistant for business.',p:'from $450'},
 {n:'Start',d:'Basic hosting for one site.',p:'$4 / mo'},
 {n:'Business',d:'Optimal for a few projects.',p:'$8 / mo'},
 {n:'Maximum',d:'Dedicated resources for large projects.',p:'$18 / mo'}
];

const tmplUk = getTemplate('uk', tUk);
const tmplEn = getTemplate('en', tEn);

for (let i = 0; i < 27; i++) {
  // UK
  let s = ukAll[i];
  let features = `<li>Індивідуальний дизайн та розробка</li><li>Підтримка 24/7 протягом року</li><li>Базове SEO та оптимізація швидкості</li><li>Гарантія якості та безперебійної роботи</li>`;
  let html = tmplUk.replace(/{{TITLE}}/g, s.n).replace(/{{DESC}}/g, s.d).replace(/{{PRICE}}/g, s.p).replace(/{{FEATURES}}/g, features)
    .replace('{{UK_LINK}}', `/service-${i}`)
    .replace('{{EN_LINK}}', `/en/service-${i}`)
    .replace('{{UK_COLOR}}', 'var(--text)')
    .replace('{{UK_WEIGHT}}', 'bold')
    .replace('{{EN_COLOR}}', 'var(--mut)')
    .replace('{{EN_WEIGHT}}', 'normal')
    .replace('{{PRIVACY_LINK}}', '/privacy')
    .replace('{{TERMS_LINK}}', '/terms')
    .replace('{{PRIVACY_TEXT}}', 'Політика конфіденційності')
    .replace('{{TERMS_TEXT}}', 'Умови використання');
  fs.writeFileSync(`service-${i}.html`, html);

  // EN
  let se = enAll[i];
  let featuresEn = `<li>Custom design and development</li><li>24/7 Support for a year</li><li>Basic SEO and speed optimization</li><li>Quality and uptime guarantee</li>`;
  let htmlEn = tmplEn.replace(/{{TITLE}}/g, se.n).replace(/{{DESC}}/g, se.d).replace(/{{PRICE}}/g, se.p).replace(/{{FEATURES}}/g, featuresEn)
    .replace('{{UK_LINK}}', `/service-${i}`)
    .replace('{{EN_LINK}}', `/en/service-${i}`)
    .replace('{{UK_COLOR}}', 'var(--mut)')
    .replace('{{UK_WEIGHT}}', 'normal')
    .replace('{{EN_COLOR}}', 'var(--text)')
    .replace('{{EN_WEIGHT}}', 'bold')
    .replace('{{PRIVACY_LINK}}', '/en/privacy')
    .replace('{{TERMS_LINK}}', '/en/terms')
    .replace('{{PRIVACY_TEXT}}', 'Privacy Policy')
    .replace('{{TERMS_TEXT}}', 'Terms of Service');
  fs.writeFileSync(`en/service-${i}.html`, htmlEn);
}
console.log('Generated expanded pages for all 27 services');
