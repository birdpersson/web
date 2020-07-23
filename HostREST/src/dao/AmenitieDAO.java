package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Amenitie;

public class AmenitieDAO {
	private HashMap<String, Amenitie> amenities = new HashMap<String, Amenitie>(); 
	
	public AmenitieDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	public AmenitieDAO(String contextPath) {
		loadAmenities(contextPath);
	}
	
	/***
	 * Vraca sve administratore.
	 * @return
	 */
	public Collection<Amenitie> findAll(){
		return amenities.values(); 
	}
	
	/***
	 *  Vraca admina na osnovu njegovog id-a. 
	 *  @return Admin sa id-em ako postoji, u suprotnom null
	 */
	public Amenitie findOne(String id) {
		return amenities.containsKey(id) ? amenities.get(id) : null;
	}

	
	/***
	 * Dodaje admina u mapu admina. Id novog admina ce biti postavljen na maxPostojeciId + 1.
	 * @param admin
	 * @return Novi admin 
	 */
	public Amenitie save(Amenitie admin) {
		Integer maxId= -1;
		for(String id: amenities.keySet()) {
			int idNum = Integer.parseInt(id);
			if(idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		admin.setId(maxId.toString());
		amenities.put(admin.getId(), admin);
		return admin;
	}
	
	public Amenitie update(String id, Amenitie updatedAmenitie) {
		
		Amenitie oldAmenitie = findOne(id);
		
		if(oldAmenitie == null) {
			System.out.println("Usao u save admina u okviru update");
			return save(updatedAmenitie);
		}
		else {
			
			//We don't change id of existing host just username, password, firstname and lastname.
			oldAmenitie.setName(updatedAmenitie.getName());
			oldAmenitie.setApartmentId(updatedAmenitie.getApartmentId());
			
			//We save and return old admin which is now updated.
			return amenities.put(oldAmenitie.getId(), oldAmenitie);
		}
		
	}
	
	
	public Amenitie delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return amenities.containsKey(id) ? amenities.remove(id) : null;
	}
	
	/**
	 * Ucitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #hosts}.
	 * Kljuc je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadAmenities(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/amenities.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "";
			ArrayList<String> apartmentsIds = new ArrayList<String>();
			String name= "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = st.nextToken().trim();
					name = st.nextToken().trim();
					apartmentsIds = getListOfApartIds(st.nextToken().trim());
					
				}
				amenities.put(id, new Amenitie(id, apartmentsIds, name));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}

	private ArrayList<String> getListOfApartIds(String trim) {
		ArrayList<String> returnArray = new ArrayList<String>();
		String[] ids = trim.split(",");
		for(int i = 0 ; i<ids.length; i++ ) {
			returnArray.add(ids[i].trim());
		}
		return returnArray;
	}

	public ArrayList<Amenitie> findAllByApartmentId(String id) {
		Collection<Amenitie> allAmenities = findAll();
		ArrayList<Amenitie> returnIds = new ArrayList<Amenitie>();
		for(Amenitie a : allAmenities) {
			
			ArrayList<String> apertmentIds = new ArrayList<String>();
			apertmentIds = a.getApartmentId();
			
			for(String apId : apertmentIds) {
				if(apId.equals(id)) {
					returnIds.add(a);
				}
			}
		}
		return returnIds;
	}

	public Amenitie addToApartmen(String id, String aprtId) {
		Amenitie amenitieToUpdate = findOne(id);
		if(amenitieToUpdate == null) {
			System.out.println("Vrati error!");
		}
		amenitieToUpdate.getApartmentId().add(aprtId);
		
		return amenitieToUpdate;
	}
	
}
