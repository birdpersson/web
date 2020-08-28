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

import beans.Apartment;
import beans.Location;

public class ApartmentDAO {

	private Map<String, Apartment> apartments = new HashMap<>();
	private LocationDAO locationDAO;

	public ApartmentDAO() {
		super();
	}

	public ApartmentDAO(String contextPath, LocationDAO locationDAO) {
		this.locationDAO = locationDAO;
		loadApartments(contextPath);
	}

	public Collection<Apartment> findAll() {
		return apartments.values();
	}

	public Apartment findOne(String id) {
		return apartments.containsKey(id) ? apartments.get(id) : null;
	}

	public Apartment save(String contextPath, Apartment apartment) {
		Integer maxId = -1;
		for (String id : apartments.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		apartment.setId(maxId.toString());
		String line = apartment.getId() + ";"
				+ apartment.getType() + ";"
				+ apartment.getRooms() + ";"
				+ apartment.getGuests() + ";"
				+ locationDAO.save(contextPath, apartment.getLocation()).getId() + ";"
				+ apartment.getHost() + ";"
				+ apartment.getPrice() + ";"
				+ apartment.getCheckin() + ";"
				+ apartment.getCheckout() + ";"
				+ "false" + ";";
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/apartments.txt");
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
		apartments.put(apartment.getId(), apartment);
		return apartment;
	}

	private void loadApartments(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/apartments.txt");
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
					Apartment.Type type = Apartment.Type.valueOf(st.nextToken().trim());
					int rooms = Integer.parseInt(st.nextToken().trim());
					int guests = Integer.parseInt(st.nextToken().trim());
					Location location = locationDAO.findOne(st.nextToken().trim());
//					ArrayList<Date> dates = new ArrayList<>();
//					ArrayList<Date> availability = new ArrayList<>();
					String host = st.nextToken().trim();
//					ArrayList<Review> reviews = new ArrayList<>();
//					ArrayList<String> images = new ArrayList<>();
					int price = Integer.parseInt(st.nextToken().trim());
					String checkin = st.nextToken().trim();
					String checkout = st.nextToken().trim();
					boolean active = Boolean.parseBoolean(st.nextToken().trim());
//					ArrayList<Amenity> amenities = new ArrayList<>();
//					ArrayList<Reservation> reservations = new ArrayList<>();
					apartments.put(id,
							new Apartment(id, type, rooms, guests, location, host, price, checkin, checkout, active));
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

	public Collection<Apartment> findAllApartByHostId(String id) {
		Collection<Apartment> allApartments = findAll();
		Collection<Apartment> testApart = new ArrayList<Apartment>();
		for (Apartment a : allApartments) {
			if (a.getHost().equals(id)) {
				testApart.add(a);
			}
		}
		return testApart;
	}

//	public Collection<Apartment> findAllApartByGuestId(String id) {
//		Collection<Apartment> allApartments = findAll();
//		Collection<Apartment> testApart = new ArrayList<Apartment>();
//		for (Apartment a : allApartments) {
//			if (a.getGuest().equals(id)) {
//				testApart.add(a);
//			}
//		}
//		return testApart;
//	}

}
