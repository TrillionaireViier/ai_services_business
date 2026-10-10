const fs = require('fs');

const css = `
:root{--bg:#0a0f1c;--panel:#111a2e;--line:#22304d;--text:#e8edf7;--mut:#8d9bb8;--acc:#3dffa2;--acc2:#4d8bff;--r:14px}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--text);font:400 16px/1.6 Onest,sans-serif;padding:0;margin:0;}
header{padding:20px;border-bottom:1px solid var(--line);display:flex;align-items:center;background:var(--panel);position:sticky;top:0;z-index:100;}
.logo{font:700 20px Unbounded,sans-serif;color:var(--text);text-decoration:none;}
.logo i{color:var(--acc);font-style:normal}
section{padding:60px 20px;border-bottom:1px solid var(--line);}
.container{max-width:900px;margin:0 auto;}
h1,h2,h3{font-family:Unbounded,sans-serif;color:var(--text);margin-bottom:20px;}
h1{font-size:36px;color:var(--acc);}
h2{font-size:28px;}
.desc{font-size:18px;color:var(--mut);margin-bottom:30px;}
.card{background:var(--panel);padding:30px;border-radius:12px;border:1px solid var(--line);margin-bottom:30px;}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:30px;}
.stat{background:var(--bg);padding:20px;border-radius:10px;text-align:center;}
.stat-val{font-size:32px;font-family:Unbounded,sans-serif;color:var(--acc2);margin-bottom:5px;}
.stat-lbl{color:var(--mut);font-size:14px;}
.btn{background:var(--acc);color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;cursor:pointer;border:none;}
.btn:hover{filter:brightness(1.1);}
footer{padding:30px 20px;text-align:center;color:var(--mut);font-size:14px;}
`;

function makeCase(lang, data, t) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${data.title} — ${t.caseStudy}</title>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header>
  <a href="${t.homeLink}" class="logo">Gotovo<i>.</i></a>
  <a href="${t.homeLink}" style="margin-left:auto;color:var(--mut);text-decoration:none;">← ${t.back}</a>
</header>

<section style="padding-top:80px;padding-bottom:80px;background:var(--panel);">
  <div class="container">
    <div style="display:inline-block;padding:5px 12px;background:rgba(61,255,162,0.1);color:var(--acc);border-radius:20px;font-size:14px;margin-bottom:20px;">${data.tag}</div>
    <h1>${data.title}</h1>
    <p class="desc">${data.desc}</p>
    
    <div class="grid">
      <div class="stat">
        <div class="stat-val">${data.s1v}</div>
        <div class="stat-lbl">${data.s1l}</div>
      </div>
      <div class="stat">
        <div class="stat-val">${data.s2v}</div>
        <div class="stat-lbl">${data.s2l}</div>
      </div>
      <div class="stat">
        <div class="stat-val">${data.s3v}</div>
        <div class="stat-lbl">${data.s3l}</div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>${t.challenge}</h2>
    <p style="color:var(--mut);line-height:1.7;font-size:18px;">${data.challenge}</p>
  </div>
</section>

<section style="background:var(--panel);">
  <div class="container">
    <h2>${t.solution}</h2>
    <p style="color:var(--mut);line-height:1.7;font-size:18px;">${data.solution}</p>
  </div>
</section>

<section>
  <div class="container" style="text-align:center;">
    <h2 style="color:var(--acc);">${t.wantSame}</h2>
    <p class="desc">${t.readyDesc}</p>
    <a href="${t.homeLink}#contact" class="btn" style="font-size:20px;padding:15px 40px;">${t.orderNow}</a>
  </div>
</section>

<footer>
  <div class="container">
    © 2026 Gotovo. ${t.allRights}
  </div>
