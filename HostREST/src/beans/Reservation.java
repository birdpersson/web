package beans;

public class Reservation {

	public enum Status {
		Created, Rejected, Canceled, Accepted, Completed;
	}

	private String id;
	private String apartmentId;
	private String guestId;
	private long from;
	private long to;
	private int night;
	private int price;
	private String confirmation;
	private String message;
	private Status status;

	public Reservation() {
		super();
	}

	public Reservation(String id, String apartmentId, String guestId, long from, long to, int night, int price,
			String confirmation, String message, Status status) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.guestId = guestId;
		this.from = from;
		this.to = to;
		this.night = night;
		this.price = price;
		this.confirmation = confirmation;
		this.message = message;
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

	public long getFrom() {
		return from;
	}

	public void setFrom(long from) {
		this.from = from;
	}

	public long getTo() {
		return to;
	}

	public void setTo(long to) {
		this.to = to;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
