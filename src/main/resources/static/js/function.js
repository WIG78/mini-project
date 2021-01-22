function checkPerso(nameCookieIndex, findValuecookie, linkCharacter, menu_action) {
    if(document.cookie.indexOf(nameCookieIndex) != -1 && findValueCookie(findValuecookie) != "")
    {
        document.getElementById(linkCharacter).innerHTML = findValueCookie(findValuecookie) + " (" + findValueCookie('HP') + "pv)";
        document.getElementById(menu_action).hidden = false;
    }
}

function checkFoe(nameCookieIndex, findValuecookie, linkFoe) {
    if(document.cookie.indexOf(nameCookieIndex) != -1 && findValueCookie(findValuecookie) != "")
    {
        document.getElementById(linkFoe).innerHTML = findValueCookie(findValuecookie) + " (" + findValueCookie('foeHP') + "pv)";
    }
}

function checkHPPersoForm(hpCookieIndex, findValueCookieHP, formElement, koElement, findValueCookieFoeNumber) {
    if(document.cookie.indexOf(hpCookieIndex) != -1 && findValueCookie(findValueCookieHP) != "")
    {
        if(findValueCookie(findValueCookieHP) <= 0)
        {
            console.log(findValueCookie(findValueCookieFoeNumber));
            console.log(findValueCookieFoeNumber);
            document.getElementById(formElement).hidden = true;
            document.getElementById(koElement).innerHTML = "Vous êtes KO ! Vous avez battu : " + findValueCookie(findValueCookieFoeNumber) + " adversaire(s).";
            return true;
        }
        return false;
    }
}

function checkHPPerso(hpCookieIndex, findValueCookieHP, koElement, findValueCookieFoeNumber) {
    if(document.cookie.indexOf(hpCookieIndex) != -1 && findValueCookie(findValueCookieHP) != "")
    {
        if(findValueCookie(findValueCookieHP) <= 0)
        {
            document.getElementById(koElement).innerHTML = "Vous êtes KO ! Vous avez battu : " + findValueCookie(findValueCookieFoeNumber) + " adversaire(s).";
            return true;
        }
        return false;
    }
}

function checkHPFoeForm(foeHPCookieIndex, findValueCookieFoeHP, formElement, combattreElement, nextFoeElement, koElement) {
    if(document.cookie.indexOf(foeHPCookieIndex) != -1 && findValueCookie(findValueCookieFoeHP) != "")
    {
        if(findValueCookie(findValueCookieFoeHP) <= 0)
        {
            document.getElementById(formElement).hidden = true;
            document.getElementById(combattreElement).hidden = true;
            document.getElementById(nextFoeElement).hidden = false;
            document.getElementById(koElement).innerHTML = "Votre adversaire est KO !";
            return true;
        }
        return false;
    }
}

function checkHPFoe(foeHPCookieIndex, findValueCookieFoeHP, combattreElement, nextFoeElement) {
    if(document.cookie.indexOf(foeHPCookieIndex) != -1 && findValueCookie(findValueCookieFoeHP) != "")
    {
        if(findValueCookie(findValueCookieFoeHP) <= 0)
        {
            document.getElementById(combattreElement).hidden = true;
            document.getElementById(nextFoeElement).hidden = false;
            return true;
        }
        return false;
    }
}

function navBarAction() {
    character.onclick = function() {
        $("#includedContent").load("characterBloc.html");
        document.getElementById('home').className = "disable";
        document.getElementById('character').className = "active";
        document.getElementById('foe').className = "disable";
        document.getElementById('chooseCharacter').className = "disable";
        document.getElementById('combattre').className = "disable";
    }

    foe.onclick = function() {
        $("#includedContent").load("foeMonster.html");
        document.getElementById('home').className = "disable";
        document.getElementById('character').className = "disable";
        document.getElementById('foe').className = "active";
        document.getElementById('chooseCharacter').className = "disable";
        document.getElementById('combattre').className = "disable";
    }

    chooseCharacter.onclick = function() {
        $("#includedContent").load("chooseCharacter.html");
        document.getElementById('home').className = "disable";
        document.getElementById('character').className = "disable";
        document.getElementById('foe').className = "disable";
        document.getElementById('chooseCharacter').className = "active";
        document.getElementById('combattre').className = "disable";
    }

    combattre.onclick = function() {
        $("#includedContent").load("attaque.html");
        document.getElementById('home').className = "disable";
        document.getElementById('character').className = "disable";
        document.getElementById('foe').className = "disable";
        document.getElementById('chooseCharacter').className = "disable";
        document.getElementById('combattre').className = "active";
    }
}

function attack() {
    if(!checkHPPersoForm('HP=', 'HP', 'form', 'KO', 'foeNumber') || checkHPFoeForm('foeHP=', 'foeHP', 'form', 'combattre', 'nextFoe', 'KO'))
    {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/attack', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("onload");
                document.getElementById("information").innerHTML = xhr.responseText;
                console.log(xhr.responseText);
                checkHPFoeForm('foeHP=', 'foeHP', 'form','combattre', 'nextFoe', 'KO');
                checkHPPersoForm('HP=', 'HP', 'form', 'KO', 'foeNumber')
                checkPerso('name=', 'name', "linkCharacter", "menu_action");
                checkFoe('foeName=', 'foeName', 'linkFoe');
            } else {
                alert('Request failed. Returned status of ' + xhr.status);
            }
        };
        xhr.send("dammage=" + document.getElementById("dammage").value);
        console.log('fin fonction');
    }
}