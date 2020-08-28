package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Address;
import beans.Location;


public class LocationDAO {

private HashMap<String, Location> locations = new HashMap<String, Location>(); 
	
	public LocationDAO() {}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public LocationDAO(String contextPath) {
		loadLocations(contextPath);
	}
	
	/***
	 * Vraca sve lokacije.
	 * @return
	 */
	public Collection<Location> findAll() {
		return locations.values();
	}
	
	/***
	 *  Vraca lokaciju na osnovu njenog id-a. 
	 *  @return Lokacija sa id-em ako postoji, u suprotnom null
	 */
	public Location findOne(String id) {
		return locations.containsKey(id) ? locations.get(id) : null;
	}
	
	public Location save(String contextPath, Location location) {
		Integer maxId = -1;
		for (String id : locations.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		location.setId(maxId.toString());
		String line = location.getId() + ";"
				+ location.getLatitude() + ";"
				+ location.getLongitude() + ";"
				+ location.getAddress().getStreet() + ";"
				+ location.getAddress().getCity() + ";"
				+ location.getAddress().getPostalCode();
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/locations.txt");
			writer = new BufferedWriter(new FileWriter(file, true));
			PrintWriter out = new PrintWriter(writer);
			out.println(line);
			out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			if (writer != null) {
				try {
					writer.close();
				}
				catch (Exception e) {
					return null;
				}
			}
		}
		locations.put(location.getId(), location);
		return location;
	}
	
	/***
	 * Vrsi izmenu atributa domacina u mapi domacina. Id izmenjenog domacina ce imati istu vrednost kao i stari domacin.
	 * @param Id domacina koji se zeli izmeniti, novi domacin sa izmenjenim atributima 
	 * @return Izmenjeni domacin 
	 */
	public Location update(String id, Location updatedLocation) {
		
		//We retrive host based on id we received as argument.
		Location oldLocation = findOne(id);
		
		//if there is not host with such id we save that product as new one.
		if(oldLocation == null) {
			System.out.println("Usao u save host u okviru update");
			return updatedLocation;
		}
		else {
			System.out.println("usao u update product u okviru update");
			//We don't change id of existing host just username, password, firstname and lastname.
			
//			oldLocation.setApartmentId(updatedLocation.getApartmentId());
			oldLocation.setLongitude(updatedLocation.getLongitude());
			oldLocation.setLatitude(updatedLocation.getLatitude());
			oldLocation.setAddress(updatedLocation.getAddress());
			
			//We save old product which is now updated.
			return locations.put(oldLocation.getId(), oldLocation);
		}
		
	}
	
	/**
	 * Pretrazuje lokacije iz WebContent/locations.txt fajla i brise ih ako ih nadje.
	 * @return obirsanog domacina u protivnom null
	 * @param id domacina koji je kljuc
	 */
	public Location delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return locations.containsKey(id) ? locations.remove(id) : null;
	}
	
	/**
	 * Pretrazuje lokacije iz WebContent/locations.txt fajla na osnovu id apartmana i vraca lokaciju ako je nadje, u suprotnom null.
	 * @return lokaciju sa koja sadrzi id stana u protivnom null
	 * @param id stana ciju lokaciju prosledjujemo
	 */
//	public Location findLocatByApartId(String id) {
//		Collection<Location> allLocations =  findAll();
//		for(Location l : allLocations) {
//			if(l.getApartmentId().equals(id)) {
//				return l;
//			}
//		}
//		return null;
//	}
	
	private void loadLocations(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/locations.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String id = st.nextToken().trim();
					String latitude = st.nextToken().trim();
					String longitude = st.nextToken().trim();

					String street = st.nextToken().trim();
					String city = st.nextToken().trim();
					String postalCode = st.nextToken().trim();
					
					locations.put(id, new Location(id, latitude, longitude,
							new Address(street, city, postalCode)));					
				}
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

}
