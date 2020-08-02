package beans;

public class Review {

	private String id;
	private String guestId;
	private String apartmentId;
//	private User user;
//	private Apartment apartment;
	private String text;
	private int star;
	private boolean visible;

	public Review() {
		super();
	}

	public Review(String id, String guestId, String apartmentId, String text, int star, boolean visible) {
		super();
		this.id = id;
		this.guestId = guestId;
		this.apartmentId = apartmentId;
		this.text = text;
		this.star = star;
		this.visible = visible;
	}

	public String getId() {
		return id;
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

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

}
