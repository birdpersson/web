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

	public Location update(String contextPath, Location location) {
		try {
			File file = new File(contextPath + "/locations.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				String id = st.nextToken().trim();
				if (location.getId().equals(id)) {
					text += id + ";"
							+ location.getLatitude() + ";"
							+ location.getLongitude() + ";"
							+ location.getAddress().getStreet() + ";"
							+ location.getAddress().getCity() + ";"
							+ location.getAddress().getPostalCode() + "\r\n";
				} else {
					text += line + "\r\n";
				}
			}
			in.close();
			BufferedWriter writer = new BufferedWriter(new FileWriter(file, false));
			PrintWriter out = new PrintWriter(writer);
			out.println(text);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		loadLocations(contextPath);
		return location;
	}

	//TODO: remove if not necessary
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
