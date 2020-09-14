package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Location;
import dao.LocationDAO;

@Path("/locations")
public class LocationService {
	
	@Context
	ServletContext ctx;
	
	public LocationService(){}

	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("locationDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
	}
	
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Location> getLocations() {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Location getLocation(@PathParam("id") String id) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Location setLocation(Location location) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.save(ctx.getRealPath(""), location);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Location updateLocation(@PathParam("id") String id, Location location) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.update(ctx.getRealPath(""), location);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Location deleteLocation(@PathParam("id") String id) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.delete(id);
	}
}
