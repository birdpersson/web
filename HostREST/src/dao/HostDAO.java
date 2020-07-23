package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Host;

public class HostDAO {
	private HashMap<String, Host> hosts = new HashMap<String, Host>();

	public HostDAO() {

	}

	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public HostDAO(String contextPath) {
		loadHoasts(contextPath);
	}

	/**
	 * Vraca korisnika za prosledjeno korisnicko ime i sifru. Vraca null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public Host find(String username, String password) {
		if (!hosts.containsKey(username))
			return null;
		Host host = hosts.get(username);
		if (!host.getPassword().contentEquals(password))
			return null;
		return host;
	}

	/***
	 * Vraca sve domacine.
	 * @return
	 */
	public Collection<Host> findAll() {
		return hosts.values();
	}

	/***
	 * Vraca domacina na osnovu njegovog id-a.
	 * @return Domacin sa id-em ako postoji, u suprotnom null
	 */
	public Host findOne(String id) {
		return hosts.containsKey(id) ? hosts.get(id) : null;
	}

//	/***
//	 * Dodaje domacina u mapu proizvoda. Id novog domacina ce biti postavljen na maxPostojeciId + 1.
//	 * @param domacin
//	 * @return Novi domacin
//	 */
//	public Host save(Host host) {
//		Integer maxId = -1;
//		for (String id : hosts.keySet()) {
//			int idNum = Integer.parseInt(id);
//			if (idNum > maxId) {
//				maxId = idNum;
//			}
//		}
//		maxId++;
//		host.setId(maxId.toString());
//		hosts.put(host.getId(), host);
//		return host;
//	}

	/***
	 * Vrsi izmenu atributa domacina u mapi domacina. Id izmenjenog domacina ce imati istu vrednost kao i stari domacin.
	 * @param Id domacina koji se zeli izmeniti, novi domacin sa izmenjenim atributima
	 * @return Izmenjeni domacin
	 */
	public Host update(String id, Host updatedHost) {

		// We retrive host based on id we received as argument.
		Host oldHost = findOne(id);

		// if there is not host with such id we save that product as new one.
		if (oldHost == null) {
			System.out.println("Usao u save host u okviru update");
			return null;
		} else {
			System.out.println("usao u update product u okviru update");
			// We don't change id of existing host just username, password, firstname and
			// lastname.
			oldHost.setUsername(updatedHost.getUsername());
			oldHost.setPassword(updatedHost.getPassword());
			oldHost.setFirstname(updatedHost.getFirstname());
			oldHost.setLastname(updatedHost.getLastname());
//			oldHost.setLastname(updatedHost.getApartments()); ?? Not here... In apartment class we change id of host.

			// We save old product which is now updated.
			return hosts.put(oldHost.getUsername(), oldHost);
		}

	}

	/**
	 * Pretrazuje domacine iz WebContent/hosts.txt fajla i brise ih ako ih nadje.
	 * 
	 * @return obirsanog domacina u protivnom null
	 * @param id domacina koji je kljuc
	 */
	public Host delete(String id) {
		// hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return hosts.containsKey(id) ? hosts.remove(id) : null;
	}

	/**
	 * Ucitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #hosts}.
	 * Kljuc je id proizovda.
	 * 
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadHoasts(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/hosts.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					String firstname = st.nextToken().trim();
					String lastname = st.nextToken().trim();
					String gender = st.nextToken().trim();
					hosts.put(username, new Host(username, password, firstname, lastname, gender));
				}

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
