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
import beans.Location;
import beans.Reservation;
import beans.Review;

public class ApartmentDAO {
	private Map<String, Apartment> apartments = new HashMap<>();
	private LocationDAO locationDAO;
	private AmenityDAO amenityDAO;
	private ReservationDAO reservationDAO;
	private ReviewDAO reviewDAO;

	public ApartmentDAO() {
		super();
	}

	public ApartmentDAO(String contextPath, LocationDAO locationDAO, AmenityDAO amenityDAO, ReservationDAO reservationDAO, ReviewDAO reviewDAO) {
		this.locationDAO = locationDAO;
		this.amenityDAO = amenityDAO;
		this.reservationDAO = reservationDAO;
		this.reviewDAO = reviewDAO;
		loadApartments(contextPath);
	}

	public Collection<Apartment> findAll() {
		return apartments.values();
	}

	public Collection<Apartment> findAllApartByHostId(String id) {
		Collection<Apartment> allApartments = apartments.values();
		Collection<Apartment> testApart = new ArrayList<Apartment>();
		for (Apartment a : allApartments) {
			if (a.getHost().equals(id)) {
				testApart.add(a);
			}
		}
		return testApart;
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
		apartment.setStatus("neaktivno");
		apartment.setDeleted(false);
		String line = apartment.getId() + ";"
				+ apartment.getType() + ";"
				+ apartment.getRooms() + ";"
				+ apartment.getGuests() + ";"
				+ locationDAO.save(contextPath, apartment.getLocation()).getId() + ";"
				+ apartment.getTo() + ";"
				+ apartment.getFrom() + ";"
				+ apartment.getHost() + ";"
				+ apartment.getPrice() + ";"
				+ apartment.getCheckin() + ";"
				+ apartment.getCheckout() + ";"
				+ apartment.getStatus() + ";"
				+ apartment.isDeleted();
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/apartments.txt");
			writer = new BufferedWriter(new FileWriter(file, true));
			PrintWriter out = new PrintWriter(writer);
			out.println(line);
			out.close();
			// TODO: Migrate to AmenityDAO (save too crowded)
			for (Amenity amenity : apartment.getAmenities()) {
				String line2 = apartment.getId() + ";" + amenity.getId();
				System.out.println(line2);

				File file2 = new File(contextPath + "/apartment_amenities.txt");
				BufferedWriter writer2 = new BufferedWriter(new FileWriter(file2, true));
				PrintWriter out2 = new PrintWriter(writer2);
				out2.println(line2);
				out2.close();
			}
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

	public Apartment update(String contextPath, Apartment apartment) {
		try {
			File file = new File(contextPath + "/apartments.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				String id = st.nextToken().trim();
				if (apartment.getId().equals(id)) {
					text += id + ";"
							+ apartment.getType() + ";"
							+ apartment.getRooms() + ";"
							+ apartment.getGuests() + ";"
							+ locationDAO.update(contextPath, apartment.getLocation()).getId() + ";"
							+ apartment.getTo() + ";"
							+ apartment.getFrom() + ";"
							+ apartment.getHost() + ";"
							+ apartment.getPrice() + ";"
							+ apartment.getCheckin() + ";"
							+ apartment.getCheckout() + ";"
							+ apartment.getStatus() + ";"
							+ apartment.isDeleted() + "\r\n";
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
		amenityDAO.updateApartmentAmenities(contextPath, apartment);
		loadApartments(contextPath);
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
					// TODO: Migrate to LocationDAO (Use locatoinId instead);
					Location location = locationDAO.findOne(st.nextToken().trim());
					long to = Long.parseLong(st.nextToken().trim());
					long from = Long.parseLong(st.nextToken().trim());
					String host = st.nextToken().trim();
					int price = Integer.parseInt(st.nextToken().trim());
					String checkin = st.nextToken().trim();
					String checkout = st.nextToken().trim();
					String status = st.nextToken().trim();
					boolean deleted = Boolean.parseBoolean(st.nextToken().trim());

					// TODO: Migrate to ApartmentService (shouldn't call other dao's here)
					ArrayList<String> images = loadImages(contextPath, id);
					ArrayList<Amenity> amenities = amenityDAO.findAllByApartmentId(contextPath, id);
					Collection<Reservation> reservations = reservationDAO.findAllByApartmentId(id);
					Collection<Review> reviews = reviewDAO.findAllByApartmentId(id);

					if (!deleted)
						apartments.put(id, new Apartment(id, type, rooms, guests, location, to, from, reservations,
								host, reviews, images, price, checkin, checkout, status, amenities));
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

	public void saveImage(String contextPath, String imagePath, String apartmentId) {
		String line = apartmentId + ";" + imagePath;
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/images.txt");
			writer = new BufferedWriter(new FileWriter(file, true));
			PrintWriter out = new PrintWriter(writer);
			out.println(line);
			out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (Exception e) { }
			}
		}
		loadApartments(contextPath);
	}

	private ArrayList<String> loadImages(String contextPath, String id) {
		ArrayList<String> images = new ArrayList<>();
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/images.txt");
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
					String image = st.nextToken().trim();
					if (apartmentId.equals(id)) {
						images.add(image);
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
		return images;
	}

}
