let body = document.querySelector('body');
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.createElement('footer');
let copyright = document.createElement('p');

copyright.innerHTML = `\u00A9 ${thisYear} Jeffrey Cheung`;
footer.appendChild(copyright);

let skills = [ "HTML", "CSS", "JavaScript"];
let skillsSections = document.querySelector("#Skills");
let skillsList = document.querySelector("#Skills > ul");

for(let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

body.append(footer);