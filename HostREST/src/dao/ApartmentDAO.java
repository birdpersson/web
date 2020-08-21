package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

import beans.Amenity;
import beans.Apartment;
import beans.Location;
import beans.Reservation;
import beans.Review;
import beans.Type;

//import beans.Apartment.Type;

public class ApartmentDAO {
	
	@Context
	ServletContext ctx;

	private HashMap<String, Apartment> apartments = new HashMap<String, Apartment>();
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public ApartmentDAO(String contextPath) {
		loadApartments(contextPath);
	}
	/***
	 * Vraca sve apartmane.
	 * @return
	 */
	public Collection<Apartment> findAll() {
		return apartments.values();
	}
	
	/***
	 *  Vraca stan na osnovu njegovog id-a. 
	 *  @return Stan sa id-em ako postoji, u suprotnom null
	 */
	public Apartment findOne(String id) {
		return apartments.containsKey(id) ? apartments.get(id) : null;
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadApartments(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/apartments.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "";
			String hostId = "";
			String guestId = "";
			Type type = null; 
			int rooms = -1;
			int guests = -1;
			Location location = new Location();
			ArrayList<Date> dates = new ArrayList<Date>();
			ArrayList<Date> availability = new ArrayList<Date>();
//			Host host ;
			ArrayList<Review> reviews = new ArrayList<Review>();
			ArrayList<String> images = new ArrayList<String>();
			int price = -1;
			String checkin = "";
			String checkout = "";
			boolean status = false;
			ArrayList<Amenity>  amenities = new ArrayList<Amenity>();
			ArrayList<Reservation> reservations = new ArrayList<Reservation>();
			
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = st.nextToken().trim();
					hostId =  st.nextToken().trim();
					guestId = st.nextToken().trim();
					type = Type.valueOf(st.nextToken().trim());
					System.out.println("Type is: " + type);
//					rooms =   Integer.parseInt(st.nextToken().trim());
//					guests =  Integer.parseInt(st.nextToken().trim());
//					dates = null;
//					availability = null;
//					images = null;
//					price =  Integer.parseInt(st.nextToken().trim());
//					checkin = st.nextToken().trim();
//					checkout = st.nextToken().trim();
//					status =  Boolean.parseBoolean(st.nextToken().trim());
					
					location = null;
					reviews = null;
					amenities = null;
					reservations = null;
//					host = null;
					
				}
				apartments.put(id,new Apartment(id, hostId, guestId, type,/* rooms, guests,*/ location,/* dates,
						 availability, host,*/ reviews,/* images, price,
						checkin, checkout, status,*/ amenities, reservations));
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
	
	
	public Collection<Apartment> findAllApartByHostId(String id) {
		Collection<Apartment> allApartments =  findAll();
		Collection<Apartment> testApart = new ArrayList<Apartment>();
		for(Apartment a : allApartments) {
			if(a.getHostId().equals(id)) {
				testApart.add(a);
			}
		}
		return testApart;
	}
	public Collection<Apartment> findAllApartByGuestId(String id) {
		Collection<Apartment> allApartments =  findAll();
		Collection<Apartment> testApart = new ArrayList<Apartment>();
		for(Apartment a : allApartments) {
			if(a.getGuestId().equals(id)) {
				testApart.add(a);
			}
		}
		return testApart;
	}
	
}
