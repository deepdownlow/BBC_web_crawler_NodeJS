const rp = require("request-promise");
const cheerio = require("cheerio");
const table = require("cli-table");
const readline = require("readline-sync");
const date = new Date();
const datePrint = date.toString().slice(0, 10);
const chooseMenu = language => {
  if (language === "english") {
    console.log(`\nPlease choose from the menu\n`);
    const menuArr = ["Home(for home just hit enter)", "Sport", "Capital"];
    const menu = menuArr.map(item => console.log(`${item.toString()}\n`));
    const choice = readline.question("\nchoose a category: \n").toLowerCase();
    if (choice !== ''&&'sport'&&'capital') {
      console.log('invalid menu item')
      return chooseMenu(language);
    }
    return choice;
  } else if (language === "french") {
    console.log(`\nS'il vous plaît choisir dans le menu\n`);
    const menuArr = [
      `Maison(pour la maison, appuyez simplement sur Entrée)`,
      "Sports",
      "Monde"
    ];
    const menu = menuArr.map(item => console.log(`${item.toString()}\n`));
    const choice = readline
      .question("\nchoisissez une catégorie: \n")
      .toLowerCase();
      if (choice !== ''&&'sports'&&'monde') {
        console.log('élément de menu invalide')
        return chooseMenu(language);
      }
    return choice;
  } else if (language === "persian") {
    console.log(`\nلطفا از منو انتخاب کنید\n`);
    const menuArr = ["خانه (برای خانه فقط ضربه وارد کنید)", "(sport)ورزش", "(world)جهان"];
    const menu = menuArr.map(item => console.log(`${item.toString()}\n`));
    const choice = readline.question("\nیک دسته را انتخاب کنید: \n").toLowerCase();
    if (choice !== ''||'sport'||'world') {
      console.log('آیتم منوی نامعتبر')
      return chooseMenu(language);
    }
    return choice;
  }
};
const repeat = language => {
  if(language === 'english') {
    if (readline.keyInYN("\nWould like to continue?\n")) {
      return start();
    } else {
      console.log("\nThank you for your time and have a nice day\n");
    }
  } else if (language === 'french') {
    if (readline.keyInYN(`\nVoudrais continuer?\n`)) {
      return start();
    } else {
      console.log("\nMerci pour votre temps et bonne journée\n");
    }
  } else if (language === 'persian') {
    if (readline.keyInYN(`\nمیخواهم ادامه بدم?\n`)) {
      return start();
    } else {
      console.log("\nشما را برای وقت خود و روز خوبی داشته باشید\n");
    }
  } 
};
const init = language => {
  const choice = chooseMenu(language);
  if (language === "english") {
    const option = {
      url: `http://www.bbc.com/${choice}`,
      transform: body => cheerio.load(body),
      json: true
    };
    if (choice === "sport") {
      console.log("Please Wait while we process your request...");
      rp(option)
        .then($ => {
          if (readline.keyInYN("Would you like to do a keyword search? ")) {
            const keyWord = readline
              .question("enter a keyword: ")
              .toLowerCase();
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(datePrint);
            $("span.lakeside__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Not Found!");
            }
          } else {
            console.log(`\n${datePrint} Sport's Headlines\n`);
            $("span.lakeside__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "") {
      console.log("Please Wait while we process your request...");
      rp(option)
        .then($ => {
          if (readline.keyInYN("Would you like to do a keyword search? ")) {
            const keyWord = readline.question("Enter your keyword: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("a.media__link").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Not Found !");
            }
          } else {
            console.log(`\n${datePrint} Headlines\n`);
            $("a.media__link").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "capital") {
      console.log("Please Wait while we process your request...");
      rp(option)
        .then($ => {
          if (readline.keyInYN("Would you like to do a keyword search? ")) {
            const keyWord = readline.question("please enter a keyword: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("h3.promo-unit-title").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Not Found!");
            }
          } else {
            console.log(`\n${datePrint} Headlines\n`);
            $("h3.promo-unit-title").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    }
  } else if (language === "french") {
    const option = {
      url: `http://www.bbc.com/afrique/${choice}`,
      transform: body => cheerio.load(body),
      json: true
    };
    if (choice === "sports") {
      console.log("Veuillez patienter pendant que nous accédons à votre requête...");
      rp(option)
        .then($ => {
          if (readline.keyInYN("Voulez-vous faire une recherche par mot clé? ")) {
            const keyWord = readline
              .question(`entrez un mot clé:`)
              .toLowerCase();
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(datePrint);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Pas trouvé!");
            }
          } else {
            console.log(`\n${datePrint} Titres du sport\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "") {
      console.log("Veuillez patienter pendant que nous accédons à votre requête...");
      rp(option)
        .then($ => {
          if (readline.keyInYN(`Voulez-vous faire une recherche par mot clé? `)) {
            const keyWord = readline.question("Entrez votre mot clé: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Pas trouvé!");
            }
          } else {
            console.log(`\n${datePrint} Titres\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "monde") {
      console.log("Veuillez patienter pendant que nous accédons à votre requête...");
      rp(option)
        .then($ => {
          if (readline.keyInYN(`Voulez-vous faire une recherche par mot clé? `)) {
            const keyWord = readline.question("veuillez entrer un mot clé: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("Pas trouvé!");
            }
          } else {
            console.log(`\n${datePrint} Titres\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    }
  } else if (language === "persian") {
    const option = {
      url: `http://www.bbc.com/persian/${choice}`,
      transform: body => cheerio.load(body),
      json: true
    };
    if (choice === "sport") {
      console.log("لطفا صبر کنید...");
      rp(option)
        .then($ => {
          if (readline.keyInYN("آیا به جستجوی کلمه کلیدی علاقه دارید؟ ")) {
            const keyWord = readline
              .question(`لطفا کلمه کلیدی را وارد کنید:`)
              .toLowerCase();
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(datePrint);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("پیدا نشد!");
            }
          } else {
            console.log(`\n${datePrint} سر فصل ها\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "") {
      console.log("لطفا صبر کنید تا درخواست شما را پردازش کنیم...");
      rp(option)
        .then($ => {
          if (readline.keyInYN(`آیا میخواهید یک جستجوی کلیدواژه را انجام دهید؟ `)) {
            const keyWord = readline.question("لطفا کلمه کلیدی را وارد کنید: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("پیدا نشد!");
            }
          } else {
            console.log(`\n${datePrint} سرفصل ها\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    } else if (choice === "world") {
      console.log("لطفا صبر کنید تا درخواست شما را پردازش کنیم...");
      rp(option)
        .then($ => {
          if (readline.keyInYN(`آیا میخواهید یک جستجوی کلیدواژه را انجام دهید؟ `)) {
            const keyWord = readline.question("لطفا کلمه کلیدی را وارد کنید: ");
            const regex = new RegExp(keyWord);
            let found = false;
            console.log(`\n${datePrint}\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim()
                .toLowerCase();
              if (regex.test(title)) {
                console.log(`${i + 1}: ${title}`);
                found = true;
              }
            });
            if (!found) {
              console.log("پیدا نشد!");
            }
          } else {
            console.log(`\n${datePrint} سرفصل ها\n`);
            $("span.title-link__title-text").each((i, el) => {
              let title = $(el)
                .text()
                .trim();
              console.log(`${i + 1}: ${title}`);
            });
          }
          return repeat(language);
        })
        .catch(err => console.log(err));
    }
  }
};
const start = () => {
  console.log("Choose a language to begin\n");
  const lanArr = ["English", "French","Persian"];
  const menuLan = lanArr.map(item => console.log(`${item.toString()}\n`));
  const lan = readline.question("Enter your language: ").toLowerCase();
  if (lan !== 'english'&&'french'&&'persian'){
    console.log('Please enter a valid menu item')
    return start();
  }
  else if (lan === "") {
    console.log("\nPlease enter a language to proceed");
    return start();
  } else if (lan === "english") {
    init(lan);
  } else if (lan === "french") {
    init(lan);
  } else if (lan === 'persian') {
    init(lan);
  }
};
console.log("\nWelcome to BBC Web Crawler App\n");
start();
