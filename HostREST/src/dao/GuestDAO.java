package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Guest;

public class GuestDAO {
	private HashMap<String, Guest> guests = new HashMap<String, Guest>();

	public GuestDAO() {

	}

	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public GuestDAO(String contextPath) {
		loadGuests(contextPath);
	}

	/**
	 * Vraca korisnika za prosledjeno korisnicko ime i sifru. Vraca null ako korisnik ne postoji
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public Guest find(String username, String password) {
		if (!guests.containsKey(username))
			return null;
		Guest guest = guests.get(username);
		if (!guest.getPassword().contentEquals(password))
			return null;
		return guest;
	}

	/***
	 * Vraca sve goste.
	 * 
	 * @return
	 */
	public Collection<Guest> findAll() {
		return guests.values();
	}

	/***
	 * Vraca gosta na osnovu njegovog id-a.
	 * 
	 * @return Gost sa id-em ako postoji, u suprotnom null
	 */
	public Guest findOne(String id) {
		return guests.containsKey(id) ? guests.get(id) : null;
	}

	/***
	 * Dodaje domacina u mapu proizvoda. Id novog domacina ce biti postavljen na maxPostojeciId + 1.
	 * 
	 * @param domacin
	 * @return Novi domacin
	 */
	public Guest save(Guest guest) {
		Integer maxId = -1;
		for (String id : guests.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		guest.setId(maxId.toString());
		guests.put(guest.getId(), guest);
		return guest;
	}

	/***
	 * Vrsi izmenu atributa domacina u mapi domacina. Id izmenjenog domacina ce imati istu vrednost kao i stari domacin.
	 * 
	 * @param Id domacina koji se zeli izmeniti, novi domacin sa izmenjenim
	 *           atributima
	 * @return Izmenjeni domacin
	 */
	public Guest update(String id, Guest updatedGuest) {

		// We retrive host based on id we received as argument.
		Guest oldGuest = findOne(id);

		// if there is not host with such id we save that product as new one.
		if (oldGuest == null) {
			System.out.println("Usao u save host u okviru update");
			return save(updatedGuest);
		} else {
			System.out.println("usao u update product u okviru update");
			// We don't change id of existing guest just username, password, firstname and
			// lastname.
			oldGuest.setUsername(updatedGuest.getUsername());
			oldGuest.setPassword(updatedGuest.getPassword());
			oldGuest.setFirstname(updatedGuest.getFirstname());
			oldGuest.setLastname(updatedGuest.getLastname());
//			oldHost.setLastname(updatedHost.getApartments()); ?? Not here... In apartment class we change id of host.

			// We save old guest which is now updated.
			return guests.put(oldGuest.getId(), oldGuest);
		}

	}

	/**
	 * Pretrazuje domacine iz WebContent/hosts.txt fajla i brise ih ako ih nadje.
	 * 
	 * @return obirsanog domacina u protivnom null
	 * @param id domacina koji je kljuc
	 */
	public Guest delete(String id) {
		// guests.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return guests.containsKey(id) ? guests.remove(id) : null;
	}

	/**
	 * Ucitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #hosts}.
	 * Kljuc je id proizovda.
	 * 
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadGuests(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/guests.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "";
			String username = "";
			String password = "";
			String firstname = "";
			String lastname = "";
			String gender = "";

			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = st.nextToken().trim();
					username = st.nextToken().trim();
					password = st.nextToken().trim();
					firstname = st.nextToken().trim();
					lastname = st.nextToken().trim();
					gender = st.nextToken().trim();
				}
				guests.put(id, new Guest(id, username, password, firstname, lastname, gender));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
				}
			}
		}
	}
}
