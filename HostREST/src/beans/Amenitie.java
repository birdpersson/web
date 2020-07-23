package beans;

import java.util.ArrayList;

public class Amenitie {
	private String id;
	private String name;
	private ArrayList<String> apartmentId;
	
	public Amenitie() {
		
	}

	public Amenitie(String id, ArrayList<String> apartmentId, String name) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<String> getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(ArrayList<String> apartmentId) {
		this.apartmentId = apartmentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
