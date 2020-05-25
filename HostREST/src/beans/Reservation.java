package beans;

import java.util.Date;

public class Reservation {

	private String id;
	private String apartmentId;
	private String guestId;
	private Date date;
	private int night;
	private int price; // apartment.price * night;
	private String confirmation;
	private Status status;
//	private Apartment apartment; //get ReservationByApartmentId()
//	private Guest guest;
	


	public Reservation() {
		super();
	}

	public Reservation(String id, String apartmentId, String guestId, Date date, int night, int price,
			String confirmation, Status status) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.guestId = guestId;
		this.date = date;
		this.night = night;
		this.price = price;
		this.confirmation = confirmation;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(String apartmentId) {
		this.apartmentId = apartmentId;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getNight() {
		return night;
	}

	public void setNight(int night) {
		this.night = night;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
//	public Guest getGuest() {
//	return guest;
//}
//
//public void setGuest(Guest guest) {
//	this.guest = guest;
//}
	
//	public Apartment getApartment() {
//	return apartment;
//}
//
//public void setApartment(Apartment apartment) {
//	this.apartment = apartment;
//}

}
