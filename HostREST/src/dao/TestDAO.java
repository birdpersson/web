package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Location;
import beans.Test;

public class TestDAO {
	
	//private List<Klub> klubovi
	private HashMap<String, Test> tests = new HashMap<String, Test>(); 

	public TestDAO() {}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	//KlubManager(String fileName)
	public TestDAO(String contextPath) {
		this();
		loadTests(contextPath);
	}
	

	public Collection<Test> findAll() {
		return tests.values();
	}
	

	public Test findOne(String id) {
		return tests.containsKey(id) ? tests.get(id) : null;
	}
	

	public Test save(Test test) {
		Integer maxId = -1;
		for (String id : tests.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		test.setId(maxId.toString());
		tests.put(test.getId(), test);
		return test;
	}	

	public Test update(String id, Test updatedTest) {
		
		//We retrive host based on id we received as argument.
		Test oldTest = findOne(id);
		
		//if there is not host with such id we save that product as new one.
		if(oldTest == null) {
			System.out.println("Usao u save host u okviru update");
			return save(updatedTest);
		}
		else {
			System.out.println("usao u update product u okviru update");
			//We don't change id of existing host just username, password, firstname and lastname.
			
			oldTest.setIme(updatedTest.getIme());
			oldTest.setPrezime(updatedTest.getPrezime());
//			oldTest.setAddress(updatedTest.getAddress());
			
			//We save old product which is now updated.
			return tests.put(oldTest.getId(), oldTest);
		}
		
	}
	

	public Test delete(String id) {
		//hosts.get(id).isLogicalyRemoved(true); za logicko brisanje...
		return tests.containsKey(id) ? tests.remove(id) : null;
	}
	
	public Collection<Test> findAllByAdminsId(String id) {
		Collection<Test> test =  findAll();
		Collection<Test> testRet = new ArrayList<Test>();
		for(Test t : test) {
			if(t.getAdminsId().equals(id)) {
				testRet.add(t);
			}
		}
		return testRet;
	}	
	

	private void loadTests(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/tests.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			
			String line, id = "";
			String ime = "";	
			String prezime = "";
			String adminsId = "";

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
					ime =  st.nextToken().trim();
					prezime =  st.nextToken().trim();
					adminsId =  st.nextToken().trim();
					
				}
				
				tests.put(id, new Test(id, ime, prezime, adminsId));
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
}