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
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
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
	
	/***
	 * Vraca sve administratore.
	 * @return
	 */
	public Collection<Admin> findAll(){
		return admins.values(); 
	}
	
	/***
	 *  Vraca admina na osnovu njegovog id-a. 
	 *  @return Admin sa id-em ako postoji, u suprotnom null
	 */
	public Admin findOne(String id) {
		return admins.containsKey(id) ? admins.get(id) : null;
	}

	
	/***
	 * Dodaje admina u mapu admina. Id novog admina ce biti postavljen na maxPostojeciId + 1.
	 * @param admin
	 * @return Novi admin 
	 */
	public Admin save(Admin admin) {
		Integer maxId= -1;
		for(String id: admins.keySet()) {
			int idNum = Integer.parseInt(id);
			if(idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		admin.setId(maxId.toString());
		admins.put(admin.getId(), admin);
		return admin;
	}
	
	public Admin update(String id, Admin updatedAdmin) {
		
		Admin oldAdmin = findOne(id);
		
		if(oldAdmin == null) {
			System.out.println("Usao u save admina u okviru update");
			return save(updatedAdmin);
		}
		else {
			
			//We don't change id of existing host just username, password, firstname and lastname.
			oldAdmin.setUsername(updatedAdmin.getUsername());
			oldAdmin.setPassword(updatedAdmin.getPassword());
			oldAdmin.setFirstname(updatedAdmin.getFirstname());
			oldAdmin.setLastname(updatedAdmin.getLastname());
			
			//We save and return old admin which is now updated.
			return admins.put(oldAdmin.getId(), oldAdmin);
		}
		
	}
	
	
	public Admin delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return admins.containsKey(id) ? admins.remove(id) : null;
	}
	
	/**
	 * Ucitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #hosts}.
	 * Kljuc je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadAdmins(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/admins.txt");
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
				admins.put(id, new Admin(id, username, password, firstname, lastname, gender));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) {
				}
			}
		}
	}
}
