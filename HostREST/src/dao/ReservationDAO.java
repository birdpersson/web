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

import beans.Reservation;

public class ReservationDAO {
	private Map<String, Reservation> reservations = new HashMap<>();

	public ReservationDAO() {
		super();
	}

	public ReservationDAO(String contextPath) {
		loadReservations(contextPath);
	}

	public Collection<Reservation> findAll() {
		return reservations.values();
	}

	public Collection<Reservation> findAllByGuestId(String id) {
		Collection<Reservation> allReservations = findAll();
		Collection<Reservation> testRet = new ArrayList<Reservation>();
		for (Reservation r : allReservations) {
			if (r.getGuestId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}
	
	public Collection<Reservation> findAllByApartmentId(String id) {
		Collection<Reservation> allReservations = findAll();
		Collection<Reservation> testRet = new ArrayList<Reservation>();
		for (Reservation r : allReservations) {
			if (r.getApartmentId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}
	
	//PROVERITI!!!!!!
	public String findGuestByApartmentId(String apartmId){
		Collection<Reservation> allReservations = this.findAll();
		String retGuestId  = "";
		for (Reservation r : allReservations) {
			if (r.getApartmentId().equals(apartmId)) {
				retGuestId = r.getGuestId();
			}
		}
		return retGuestId;
	}
	

	public Reservation findOne(String id) {
		return reservations.containsKey(id) ? reservations.get(id) : null;
	}

	public Reservation save(String contextPath, Reservation reservation) {
		Integer maxId = -1;
		for (String id : reservations.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		reservation.setId(maxId.toString());
		reservation.setStatus(Reservation.Status.valueOf("Created"));
		String line = reservation.getId() + ";"
				+ reservation.getApartmentId() + ";"
				+ reservation.getGuestId() + ";"
				+ reservation.getFrom() + ";"
				+ reservation.getTo() + ";"
				+ reservation.getNight() + ";"
				+ reservation.getPrice() + ";"
				+ reservation.getConfirmation() + ";"
				+ reservation.getMessage() + ";"
				+ reservation.getStatus().toString();
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/reservations.txt");
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
		reservations.put(reservation.getId(), reservation);
		return reservation;
	}

	public Reservation update(String contextPath, Reservation reservation) {
		try {
			File file = new File(contextPath + "/reservations.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String id = st.nextToken().trim();
					String apartmentId = st.nextToken().trim();
					String guestId = st.nextToken().trim();
					long from = Long.parseLong(st.nextToken().trim());
					long to = Long.parseLong(st.nextToken().trim());
					int night = Integer.parseInt(st.nextToken().trim());
					int price = Integer.parseInt(st.nextToken().trim());
					String confirmation = st.nextToken().trim();
					String message = st.nextToken().trim();
					String status = st.nextToken().trim();
					// TODO: Find less stupid way to change status
					if (reservation.getId().equals(id)) {
						text += id + ";"
								+ apartmentId + ";"
								+ guestId + ";"
								+ from + ";"
								+ to + ";"
								+ night + ";"
								+ price + ";"
								+ confirmation + ";"
								+ message + ";"
								+ reservation.getStatus() + "\r\n";
					} else {
						text += line + "\r\n";
					}
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
		return reservation;
	}

	public Reservation changeStatus(String id, String status) {
		Reservation res = findOne(id);
		Reservation.Status newStatus = Reservation.Status.valueOf(status);
		res.setStatus(newStatus);
		return res;
	}

	private void loadReservations(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/reservations.txt");
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
					String apartmentId = st.nextToken().trim();
					String guestId = st.nextToken().trim();
					long from = Long.parseLong(st.nextToken().trim());
					long to = Long.parseLong(st.nextToken().trim());
					int night = Integer.parseInt(st.nextToken().trim());
					int price = Integer.parseInt(st.nextToken().trim());
					String confirmation = st.nextToken().trim();
					String message = st.nextToken().trim();
					String status = st.nextToken().trim();

					reservations.put(id, new Reservation(id, apartmentId, from, to,
							night, price, message, guestId, Reservation.Status.valueOf(status), confirmation));
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
