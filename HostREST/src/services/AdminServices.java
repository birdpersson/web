package services;

import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Admin;
import beans.Test;
import dao.AdminDAO;
import dao.TestDAO;


@Path("/admins")
public class AdminServices {

	@Context
	ServletContext ctx;
	
	public AdminServices() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("adminDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("adminDAO", new AdminDAO(contextPath));
		}
		
		if(ctx.getAttribute("testDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("testDAO", new TestDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Admin> getAllAdmins(){
		AdminDAO daoAdmin = (AdminDAO) ctx.getAttribute("adminDAO");
		TestDAO daoTest = (TestDAO) ctx.getAttribute("testDAO");
		Collection<Admin> retAdm = daoAdmin.findAll();
		
		for(Admin a : retAdm) {
			a.setTests((List<Test>) daoTest.findAllByAdminsId(a.getUsername()));
		}
		return retAdm;
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Admin getAdmin(@PathParam("id") String id) {
		AdminDAO daoAdmin = (AdminDAO) ctx.getAttribute("adminDAO");
		TestDAO daoTest = (TestDAO) ctx.getAttribute("testDAO");
		Admin retAdm = daoAdmin.findOne(id);
		retAdm.setTests((List<Test>) daoTest.findAllByAdminsId(id));
		return retAdm;
	}
	
	//serverska metoda za dodavanje 1 produkta
//	@POST
//	@Path("/")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Admin setAdmin(Admin admin) {
//		AdminDAO dao = (AdminDAO) ctx.getAttribute("adminDAO");
//		return dao.save(admin);
//	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Admin updateHost(@PathParam("id") String id, Admin admin) {
		AdminDAO dao = (AdminDAO) ctx.getAttribute("adminDAO");
		return dao.update(id, admin);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Admin deleteHost(@PathParam("id") String id) {
		AdminDAO dao = (AdminDAO) ctx.getAttribute("adminDAO");
		return dao.delete(id);
	}
	
}
