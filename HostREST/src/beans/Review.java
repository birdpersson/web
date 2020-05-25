package beans;

public class Review {

	private String id;
	private String guestId;
	private String apartmentId;
//	private Guest guest;
//	private Apartment apartment;
	private String text;
	private int star;
	
	
	public Review() {
		super();
	}

	public Review(String id, String guestId, String apartmentId, String text, int star) {
		super();
		this.id = id;
		this.guestId = guestId;
		this.apartmentId = apartmentId;
		this.text = text;
		this.star = star;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public String getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(String apartmentId) {
		this.apartmentId = apartmentId;
	}


//	public Guest getGuest() {
//		return guest;
//	}
//
//	public void setGuest(Guest guest) {
//		this.guest = guest;
//	}
//
//	public Apartment getApartment() {
//		return apartment;
//	}
//
//	public void setApartment(Apartment apartment) {
//		this.apartment = apartment;
//	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public String getId() {
		return id;
	}

}
