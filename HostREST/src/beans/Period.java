package beans;

public class Period {

	private String id;
	private String apartmentId;
	private long from;
	private long to;

	public Period() {
		super();
	}

	public Period(String id, String apartmentId, long from, long to) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.from = from;
		this.to = to;
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

}
