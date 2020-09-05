package beans;

public class Period {

	private String id;
	private String apartmentId;
	private long to;
	private long from;

	public Period() {
		super();
	}

	public Period(String id, String apartmentId, long to, long from) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.to = to;
		this.from = from;
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

}
