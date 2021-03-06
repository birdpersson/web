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

	public AmenityService() {
		super();
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("amenityDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAmenities(@Context HttpServletRequest request) {
		AmenityDAO daoAmenity = (AmenityDAO) ctx.getAttribute("amenityDAO");
		return Response.status(Response.Status.OK).entity(daoAmenity.findAll()).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity getAmenity(@PathParam("id") String id) {
		AmenityDAO daoAmenity = (AmenityDAO) ctx.getAttribute("amenityDAO");
		return daoAmenity.findOne(id);
	}

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response setAmenity(@Context HttpServletRequest request, Amenity amenity) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenityDAO");

		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.save(ctx.getRealPath(""), amenity)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();

	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAmenity(@Context HttpServletRequest request, @PathParam("id") String id, Amenity amenity) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenityDAO");

		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.OK).entity(dao.update(ctx.getRealPath(""), amenity)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteAmenity(@Context HttpServletRequest request, @PathParam("id") String id) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (!userDao.findOne(username).getRole().toString().equals("ADMIN"))
			return Response.status(Response.Status.FORBIDDEN).build();
		AmenityDAO amenityDao = (AmenityDAO) ctx.getAttribute("amenityDAO");
		Amenity amenity = amenityDao.findOne(id);
		amenity.setDeleted(true);
		return Response.status(Response.Status.CREATED)
				.entity(amenityDao.update(ctx.getRealPath(""), amenity)).build();
	}

	@PUT
	@Path("/{id}/apartments/{apartId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity addToApartment(@PathParam("id") String id, @PathParam("apartId") String aprtId) {
		AmenityDAO dao = (AmenityDAO) ctx.getAttribute("amenityDAO");
		return dao.addToApartmen(id, aprtId);
	}

}
