package model;

import java.util.ArrayList;

public class Host {

	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String gender;

	private ArrayList<Apartment> apartments;

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

	public ArrayList<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(ArrayList<Apartment> apartments) {
		this.apartments = apartments;
	}

}
