package beans;

import java.util.ArrayList;
import java.util.List;

public class Admin {

	private String id;
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String gender;
	
	private List<Test> tests;
	
	public Admin() {
		super();
		tests = new ArrayList<Test>();
	}
	
	public Admin(String id, String username, String password, String firstname, String lastname, String gender) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
	}

	public void setId(String i) {
		id = i;
	}

	public String getId() {
		return id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<Test> getTests() {
		return tests;
	}

	public void setTests(List<Test> tests) {
		this.tests = tests;
	}
	
}
