package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Amenity;
import beans.Apartment;

public class AmenityDAO {
	private Map<String, Amenity> amenities = new HashMap<>();

	public AmenityDAO() {
		super();
	}

	public AmenityDAO(String contextPath) {
		loadAmenities(contextPath);
	}

	public Collection<Amenity> findAll() {
		return amenities.values();
	}

	public Amenity findOne(String id) {
		return amenities.containsKey(id) ? amenities.get(id) : null;
	}

	public Amenity save(String contextPath, Amenity amenity) {
		Integer maxId = -1;
		for (String id : amenities.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		amenity.setId(maxId.toString());
		String line = amenity.getId() + ";" + amenity.getName() + ";" + amenity.getType() + ";false";
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/amenities.txt");
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
		amenities.put(amenity.getId(), amenity);
		return amenity;
	}

	public Amenity update(String contextPath, Amenity amenity) {
		try {
			File file = new File(contextPath + "/amenities.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				String id = st.nextToken().trim();
				if (amenity.getId().equals(id)) {
					text += id + ";" + amenity.getName() + ";" + amenity.getType() + ";"
							+ amenity.isDeleted() + "\r\n";
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
		loadAmenities(contextPath);
		if (amenity.isDeleted())
			amenities.remove(amenity.getId());
		return amenity;
	}

	public Amenity delete(String id) {
		// hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return amenities.containsKey(id) ? amenities.remove(id) : null;
	}

	private void loadAmenities(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/amenities.txt");
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
					String name = st.nextToken().trim();
					String type = st.nextToken().trim();
					boolean deleted = Boolean.parseBoolean(st.nextToken().trim());
					if (!deleted)
						amenities.put(id, new Amenity(id, name, Amenity.Type.valueOf(type)));
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

	public void updateApartmentAmenities(String contextPath, Apartment apartment) {
		ArrayList<Amenity> amenities = apartment.getAmenities();
		try {
			File file = new File(contextPath + "/apartment_amenities.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				String apartmentId = st.nextToken().trim();
				if (!apartmentId.equals(apartment.getId())) {
					text += line + "\r\n";
				}
			}
			in.close();
			// Avoids doubling of amenities
			for (Amenity amenity : amenities) {
				text += apartment.getId() + ";" + amenity.getId() + "\r\n";
			}
			BufferedWriter writer = new BufferedWriter(new FileWriter(file));
			PrintWriter out = new PrintWriter(writer);
			out.println(text);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public ArrayList<Amenity> findAllByApartmentId(String contextPath, String id) {
		ArrayList<Amenity> returnAmenities = new ArrayList<>();
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/apartment_amenities.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String apartmentId = st.nextToken().trim();
					String amenityId = st.nextToken().trim();
					if (apartmentId.equals(id) && amenities.containsKey(amenityId)) {
						returnAmenities.add(amenities.get(amenityId));
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					return null;
				}
			}
		}
		return returnAmenities;
	}

	public Amenity addToApartmen(String id, String aprtId) {
		Amenity amenitieToUpdate = findOne(id);
		if (amenitieToUpdate == null) {
			System.out.println("Vrati error!");
		}
//		amenitieToUpdate.getApartmentId().add(aprtId);

		return amenitieToUpdate;
	}

}
