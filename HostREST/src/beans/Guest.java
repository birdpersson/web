package beans;

import java.util.ArrayList;

public class Guest {

	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String gender;

	private ArrayList<Apartment> apartments;
	private ArrayList<Reservation> reservations;

	// Dodao listu preview koje je korisnik ostavio:
	private ArrayList<Review> reviews;

	public Guest() {
		super();
		apartments = new ArrayList<Apartment>();
		reservations = new ArrayList<Reservation>();
		reviews = new ArrayList<Review>();
	}

	public Guest(String username, String password, String firstname, String lastname, String gender) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;

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

	public ArrayList<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(ArrayList<Apartment> apartments) {
		this.apartments = apartments;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

	// dodao:
	public ArrayList<Review> getReviews() {
		return reviews;
	}

	public void setReviews(ArrayList<Review> reviews) {
		this.reviews = reviews;
	}

}
