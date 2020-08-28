package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Address;
import beans.Location;

public class LocationDAO {

	private Map<String, Location> locations = new HashMap<>();

	public LocationDAO() {
		super();
	}

	public LocationDAO(String contextPath) {
		loadLocations(contextPath);
	}

	public Collection<Location> findAll() {
		return locations.values();
	}

	public Location findOne(String id) {
		return locations.containsKey(id) ? locations.get(id) : null;
	}

	public Location save(String contextPath, Location location) {
		Integer maxId = -1;
		for (String id : locations.keySet()) {
			int idNum = Integer.parseInt(id);
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
				} catch (Exception e) {
					return null;
				}
			}
		}
		locations.put(location.getId(), location);
		return location;
	}

	//TODO: rewrite
	public Location update(String id, Location updatedLocation) {

		// We retrive host based on id we received as argument.
		Location oldLocation = findOne(id);

		// if there is not host with such id we save that product as new one.
		if (oldLocation == null) {
			System.out.println("Usao u save host u okviru update");
			return updatedLocation;
		} else {
			System.out.println("usao u update product u okviru update");
			// We don't change id of existing host just username, password, firstname and
			// lastname.

//			oldLocation.setApartmentId(updatedLocation.getApartmentId());
			oldLocation.setLongitude(updatedLocation.getLongitude());
			oldLocation.setLatitude(updatedLocation.getLatitude());
			oldLocation.setAddress(updatedLocation.getAddress());

			// We save old product which is now updated.
			return locations.put(oldLocation.getId(), oldLocation);
		}

	}

	//TODO: rewrite
	public Location delete(String id) {
		// hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return locations.containsKey(id) ? locations.remove(id) : null;
	}

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
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) { }
			}
		}
	}

}
