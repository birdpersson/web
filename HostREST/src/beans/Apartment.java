package beans;

import java.util.ArrayList;

public class Apartment {

	public enum Type {
		APARTMENT, ROOM
	}

	private String id;
	private Type type;
	private int rooms;
	private int guests;
	private Location location;
	private Period period;
	private ArrayList<Period> availability;
	private String host;
	private ArrayList<Review> reviews;
	private ArrayList<String> images;
	private int price;
	private String checkin;
	private String checkout;
	private boolean active;
	private ArrayList<Amenity> amenities;
	private ArrayList<Reservation> reservations;

	public Apartment() {
		super();
	}

	public Apartment(String id, Type type, int rooms, int guests, Location location, String host, int price,
			String checkin, String checkout, boolean active) {
		super();
		this.id = id;
		this.type = type;
		this.rooms = rooms;
		this.guests = guests;
		this.location = location;
		this.host = host;
		this.price = price;
		this.checkin = checkin;
		this.checkout = checkout;
		this.active = active;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public Period getPeriod() {
		return period;
	}

	public void setPeriod(Period period) {
		this.period = period;
	}

	public ArrayList<Period> getAvailability() {
		return availability;
	}

	public void setAvailability(ArrayList<Period> availability) {
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
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
