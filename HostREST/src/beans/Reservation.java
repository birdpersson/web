package beans;

public class Reservation {

	public enum Status {
		Created, Rejected, Canceled, Accepted, Completed;
	}

	private String id;
	private String apartmentId;
	private long from;
	private long to;
	private int night;
	private int price;
	private String message;
	private String guestId;
	private Status status;

	private String confirmation;

	public Reservation() {
		super();
	}

	public Reservation(String id, String apartmentId, long from, long to, int night, int price, String message,
			String guestId, Status status, String confirmation) {
		this.id = id;
		this.apartmentId = apartmentId;
		this.from = from;
		this.to = to;
		this.night = night;
		this.price = price;
		this.message = message;
		this.guestId = guestId;
		this.status = status;
		this.confirmation = confirmation;
	}

	// TODO: why this??
	public String getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
