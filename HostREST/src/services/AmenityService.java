package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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
import javax.ws.rs.core.Response;

import beans.Amenity;
import dao.AmenityDAO;
import dao.UserDAO;

@Path("/amenity")
public class AmenityService {

	@Context
	ServletContext ctx;

	public AmenityService() {}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("amenitieDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenitieDAO", new AmenityDAO(contextPath));
		}
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAdmins(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenityDAO daoAmenitie = (AmenityDAO) ctx.getAttribute("amenitieDAO");

		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(daoAmenitie.findAll()).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity getAmenitie(@PathParam("id") String id) {
		AmenityDAO daoAmenitie = (AmenityDAO) ctx.getAttribute("amenitieDAO");
		return daoAmenitie.findOne(id);
	}

	// serverska metoda za dodavanje novog sadrzaja
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response setAdmin(@Context HttpServletRequest request, Amenity amenitie) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenitieDAO");

		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.save(amenitie)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();

	}

	// serverska metoda za editovanje naziva novog sadrzaja
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAmenitie(@Context HttpServletRequest request, @PathParam("id") String id, Amenity amenitie) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenitieDAO");

		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.update(id, amenitie)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity deleteHost(@PathParam("id") String id) {
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenitieDAO");
		return dao.delete(id);
	}

	@PUT
	@Path("/{id}/apartments/{apartId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity addToApartment(@PathParam("id") String id, @PathParam("apartId") String aprtId) {
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenitieDAO");
		return dao.addToApartmen(id, aprtId);
	}

}
