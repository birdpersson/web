package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.User;

public class UserDAO {

	private Map<String, User> users = new HashMap<>();

	public UserDAO() {
		super();
	}

	public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}

	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}

	public Collection<User> findAll() {
		return users.values();
	}

	public User findOne(String id) {
		return users.containsKey(id) ? users.get(id) : null;
	}

	public User save(String contextPath, User user) {
		String line = user.getUsername() + ";"
				+ user.getFirstname() + ";"
				+ user.getLastname() + ";"
				+ user.getGender() + ";"
				+ user.getRole(); // UNSAFE!
		BufferedWriter writer = null;
		try {
			File file = new File(contextPath + "/users.txt");
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
				}
				catch (Exception e) {
					return null;
				}
			}
		}
		return user;
	}

	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					String firstname = st.nextToken().trim();
					String lastname = st.nextToken().trim();
					String gender = st.nextToken().trim();
					String role = st.nextToken().trim();
					users.put(username, new User(username, password, firstname, lastname, gender, User.Role.valueOf(role)));
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}

}
