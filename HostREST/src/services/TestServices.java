package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Test;
import dao.TestDAO;

@Path("/tests")
public class TestServices {
	@Context
	ServletContext ctx;
	
	public TestServices(){}

	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira više puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("testDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("testDAO", new TestDAO(contextPath));
		}
	}
	
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Test> getTests() {
		TestDAO dao = (TestDAO) ctx.getAttribute("testDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Test getTest(@PathParam("id") String id) {
		TestDAO dao = (TestDAO) ctx.getAttribute("testDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Test setTest(Test test) {
		TestDAO dao = (TestDAO) ctx.getAttribute("testDAO");
		return dao.save(test);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Test updateLocation(@PathParam("id") String id, Test test) {
		TestDAO dao = (TestDAO) ctx.getAttribute("testDAO");
		return dao.update(id, test);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Test deleteTest(@PathParam("id") String id) {
		TestDAO dao = (TestDAO) ctx.getAttribute("testDAO");
		return dao.delete(id);
	}
}
