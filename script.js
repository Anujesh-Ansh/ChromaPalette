console.log("Hello hi, here we start");

const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-color") || "[]");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
};

const showColors = () => {
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background:${color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
    `).join("");

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
};

showColors();

const activateEyeDropper = async () => {
    document.body.style.display = "none"; // to hide the extension drop down option
    
    if (!window.EyeDropper) {
        console.log("Your browser doesn't support the Eye Dropper API.");
        alert("Doesn't Supports ur Browser");
        return;
    }

    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex); // to copy the selected color to the ClipBoard

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-color", JSON.stringify(pickedColors));
            showColors();
        }
        console.log(pickedColors);
        // alert(sRGBHex);
        // Use the picked color
    } catch (error) {
        console.error("Error using Eye Dropper API:", error);
    }
    
    document.body.style.display = "block"; // to show the extension drop down option
};

const clearAllColors = () => {
    localStorage.removeItem("picked-color");
    pickedColors.length = 0;
    console.log("Removed");
    showColors();
    console.log("Display se bhi gaya");
};

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);
