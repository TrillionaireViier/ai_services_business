const fs = require('fs');

const css = `
:root{--bg:#0a0f1c;--panel:#111a2e;--line:#22304d;--text:#e8edf7;--mut:#8d9bb8;--acc:#3dffa2;--acc2:#4d8bff;--r:14px}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--text);font:400 16px/1.6 Onest,sans-serif;padding:0;margin:0;}
header{padding:20px;border-bottom:1px solid var(--line);display:flex;align-items:center;background:var(--panel);position:sticky;top:0;z-index:100;}
.logo{font:700 20px Unbounded,sans-serif;color:var(--text);text-decoration:none;}
.logo i{color:var(--acc);font-style:normal}
.container{max-width:800px;margin:60px auto;padding:0 20px;}
h1{font-family:Unbounded,sans-serif;font-size:32px;color:var(--acc);margin-bottom:30px;}
h2{font-size:24px;margin-top:40px;margin-bottom:15px;color:var(--acc2);}
p{margin-bottom:15px;line-height:1.7;}
ul{margin-bottom:20px;padding-left:20px;}
li{margin-bottom:10px;}
footer{padding:30px 20px;text-align:center;color:var(--mut);font-size:14px;border-top:1px solid var(--line);margin-top:60px;}
`;

function makePage(lang, title, content, backLink, backText, pageSlug) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header>
  <a href="${backLink}" class="logo">Gotovo<i>.</i></a>
  <div style="margin-left:auto;display:flex;align-items:center;">
    <a href="/${pageSlug}" style="margin-right:15px;color:${lang === 'uk' ? 'var(--text)' : 'var(--mut)'};font-weight:${lang === 'uk' ? 'bold' : 'normal'};text-decoration:none;">UK</a>
    <a href="/en/${pageSlug}" style="margin-right:20px;color:${lang === 'en' ? 'var(--text)' : 'var(--mut)'};font-weight:${lang === 'en' ? 'bold' : 'normal'};text-decoration:none;">EN</a>
    <a href="${backLink}" style="color:var(--mut);text-decoration:none;">← ${backText}</a>
  </div>
</header>
<div class="container">
  <h1>${title}</h1>
  ${content}
</div>
<footer>
  <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;align-items:center;">
    <div>© 2026 Gotovo. ${lang === 'uk' ? 'Усі права захищено.' : 'All rights reserved.'}</div>
    <div style="display:flex;gap:20px;font-size:13px;">
      <a href="${lang === 'uk' ? '/privacy' : '/en/privacy'}" style="text-decoration:underline;">${lang === 'uk' ? 'Політика конфіденційності' : 'Privacy Policy'}</a>
      <a href="${lang === 'uk' ? '/terms' : '/en/terms'}" style="text-decoration:underline;">${lang === 'uk' ? 'Умови використання' : 'Terms of Service'}</a>
    </div>
  </div>
</footer>
</body>
</html>`;
}

const privacyUk = `
  <h2>1. Загальні положення</h2>
  <p>Ця політика конфіденційності встановлює порядок отримання, зберігання, обробки та використання персональних даних користувачів. Використовуючи наш сайт, ви погоджуєтесь із цією політикою.</p>
  
  <h2>2. Які дані ми збираємо</h2>
  <p>Ми збираємо мінімально необхідну інформацію для надання послуг:</p>
  <ul>
    <li>Ім'я та прізвище</li>
    <li>Контактний номер телефону або Telegram/Viber</li>
    <li>Інформацію про ваш проєкт (залишену в заявці)</li>
  </ul>
  
  <h2>3. Використання даних</h2>
  <p>Ваші дані використовуються виключно для зв'язку з вами щодо розробки проєкту, надання консультацій та технічної підтримки.</p>
  
  <h2>4. Захист даних</h2>
  <p>Ми не передаємо ваші персональні дані третім особам, крім випадків, передбачених законодавством. Дані зберігаються на захищених серверах.</p>