</footer>
</body>
</html>`;
}

const tUk = {
  caseStudy: 'Кейс', homeLink: '/', back: 'Назад на головну', orderNow: 'Замовити проєкт',
  challenge: 'Задача (Що було потрібно)', solution: 'Рішення (Що ми зробили)',
  wantSame: 'Хочете такий самий результат?', readyDesc: 'Залиште заявку, і ми розробимо продукт спеціально для вашого бізнесу.',
  allRights: 'Усі права захищено.'
};

const tEn = {
  caseStudy: 'Case Study', homeLink: '/en', back: 'Back to home', orderNow: 'Order Project',
  challenge: 'The Challenge', solution: 'Our Solution',
  wantSame: 'Want similar results?', readyDesc: 'Leave a request, and we will build a product specifically for your business.',
  allRights: 'All rights reserved.'
};

const casesUk = [
  {
    title: 'Магазин кави «Зерно»', desc: 'Інтернет-магазин з оплатою онлайн. Запуск за 6 днів, перші замовлення в день старту.', tag: 'E-commerce',
    s1v: '6 днів', s1l: 'Час на розробку', s2v: '+34%', s2l: 'Ріст конверсії', s3v: 'Apple Pay', s3l: 'Онлайн оплати',
    challenge: 'Клієнт продавав каву через Instagram, але обробка замовлень вручну займала багато часу. Потрібен був сучасний магазин з кошиком, автоматичним розрахунком доставки та оплатою.',
    solution: 'Ми розробили швидкий інтернет-магазин на базі нашого готового рішення. Додали інтеграцію з платіжною системою та Новою Поштою. Тепер клієнти купують у 3 кліки, а власник просто відправляє замовлення.'
  },
  {
    title: 'Барбершоп «Борода»', desc: 'Лендинг із записом через Telegram-бота. Адміністратор більше не сидить на телефоні.', tag: 'Лендинг + Бот',
    s1v: '4 дні', s1l: 'До запуску', s2v: '80%', s2l: 'Записів онлайн', s3v: '24/7', s3l: 'Робота бота',
    challenge: 'Адміністратор барбершопу постійно відволікався на дзвінки для запису клієнтів. Клієнти скаржились, що іноді важко додзвонитися.',
    solution: 'Ми створили стильний лендинг з кнопкою "Записатися". Кнопка веде у Telegram-бота, де клієнт сам обирає майстра, послугу та вільний час. Бот автоматично нагадує про візит за 2 години.'
  },
  {
    title: 'Логістична компанія', desc: 'Корпоративний сайт із CRM-інтеграцією. Заявки потрапляють прямо менеджерам.', tag: 'Корпоративний сайт',
    s1v: '12 днів', s1l: 'Загальний час', s2v: 'CRM', s2l: 'Повна інтеграція', s3v: '0', s3l: 'Втрачених лідів',
    challenge: 'Компанія мала застарілий сайт, який не викликав довіри у великих B2B клієнтів. Заявки приходили на пошту і губилися.',
    solution: 'Ми оновили дизайн сайту, зробили його солідним і зручним. Всі форми захоплення лідів безпосередньо підключили до CRM-системи клієнта. Кожна заявка автоматично створює угоду і призначається на вільного менеджера.'
  }
];

const casesEn = [
  {
    title: 'Coffee Shop "Zerno"', desc: 'E-commerce with online payment. Launched in 6 days, first orders on launch day.', tag: 'E-commerce',
    s1v: '6 days', s1l: 'Development time', s2v: '+34%', s2l: 'Conversion growth', s3v: 'Apple Pay', s3l: 'Online payments',
    challenge: 'The client sold coffee via Instagram, but manual order processing took too much time. They needed a modern store with a shopping cart, automatic delivery calculation, and online payments.',
    solution: 'We developed a fast e-commerce site based on our turnkey solution. Added integration with the payment gateway and delivery services. Now customers buy in 3 clicks, and the owner just ships the orders.'
  },
  {
    title: 'Barbershop "Boroda"', desc: 'Landing page with Telegram bot booking. Admin no longer sits on the phone.', tag: 'Landing + Bot',
    s1v: '4 days', s1l: 'Time to launch', s2v: '80%', s2l: 'Online bookings', s3v: '24/7', s3l: 'Bot uptime',
    challenge: 'The barbershop admin was constantly distracted by phone calls to book clients. Customers complained it was sometimes hard to get through.',
    solution: 'We created a stylish landing page with a "Book Now" button. The button leads to a Telegram bot where the client chooses the barber, service, and available time themselves. The bot automatically sends a reminder 2 hours before the visit.'
  },
  {
    title: 'Logistics Company', desc: 'Corporate site with CRM integration. Leads go straight to managers.', tag: 'Corporate Site',
    s1v: '12 days', s1l: 'Total time', s2v: 'CRM', s2l: 'Full integration', s3v: '0', s3l: 'Lost leads',
    challenge: 'The company had an outdated website that did not inspire trust in large B2B clients. Requests were sent to email and often got lost.',
    solution: "We updated the website design, making it solid and user-friendly. All lead capture forms were directly connected to the client's CRM system. Every request automatically creates a deal and is assigned to an available manager."
  }
];

casesUk.forEach((c, i) => fs.writeFileSync(`case-${i}.html`, makeCase('uk', c, tUk)));
if (!fs.existsSync('en')) fs.mkdirSync('en');
casesEn.forEach((c, i) => fs.writeFileSync(`en/case-${i}.html`, makeCase('en', c, tEn)));

console.log('Cases generated');

// Update index.html and en/index.html to wrap the cards in <a> tags
function updateIndex(file, prefix) {
  let c = fs.readFileSync(file, 'utf8');
  // Card 0
  c = c.replace(/<div class="card port"><div class="shot"><\/div><h3>(Магазин кави «Зерно»|Coffee Shop "Zerno")<\/h3><p>[^<]+<\/p><\/div>/, 
    `<a href="${prefix}case-0" class="card port" style="text-decoration:none;transition:transform 0.2s;"><div class="shot"></div><h3>$1</h3><p>Інтернет-магазин з оплатою онлайн. Запуск за 6 днів, перші замовлення в день старту.</p></a>`);
    
  // Since replace string might contain ukrainian when in english, let's do a more robust replace
  c = c.replace(/<div class="card port">([\\s\\S]*?)<\/div>/g, (match, inner) => {
    if (inner.includes('Zerno') || inner.includes('Зерно')) return `<a href="${prefix}case-0" class="card port" style="text-decoration:none;transition:transform 0.2s;">${inner}</a>`;
    if (inner.includes('Boroda') || inner.includes('Борода')) return `<a href="${prefix}case-1" class="card port" style="text-decoration:none;transition:transform 0.2s;">${inner}</a>`;
    if (inner.includes('Logistics') || inner.includes('Логістична')) return `<a href="${prefix}case-2" class="card port" style="text-decoration:none;transition:transform 0.2s;">${inner}</a>`;
    return match;
  });
  
  fs.writeFileSync(file, c);
}

updateIndex('index.html', '/');
updateIndex('en/index.html', '/en/');
