package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Apartment;
import beans.Host;
import dao.ApartmentDAO;
import dao.HostDAO;

@Path("/hosts")
public class HostServices {
	
	@Context
	ServletContext ctx;
	
	public HostServices() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("hostDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("hostDAO", new HostDAO(contextPath));
		}
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
	}
	
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Host> getHosts() {
		HostDAO daoHost = (HostDAO) ctx.getAttribute("hostDAO");	
		ApartmentDAO daoApart = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<Host> retHosts = daoHost.findAll();
		
		for(Host h : retHosts) {
			h.setApartments((ArrayList<Apartment>) daoApart.findAllApartByHostId(h.getUsername()));
		}
		
		return retHosts;
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Host getHost(@PathParam("id") String id) {
		HostDAO dao = (HostDAO) ctx.getAttribute("hostDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
//	@POST
//	@Path("/")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Host setHost(Host host) {
//		HostDAO dao = (HostDAO) ctx.getAttribute("hostDAO");
//		return dao.save(host);
//	}
	
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Host updateHost(@PathParam("id") String id, Host host) {
		HostDAO dao = (HostDAO) ctx.getAttribute("hostDAO");
		return dao.update(id, host);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Host deleteHost(@PathParam("id") String id) {
		HostDAO dao = (HostDAO) ctx.getAttribute("hostDAO");
		return dao.delete(id);
	}
	
}
