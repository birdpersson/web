package beans;

import java.util.ArrayList;

public class Amenity {

	public enum Type {
		Base, Dining, Facilities, Family
	}

	private Type type;
	private String id;
	private String name;
	private ArrayList<String> apartmentId;

	public Amenity() {
		super();
	}

	public Amenity(Type type, String id, String name, ArrayList<String> apartmentId) {
		super();
		this.type = type;
		this.id = id;
		this.name = name;
		this.apartmentId = apartmentId;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<String> getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(ArrayList<String> apartmentId) {
		this.apartmentId = apartmentId;
	}

}
