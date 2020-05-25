package beans;

import java.util.ArrayList;
import java.util.List;

public class Test {
	
	private String id;
	private String ime;
	private String prezime;
	private String adminsId;  

	
	public Test() {
		super();
	}
	public Test(String id, String ime, String prezime) {
		super();
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
	}
	
	public Test(String id, String ime, String prezime, String adminsId) {
		super();
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
		this.adminsId = adminsId;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public String getAdminsId() {
		return adminsId;
	}
	public void setAdminsId(String adminsId) {
		this.adminsId = adminsId;
	}
	
}
