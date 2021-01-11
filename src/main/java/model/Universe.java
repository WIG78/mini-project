package model;

import java.util.ArrayList;

public class Universe {

	private static ArrayList<Character> characters = new ArrayList<Character>();
	private static ArrayList<Character> monsters = new ArrayList<Character>();

	public static ArrayList<Character> getCharacters() {
		return characters;
	}
	
	public static ArrayList<Character> getMonsters() {
		return monsters;
	}

	public static void creation() {
		Character nain = new Character();
		nain.setName("Gimli");
		nain.setHpMax(150);
		nain.setAttack(25);
		characters.add(nain);

		Character elf = new Character();
		elf.setName("Legolas");
		elf.setHpMax(30);
		elf.setAttack(15);
		elf.setDodgeProbability(0.5);
		characters.add(elf);

		Character rat = new Character();
		rat.setName("rat");
		rat.setHpMax(20);
		rat.setAttack(2);
		monsters.add(rat);

		Character gobelin = new Character();
		gobelin.setName("gobelin");
		gobelin.setHpMax(80);
		gobelin.setAttack(10);
		monsters.add(gobelin);		

		Character dragon = new Character("dragon", 3000, 100);
		monsters.add(dragon);

	}

}
