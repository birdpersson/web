package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Amenitie;
import dao.AmenitieDAO;

@Path("/amenities")
public class AmenitieService {

	@Context
	ServletContext ctx;
	
	public AmenitieService() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira više puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("amenitieDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenitieDAO", new AmenitieDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Amenitie> getAllAdmins(){
		AmenitieDAO daoAmenitie = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return  daoAmenitie.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie getAmenitie(@PathParam("id") String id) {
		AmenitieDAO daoAmenitie = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return daoAmenitie.findOne(id);
	}
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie setAdmin(Amenitie amenitie) {
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return dao.save(amenitie);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie updateAmenitie(@PathParam("id") String id, Amenitie amenitie) {
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return dao.update(id, amenitie);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie deleteHost(@PathParam("id") String id) {
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return dao.delete(id);
	}
	
	@PUT
	@Path("/{id}/apartments/{apartId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie addToApartment(@PathParam("id") String id,@PathParam("apartId") String aprtId) {
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return dao.addToApartmen(id, aprtId);
	}
	
}
