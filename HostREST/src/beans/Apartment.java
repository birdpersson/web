package beans;

import java.util.ArrayList;
import java.util.Collection;

public class Apartment {

	public enum Type {
		APARTMENT, ROOM
	}

	private String id;
	private Type type;
	private int rooms;
	private int guests;
	private Location location;
	private long to;
	private long from;
	private Period period;
	private ArrayList<Period> availability;
	private String host;
	private Collection<Review> reviews;
	private ArrayList<String> images;
	private int price;
	private String checkin;
	private String checkout;
	private String status;
	private ArrayList<Amenity> amenities;
	private ArrayList<Reservation> reservations;

	public Apartment() {
		super();
	}

	public Apartment(String id, Type type, int rooms, int guests, Location location, long to, long from,
			ArrayList<Period> availability, String host, Collection<Review> reviews, int price, String checkin,
			String checkout, String status, ArrayList<Amenity> amenities) {
		super();
		this.id = id;
		this.type = type;
		this.rooms = rooms;
		this.guests = guests;
		this.location = location;
		this.to = to;
		this.from = from;
		this.availability = availability;
		this.host = host;
		this.reviews = reviews;
		this.price = price;
		this.checkin = checkin;
		this.checkout = checkout;
		this.status = status;
		this.amenities = amenities;
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

	public long getTo() {
		return to;
	}

	public void setTo(long to) {
		this.to = to;
	}

	public long getFrom() {
		return from;
	}

	public void setFrom(long from) {
		this.from = from;
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

	public Collection<Review> getReviews() {
		return reviews;
	}

	public void setReviews(Collection<Review> reviews) {
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
