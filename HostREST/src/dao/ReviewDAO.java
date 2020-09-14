package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Review;

public class ReviewDAO {
	private Map<String, Review> reviews = new HashMap<>();

	public ReviewDAO() {
		super();
	}

	public ReviewDAO(String contextPath) {
		loadReviews(contextPath);
	}

	public Collection<Review> findAll() {
		return reviews.values();
	}

	public Review findOne(String id) {
		return reviews.containsKey(id) ? reviews.get(id) : null;
	}

	public Review save(String contextPath, Review review) {
		Integer maxId = -1;
		for (String id : reviews.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		review.setId(maxId.toString());
		String line = review.getId() + ";"
				+ review.getGuestId() + ";"
				+ review.getApartmentId() + ";"
				+ review.getText() + ";"
				+ review.getStar() + ";"
				+ review.isVisible();
		System.out.println(line);
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/reviews.txt");
			writer = new BufferedWriter(new FileWriter(file, true));
			PrintWriter out = new PrintWriter(writer);
			out.println(line);
			out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (Exception e) {
					return null;
				}
			}
		}
		reviews.put(review.getId(), review);
		return review;
	}

	public Review update(String contextPath, Review review) {
		try {
			File file = new File(contextPath + "/reviews.txt");
			BufferedReader in = new BufferedReader(new FileReader(file));
			String line = "", text = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				String id = st.nextToken().trim();
				if (review.getId().equals(id)) {
					text += id + ";"
							+ review.getGuestId() + ";"
							+ review.getApartmentId() + ";"
							+ review.getText() + ";"
							+ review.getStar() + ";"
							+ review.isVisible() + "\r\n";
				} else {
					text += line + "\r\n";
				}
			}
			in.close();
			BufferedWriter writer = new BufferedWriter(new FileWriter(file, false));
			PrintWriter out = new PrintWriter(writer);
			out.println(text);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		loadReviews(contextPath);
		return review;
	}

	public Review delete(String id) {
		// hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return reviews.containsKey(id) ? reviews.remove(id) : null;
	}

	private void loadReviews(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/reviews.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String id = st.nextToken().trim();
					String guestId = st.nextToken().trim();
					String apartmentId = st.nextToken().trim();

					String text = st.nextToken().trim();
					int star = Integer.parseInt(st.nextToken().trim());
					boolean visible = Boolean.parseBoolean(st.nextToken().trim());
					reviews.put(id,
							new Review(id, guestId, apartmentId, text, star, visible));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) { }
			}
		}
	}

	public Collection<Review> findAllByGuestId(String id) {
		Collection<Review> reviews = findAll();
		Collection<Review> testRet = new ArrayList<Review>();
		for (Review r : reviews) {
			if (r.getGuestId().equals(id)) {
				testRet.add(r);
			}
		}
		return testRet;
	}

	public Collection<Review> findAllByApartmentId(String id) {
		Collection<Review> reviews = findAll();
		Collection<Review> retVal = new ArrayList<Review>();
		for (Review r : reviews) {
			if (r.getApartmentId().equals(id)) {
				retVal.add(r);
			}
		}
		return retVal;
	}
}
