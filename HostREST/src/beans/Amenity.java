package beans;

public class Amenity {

	public enum Type {
		Base, Dining, Facilities, Family
	}

	private String id;
	private String name;
	private Type type;

	public Amenity() {
		super();
	}

	public Amenity(String id, String name, Type type) {
		super();
		this.id = id;
		this.name = name;
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

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

}
