package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Review;

public class ReviewDAO {

	//private List<Klub> klubovi
	private HashMap<String, Review> reviews = new HashMap<String, Review>(); 

	public ReviewDAO() {}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	//KlubManager(String fileName)
	public ReviewDAO(String contextPath) {
		this();
		loadReviews(contextPath);
	}
	

	public Collection<Review> findAll() {
		return reviews.values();
	}
	

	public Review findOne(String id) {
		return reviews.containsKey(id) ? reviews.get(id) : null;
	}
	

	public Review save(Review test) {
		Integer maxId = -1;
		for (String id : reviews.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		test.setId(maxId.toString());
		reviews.put(test.getId(), test);
		return test;
	}	

	public Review update(String id, Review updatedReview) {
		
		//We retrive host based on id we received as argument.
		Review oldReview = findOne(id);
		
		//if there is not host with such id we save that product as new one.
		if(oldReview == null) {
			System.out.println("Usao u save host u okviru update");
			return save(updatedReview);
		}
		else {
			System.out.println("usao u update product u okviru update");
			//We don't change id of existing review just text and username;
			
			oldReview.setText(updatedReview.getText());
			oldReview.setStar(updatedReview.getStar());	
			
			//We save old product which is now updated.
			return reviews.put(oldReview.getId(), oldReview);
		}
		
	}
	

	public Review delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return reviews.containsKey(id) ? reviews.remove(id) : null;
	}
	

	

	private void loadReviews(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/reviews.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "";
			String guestId= "";
			String apartmentId= "";
			String text= "";
			int star = -1;

			StringTokenizer st;
		
			//dokle god ima redova
			while ((line = in.readLine()) != null) {
				line = line.trim();//brise razmake sa pocetka i kraja reda
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				//ovde se popunjavaju atributi samog testa:
				while (st.hasMoreTokens()) {
					//ovde se svaki token trimuje...
					id =  st.nextToken().trim();
					guestId = st.nextToken().trim();
					apartmentId = st.nextToken().trim();
					text = st.nextToken().trim();
					star = Integer.parseInt(st.nextToken().trim());
					
				}
				
				reviews.put(id, new Review(id, guestId, apartmentId, text, star));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					//ovde se zatvara fajl
					in.close();
				}
				catch (Exception e) { }
			}
		}
		
	}
	
	
	
	public Collection<Review> findAllByGuestId(String id) {
		Collection<Review> reviews =  findAll();
		Collection<Review> testRet = new ArrayList<Review>();
		for(Review r : reviews) {
			if(r.getGuestId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}	
	
	public Collection<Review> findAllByApartmentId(String id) {
		Collection<Review> reviews =  findAll();
		Collection<Review> testRet = new ArrayList<Review>();
		for(Review r : reviews) {
			if(r.getApartmentId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}	
}
