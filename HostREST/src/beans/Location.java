package beans;

public class Location {

	private String id;
	private String apartmentId;
	private double longitude;
	private double latitude;
	private String address;	

	public Location() {
		super();
	}
	
//	public Location(String id, double longitude, double latitude, String address) {
//		super();
//		this.id = id;
//		this.longitude = longitude;
//		this.latitude = latitude;
//		this.address = address;
//	}

	public Location(String id, String apartmentId, double longitude, double latitude, String address) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}
	
	
	public void setId(String i) {
		id = i;
	}

	public String getId() {
		return id;
	}
	
	
	public String getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(String apartmentId) {
		this.apartmentId = apartmentId;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
}
