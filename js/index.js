let body = document.querySelector("body");
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.createElement("footer");
let copyright = document.createElement("p");

copyright.innerHTML = `\u00A9 ${thisYear} Jeffrey Cheung`;
footer.appendChild(copyright);

let skills = ["HTML", "CSS", "JavaScript"];
let skillsSections = document.querySelector("#Skills");
let skillsList = document.querySelector("#Skills > ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

body.append(footer);

let messageForm = document.querySelector("form[name='leave_message']");
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    console.log(`${name} ${email} ${message}`);

    let messageSection = document.querySelector("section#messages");
    let messageList = document.querySelector("section#messages > ul");
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span>${message}</span>`;
    let removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", event => {
        let entry = event.target.parentNode;
        entry.remove();
    })
    let editButton = document.createElement("button");
    editButton.innerText = "edit";
    let editBox;
    editButton.addEventListener("click", event => {
        let entry = event.target.parentNode;
        if (!editBox) {
            editBox = document.createElement("textarea");
            editBox.value = entry.childNodes[1].innerText;
            entry.appendChild(editBox);
            editButton.innerText = "save";
            return;
        }
        entry.childNodes[1].innerText = entry.lastChild.value;
        entry.lastChild.remove();
        editBox = undefined;
        editButton.innerText = "edit";
    })
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    event.target.reset();
})

let messageList = document.querySelector("section#messages > ul");

let onMessageListChange = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            if (mutation.target.hasChildNodes()) {
                mutation.target.parentNode.style = "display: block;";
            } else {
                mutation.target.parentNode.style = "display: none;";
            }
        }
    }
}

let observer = new MutationObserver(onMessageListChange);

observer.observe(messageList, { childList: true });

// Initialize the message section
onMessageListChange([{ target: messageList, type: "childList" }]);

// Initialize the project section
(() => {
    let projectList = document.querySelector("section#Projects > ul");
    fetch("https://api.github.com/users/CHEUNG-K-Jeffrey/repos?sort=created")
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(repo => {
            let projectEntry = document.createElement("li");
            projectEntry.innerHTML = `<a href="${repo.html_url}">${repo.name}</a><div>${repo.description ?? "No description found"}</div>`;
            projectList.appendChild(projectEntry);
        })
    })
    .catch(error => {
        let projectEntry = document.createElement("li");
        projectEntry.innerText = `An error occurred: ${error}`;
        projectList.appendChild(projectEntry);
        console.error(projectEntry.innerText);
    })
})();