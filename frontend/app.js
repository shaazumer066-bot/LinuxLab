const terminal = document.getElementById("terminal");
const commandinput = document.getElementById("commandinput");
let currentinput = "";

commandinput.focus();

document.addEventListener("keydown", async (event) => {

    if (event.key !== "Enter")
    {
        return
    }

    const command = commandinput.value.trim();
    
    if(!command)
    {
        return;
    }

    commandinput.value = "";
    addline(`student@linuxlab:~$ ${command}`);

    try{
        const response = await fetch("/api/terminal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                command: command
            })
        });

        if(!response.ok){
            addline(`Error: Server returned ${response.status}`);
            return;
        }

        const data = await response.json();
        addline(data.output);
    } catch(error) {
        addline(`Error: ${error.message}`);
    }

    commandinput.focus();
    terminal.scrollTop = terminal.scrollHeight;

});

function addline(text) {
    const line = document.createElement("div");
    line.className = "terminalline";
    line.textContent = text;
    terminal.insertBefore(line, commandinput.parentElement);
}