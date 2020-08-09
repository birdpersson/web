package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Amenitie;
import dao.AmenitieDAO;
import dao.UserDAO;

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
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAdmins(@Context HttpServletRequest request){
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenitieDAO daoAmenitie = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return  Response.status(Response.Status.OK).entity(daoAmenitie.findAll()).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenitie getAmenitie(@PathParam("id") String id) {
		AmenitieDAO daoAmenitie = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		return daoAmenitie.findOne(id);
	}
	
	//serverska metoda za dodavanje novog sadrzaja
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response setAdmin(@Context HttpServletRequest request, Amenitie amenitie) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.save(amenitie)).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
		
	}
	
	//serverska metoda za editovanje naziva novog sadrzaja
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAmenitie(@Context HttpServletRequest request, @PathParam("id") String id, Amenitie amenitie) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenitieDAO dao = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.update(id, amenitie)).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
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
