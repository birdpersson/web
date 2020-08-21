package beans;

import java.util.ArrayList;
import java.util.Date;

public class Apartment {

	public enum Type {
		APARTMENT, ROOM
	}

	private String id;
	private String hostId; // ovo se ne menja jer je vlasnik isti;
	private String guestId; // ovo se menja sa promenom gosta;
	private Type type;
	private int rooms;
	private int guests;
	private Location location;
	private ArrayList<Date> dates;
	private ArrayList<Date> availability;
	private String host;
	private ArrayList<Review> reviews;
	private ArrayList<String> images;
	private int price;
	private String checkin;
	private String checkout;
	private boolean available;
	private ArrayList<Amenity> amenities;
	private ArrayList<Reservation> reservations;

	public Apartment() {
		super();
	}

	public Apartment(String id, String hostId, String guestId, Type type, Location location, ArrayList<Review> reviews,
			ArrayList<Amenity> amenities, ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.hostId = hostId;
		this.guestId = guestId;
		this.type = type;
		this.location = location;
		this.reviews = reviews;
		this.amenities = amenities;
		this.reservations = reservations;
	}

//	public Apartment(String id, String hostId, String guestId, /* Type type,*/ int rooms, int guests, Location location, ArrayList<Date> dates,
//			ArrayList<Date> availability,/* Host host,*/ ArrayList<Review> reviews, ArrayList<String> images, int price,
//			String checkin, String checkout, boolean status, ArrayList<Amenities> amenities, ArrayList<Reservation> reservations) {
//		super();
//		this.id = id;
//		this.hostId = hostId;
//		this.guestId = guestId;
//		//this.type = type;
//		this.rooms = rooms;
//		this.guests = guests;
//		this.location = location;
//		this.dates = dates;
//		this.availability = availability;
////		this.host = host;
//		this.reviews = reviews;
//		this.images = images;
//		this.price = price;
//		this.checkin = checkin;
//		this.checkout = checkout;
//		this.status = status;
//		this.amenities = amenities;
//		this.reservations = reservations;
//	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHostId() {
		return hostId;
	}

	public void setHostId(String hostId) {
		this.hostId = hostId;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public int getRooms() {
		return rooms;
	}

	public void setRooms(int rooms) {
		this.rooms = rooms;
	}

	public int getGuests() {
		return guests;
	}

	public void setGuests(int guests) {
		this.guests = guests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public ArrayList<Date> getDates() {
		return dates;
	}

	public void setDates(ArrayList<Date> dates) {
		this.dates = dates;
	}

	public ArrayList<Date> getAvailability() {
		return availability;
	}

	public void setAvailability(ArrayList<Date> availability) {
		this.availability = availability;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public ArrayList<Review> getReviews() {
		return reviews;
	}

	public void setReviews(ArrayList<Review> reviews) {
		this.reviews = reviews;
	}

	public ArrayList<String> getImages() {
		return images;
	}

	public void setImages(ArrayList<String> images) {
		this.images = images;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getCheckin() {
		return checkin;
	}

	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}

	public String getCheckout() {
		return checkout;
	}

	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailablie(boolean available) {
		this.available = available;
	}

	public ArrayList<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Amenity> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

}
