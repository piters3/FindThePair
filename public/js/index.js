var imgs = document.querySelectorAll("img"), info = document.querySelector("#info"), resetBtn = document.querySelector("button"), content = document.querySelector("#content"), clicked = false, alt1, alt2, div1 = null, div2 = null, success = 0, counter = 0, p = document.querySelector("p"), text, nick;
function enterName() {
    var centerDiv = document.createElement("div");
    centerDiv.classList.add("centerDiv");
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Wpisz nick";
    var acceptBtn = document.createElement("button");
    acceptBtn.innerHTML = "Graj";
    centerDiv.appendChild(input);
    centerDiv.appendChild(acceptBtn);
    document.body.appendChild(centerDiv);
    acceptBtn.onclick = function () {
        nick = input.value;
        centerDiv.style.display = "none";
    };
}
function createCover() {
    var dc = document.createDocumentFragment();
    for (var i = 0; i < imgs.length; i++) {
        var div = document.createElement("div");
        div.classList.add("cover");
        dc.appendChild(div);
    }
    document.querySelector("#content").appendChild(dc);
    for (var i = 0; i < imgs.length; i++) {
        var divs = document.querySelectorAll(".cover");
        divs[i].appendChild(imgs[i]);
    }
}
;
function showAllImages() {
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.display = "block";
    }
    setTimeout(function () {
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.display = "none";
        }
    }, 2500);
}
;
function showImg() {
    this.firstChild.style.display = "block";
}
function hideImg(img) {
    img.style.display = "none";
}
function checkParity() {
    if (!clicked) {
        div1 = this;
        alt1 = this.firstChild.alt;
        clicked = true;
    }
    else if (clicked) {
        div2 = this;
        alt2 = this.firstChild.alt;
        counter++;
        clicked = false;
        if (alt1 === alt2) {
            if (div1 === div2) {
                setTimeout(function () {
                    hideImg(div1.firstChild);
                    hideImg(div2.firstChild);
                }, 500);
            }
            else {
                setTimeout(function () {
                    div1.classList.add("clicked");
                    div2.classList.add("clicked");
                    hideImg(div1.firstChild);
                    hideImg(div2.firstChild);
                }, 500);
                div1.removeEventListener("click", showImg, false);
                div2.removeEventListener("click", showImg, false);
                success++;
            }
        }
        else if (alt1 !== alt2) {
            setTimeout(function () {
                hideImg(div1.firstChild);
                hideImg(div2.firstChild);
            }, 500);
        }
    }
}
function updateInfo() {
    text = "Znalaz\u0142e\u015B " + success + " z 12 par w " + counter + " pr\u00F3bach";
    p.innerHTML = text;
}
function shuffleImgs() {
    var order = [];
    for (var i = 0; i < imgs.length; i++) {
        order.push(parseInt(imgs[i].alt));
    }
    order.sort(function (a, b) {
        var random1 = Math.round(Math.random() * (10 - 1) + 1), random2 = Math.round(Math.random() * (10 - 1) + 1);
        return random1 - random2;
    });
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = 'img/' + order[i] + '.jpg';
        imgs[i].alt = '' + order[i];
    }
}
function resetGame() {
    clicked = false;
    success = 0;
    counter = 0;
    shuffleImgs();
    updateInfo();
    showAllImages();
    addListeners();
    var divs = document.querySelectorAll(".cover");
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("clicked");
        // divs[i].addEventListener("click", showImg, false);
    }
}
function addListeners() {
    var divs = document.querySelectorAll(".cover");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", showImg, false);
        divs[i].addEventListener("click", checkParity, false);
        divs[i].addEventListener("click", updateInfo, false);
    }
}
(function init() {
    enterName();
    shuffleImgs();
    createCover();
    showAllImages();
    addListeners();
})();
resetBtn.onclick = resetGame;
