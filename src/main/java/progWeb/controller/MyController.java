package progWeb.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import model.Character;
import model.Universe;

@Controller
public class MyController {

	@RequestMapping(value = "/character", method = RequestMethod.POST)
	public void choiceCharacter(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String charName = request.getParameter("name");
		Character chosen = null;
		ArrayList<Character> chars = Universe.getCharacters();
		for (Character c : Universe.getCharacters()) {
			if (c.getName().equals(charName)) {
				chosen = c;
			}
		}
		if (chosen != null) {
			response.setHeader("HP", "" + chosen.getHpMax());
			response.setHeader("attack", "" + chosen.getAttack());
			Cookie cookieName = new Cookie("name", charName);
			response.addCookie(cookieName);
			response.addCookie(new Cookie("HP", "" + chosen.getHpMax()));
			response.addCookie(new Cookie("HPMax", "" + chosen.getHpMax()));
			response.addCookie(new Cookie("attack", "" + chosen.getAttack()));
			response.addCookie(new Cookie("dodge", "" + chosen.getDodgeProbability()));
			response.addCookie(new Cookie("nbHits", "" + chosen.getNbHits()));
			response.addCookie(new Cookie("foeNumber", "" + -1));
		}
		response.sendRedirect("/nextFoe");
	}

	@RequestMapping(value = "/attack", method = RequestMethod.POST)
	public void attack(HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException, IOException {

		String damStr = request.getParameter("dammage");

		String result = "";

		System.out.println(damStr);
		if (damStr != null) {
			// Valeur de l'attaque lancé contre foe
			int dammage = Integer.parseInt(damStr);

			// Stats perso
			int hp = 0;
			int nbHits = 0;
			int hpMax = 0;
			double dodge = 0;
			// Stats foe
			int foeHP = 0;
			int foeAttack = 0;
			double foeDodge = 0;

			for (Cookie c : request.getCookies()) {

				if (c.getName().equals("HP")) {
					hp = Integer.parseInt(c.getValue());
				}
				if (c.getName().equals("HPMax")) {
					hpMax = Integer.parseInt(c.getValue());
				}
				if (c.getName().equals("nbHits")) {
					nbHits = Integer.parseInt(c.getValue());
				}
				if (c.getName().equals("dodge")) {
					dodge = Double.parseDouble(c.getValue());
				}

				if (c.getName().equals("foeHP")) {
					foeHP = Integer.parseInt(c.getValue());
				}
				if (c.getName().equals("foeAttack")) {
					foeAttack = Integer.parseInt(c.getValue());
				}
				if (c.getName().equals("foeDodge")) {
					foeDodge = Double.parseDouble(c.getValue());
				}
			}

			double random = Math.random();
			// Test attaque sur personnage
			if(random > dodge){
				hp = (hp - foeAttack > 0) ? hp - foeAttack : 0;
				// Nombre de dégats reçu pour le personnage
				nbHits = (nbHits + foeAttack > hpMax) ? hpMax : nbHits + foeAttack;
				result = result + "Personnage : -" + foeAttack + " pv";
				System.out.println("take");
			}
			else{
				result = result + "Personnage : Esquive" ;
				System.out.println("dodge");
			}

			// Test attaque sur foe
			if(random > foeDodge){
				foeHP = (foeHP - dammage > 0) ? foeHP - dammage : 0;
				result = result + " <br> Ennemi : -" + dammage + " pv" ;
				System.out.println("take");
			}
			else{
				result = result + " <br> Ennemi : Esquive" ;
				System.out.println("dodge");
			}

			response.addCookie(new Cookie("HP", "" + hp));
			response.addCookie(new Cookie("nbHits", "" + nbHits));

			response.addCookie(new Cookie("foeHP", "" + foeHP));
		}
		response.getOutputStream().write(result.getBytes("UTF-8"));
	}

	@RequestMapping(value = "/nextFoe", method = RequestMethod.GET)
	public void nextFoe(HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException, IOException {
		int previousFoe = -1;
		int countKOFoe = 0;
		for (Cookie c : request.getCookies()) {
			if (c.getName().equals("foeNumber")) {
				previousFoe = Integer.parseInt(c.getValue());
			}
			if (c.getName().equals("countKOFoe")) {
				countKOFoe = Integer.parseInt(c.getValue());
			}
		}
		try {
			Character foe = Universe.getMonsters().get(previousFoe + 1);
			response.addCookie(new Cookie("countKOFoe", "" + (countKOFoe + 1)));
			response.addCookie(new Cookie("foeNumber", "" + (previousFoe + 1)));
			response.addCookie(new Cookie("foeName", foe.getName()));
			response.addCookie(new Cookie("foeHP", "" + foe.getHpMax()));
			response.addCookie(new Cookie("foeAttack", "" + foe.getAttack()));
			response.addCookie(new Cookie("foeDodge", "" + foe.getDodgeProbability()));
			response.sendRedirect("/index.html");
		} catch (IndexOutOfBoundsException e) {
			response.getOutputStream().write("Tous les ennemis sont vaincus.".getBytes("UTF-8"));
		}
	}

}
