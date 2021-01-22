function checkPerso(nameCookieIndex, findValuecookie, linkCharacter, menu_action) {
    if(document.cookie.indexOf(nameCookieIndex) != -1 && findValueCookie(findValuecookie) != "")
    {
        document.getElementById(linkCharacter).innerHTML = findValueCookie(findValuecookie);
        document.getElementById(menu_action).hidden = false;
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
    }

    chooseCharacter.onclick = function() {
        $("#includedContent").load("chooseCharacter.html");
    }

    combattre.onclick = function() {
        $("#includedContent").load("attaque.html");
    }
}