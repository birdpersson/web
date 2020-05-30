package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Admin;

public class AdminDAO {
	private HashMap<String, Admin> admins = new HashMap<String, Admin>();

	public AdminDAO() {

	}

	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Moze se pristupiti samo iz servleta.
	 */
	public AdminDAO(String contextPath) {
		loadAdmins(contextPath);
	}

	/**
	 * Vraca korisnika za prosledjeno korisnicko ime i sifru. Vraca null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public Admin find(String username, String password) {
		if (!admins.containsKey(username))
			return null;
		Admin admin = admins.get(username);
		if (!admin.getPassword().contentEquals(password))
			return null;
		return admin;
	}

	public Collection<Admin> findAll() {
		return admins.values();
	}

	/***
	 * Vraca admina na osnovu njegovog id-a.
	 * @return Admin sa id-em ako postoji, u suprotnom null
	 */
	public Admin findOne(String id) {
		return admins.containsKey(id) ? admins.get(id) : null;
	}

	public Admin update(String id, Admin updatedAdmin) {
		Admin oldAdmin = findOne(id);

		if (oldAdmin == null) {
			System.out.println("Specifikacija ne dozvoljava kreiranje admina");
			return null;
		} else {
			oldAdmin.setPassword(updatedAdmin.getPassword());
			oldAdmin.setFirstname(updatedAdmin.getFirstname());
			oldAdmin.setLastname(updatedAdmin.getLastname());

			// We save and return old admin which is now updated.
			return admins.put(oldAdmin.getUsername(), oldAdmin);
		}
	}

	public Admin delete(String id) {
		// hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return admins.containsKey(id) ? admins.remove(id) : null;
	}

	/**
	 * Ucitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #hosts}.
	 * Kljuc je username proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadAdmins(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/admins.txt");
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
					admins.put(username, new Admin(username, password, firstname, lastname, gender));
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
