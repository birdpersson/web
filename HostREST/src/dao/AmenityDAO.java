package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Amenity;
import beans.AmenityDTO;

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

	public Amenity save(Amenity admin) {
		Integer maxId = -1;
		for (String id : amenities.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		admin.setId(maxId.toString());
		amenities.put(admin.getId(), admin);
		return admin;
	}

	public Amenity update(String id, Amenity updatedAmenitie) {

		Amenity oldAmenitie = findOne(id);

		if (oldAmenitie == null) {
			System.out.println("Usao u save admina u okviru update");
			return save(updatedAmenitie);
		} else {

			// We don't change id of existing host just username, password, firstname and
			// lastname.
			oldAmenitie.setName(updatedAmenitie.getName());
			oldAmenitie.setType(updatedAmenitie.getType());

			// We save and return old admin which is now updated.
			return amenities.put(oldAmenitie.getId(), oldAmenitie);
		}

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
					if (apartmentId.equals(id)) {
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
	public ArrayList<AmenityDTO> findAllByApartmentIdDTO(String contextPath, String id) {
		ArrayList<AmenityDTO> returnAmenities = new ArrayList<>();
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
					if (apartmentId.equals(id)) {
						Amenity amenity = amenities.get(amenityId);
						AmenityDTO amenityDTO = new AmenityDTO(amenity.getId(), amenity.getName());
						returnAmenities.add(amenityDTO);
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
