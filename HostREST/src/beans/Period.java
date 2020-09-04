package beans;

import java.util.Date;

public class Period {

	private String id;
	private String apartmentId;
	private Date to;
	private Date from;

	public Period() {
		super();
	}

	public Period(String id, String apartmentId, Date to, Date from) {
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

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

}