`;

const termsUk = `
  <h2>1. Предмет договору</h2>
  <p>Цей договір є публічною офертою. Виконавець бере на себе зобов'язання з розробки вебсайтів, чат-ботів або надання хостингу, а Замовник зобов'язується прийняти та оплатити ці послуги.</p>
  
  <h2>2. Порядок оплати</h2>
  <p>Оплата послуг з розробки розбивається на дві частини: 50% аванс перед початком робіт, та 50% після фінальної здачі проєкту і його затвердження Замовником.</p>
  
  <h2>3. Терміни виконання</h2>
  <p>Терміни виконання фіксуються під час обговорення ТЗ (технічного завдання) і становлять від 3 до 14 робочих днів залежно від складності проєкту.</p>
  
  <h2>4. Гарантії та підтримка</h2>
  <p>Виконавець гарантує працездатність створеного продукту. Безкоштовна технічна підтримка та виправлення багів надається протягом 30 днів після здачі проєкту (або протягом року, якщо замовлено додатковий пакет підтримки).</p>
`;

const privacyEn = `
  <h2>1. General Provisions</h2>
  <p>This privacy policy sets out the procedure for receiving, storing, processing, and using users' personal data. By using our site, you agree to this policy.</p>
  
  <h2>2. What Data We Collect</h2>
  <p>We collect the minimum necessary information to provide services:</p>
  <ul>
    <li>Name and surname</li>
    <li>Contact phone number or Telegram/Viber</li>
    <li>Information about your project (left in the application)</li>
  </ul>
  
  <h2>3. Use of Data</h2>
  <p>Your data is used exclusively to contact you regarding project development, consultations, and technical support.</p>
  
  <h2>4. Data Protection</h2>
  <p>We do not share your personal data with third parties, except as required by law. Data is stored on secure servers.</p>
`;

const termsEn = `
  <h2>1. Subject of the Agreement</h2>
  <p>This agreement is a public offer. The Contractor undertakes to develop websites, chatbots, or provide hosting, and the Customer agrees to accept and pay for these services.</p>
  
  <h2>2. Payment Procedure</h2>
  <p>Payment for development services is split: 50% advance before the start of work, and 50% after the final delivery of the project.</p>
  
  <h2>3. Deadlines</h2>
  <p>Deadlines are fixed during the discussion of the technical task and range from 3 to 14 business days depending on the project's complexity.</p>
  
  <h2>4. Guarantees and Support</h2>
  <p>The Contractor guarantees the operability of the created product. Free technical support and bug fixing are provided for 30 days after project delivery (or for a year if an additional support package is ordered).</p>
`;

fs.writeFileSync('privacy.html', makePage('uk', 'Політика конфіденційності', privacyUk, '/', 'Назад на головну', 'privacy'));
fs.writeFileSync('terms.html', makePage('uk', 'Договір публічної оферти', termsUk, '/', 'Назад на головну', 'terms'));

if (!fs.existsSync('en')) fs.mkdirSync('en');
fs.writeFileSync('en/privacy.html', makePage('en', 'Privacy Policy', privacyEn, '/en', 'Back to home', 'privacy'));
fs.writeFileSync('en/terms.html', makePage('en', 'Terms of Service', termsEn, '/en', 'Back to home', 'terms'));

function replaceFooterLinks(file, pText, pLink, tText, tLink) {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  let newDiv = `<div style="display:flex;gap:20px;font-size:13px;">
      <a href="${pLink}" style="text-decoration:underline;">${pText}</a>
      <a href="${tLink}" style="text-decoration:underline;">${tText}</a>
    </div>`;
  
  c = c.replace(/<div style="display:flex;gap:20px;font-size:13px;">[\s\S]*?<\/div>/, newDiv);
  fs.writeFileSync(file, c);
}

replaceFooterLinks('index.html', 'Політика конфіденційності', '/privacy', 'Договір оферти', '/terms');
replaceFooterLinks('en/index.html', 'Privacy Policy', '/en/privacy', 'Terms of Service', '/en/terms');
