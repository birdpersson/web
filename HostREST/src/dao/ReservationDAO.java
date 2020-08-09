package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Reservation;


public class ReservationDAO {
	//private List<Klub> klubovi
	private HashMap<String, Reservation> reservations = new HashMap<String, Reservation>(); 

	public ReservationDAO() {}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	//KlubManager(String fileName)
	public ReservationDAO(String contextPath) {
		this();
		loadReservations(contextPath);
	}
	

	public Collection<Reservation> findAll() {
		return reservations.values();
	}
	

	public Reservation findOne(String id) {
		return reservations.containsKey(id) ? reservations.get(id) : null;
	}
	

	public Reservation save(Reservation test) {
		Integer maxId = -1;
		for (String id : reservations.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		test.setId(maxId.toString());
		reservations.put(test.getId(), test);
		return test;
	}	

	public Reservation update(String id, Reservation updatedReview) {
		
		//We retrive host based on id we received as argument.
		Reservation oldReservation = findOne(id);
		
		//if there is not host with such id we save that product as new one.
		if(oldReservation == null) {
			System.out.println("Usao u save host u okviru update");
			return save(updatedReview);
		}
		else {
			System.out.println("usao u update product u okviru update");
			//We don't change id of existing review just text and username;
			
			oldReservation.setDate(updatedReview.getDate());
			oldReservation.setNight(updatedReview.getNight());	
			oldReservation.setPrice(updatedReview.getPrice());
			oldReservation.setConfirmation(updatedReview.getConfirmation());
			oldReservation.setStatus(updatedReview.getStatus());
			
			//We save old product which is now updated.
			return reservations.put(oldReservation.getId(), oldReservation);
		}
		
	}
	

	public Reservation delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return reservations.containsKey(id) ? reservations.remove(id) : null;
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
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "";
			String guestId= "";
			String apartmentId= ""; 
			
			DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String formattedDate = null;
			Date date = null;  
			System.out.println("Date" + date);
			int night = -1;
			int price = -1; // apartment.price * night;
			String confirmation = "";
			String message = "";
			Reservation.Status status = null;

			StringTokenizer st;
		
			//dokle god ima redova
			while ((line = in.readLine()) != null) {
				line = line.trim();//brise razmake sa pocetka i kraja reda
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				//ovde se popunjavaju atributi samog testa:
				while (st.hasMoreTokens()) {
					//ovde se svaki token trimuje...
					id =  st.nextToken().trim();
					apartmentId = st.nextToken().trim();
					guestId = st.nextToken().trim();
					
					date = formatter.parse(st.nextToken().trim());
					formattedDate = formatter.format(date);
//					date = new SimpleDateFormat("dd/MM/yyyy").parse(st.nextToken().trim());
				
//					LocalDate date2 = LocalDate.parse(st.nextToken().trim(), DateTimeFormatter.BASIC_ISO_DATE);
					System.out.println("Parsed Date" + date);
					night = Integer.parseInt(st.nextToken().trim());
					price = Integer.parseInt(st.nextToken().trim());
					confirmation = st.nextToken().trim();
					status = Reservation.Status.valueOf(st.nextToken().trim());
				}
				
				reservations.put(id, new Reservation(id, apartmentId, guestId, date, night,  price,
						confirmation, message, status));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					//ovde se zatvara fajl
					in.close();
				}
				catch (Exception e) { }
			}
		}
		
	}

	
	public Collection<Reservation> findAllByGuestId(String id) {
		Collection<Reservation> allReservations =  findAll();
		Collection<Reservation> testRet = new ArrayList<Reservation>();
		for(Reservation r : allReservations) {
			if(r.getGuestId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}	
	
	public Collection<Reservation> findAllByApartmentId(String id) {
		Collection<Reservation> allReservations =  findAll();
		Collection<Reservation> testRet = new ArrayList<Reservation>();
		for(Reservation r : allReservations) {
			if(r.getApartmentId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}	
	
}
