package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReviewDAO;
import dao.UserDAO;

@Path("/apartment")
public class ApartmentService {

	@Context
	ServletContext ctx;

	public ApartmentService() {
	}

	@PostConstruct
	public void init() {
//		if (ctx.getAttribute("userDAO") == null) {
//			String contextPath = ctx.getRealPath("");
//			ctx.setAttribute("userDAO", new UserDAO(contextPath));
//		}
//		if (ctx.getAttribute("reservationDAO") == null) {
//			String contextPath = ctx.getRealPath("");
//			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
//		}
		if (ctx.getAttribute("reviewDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reviewDAO", new ReviewDAO(contextPath));
		}
		if (ctx.getAttribute("amenityDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
		if (ctx.getAttribute("locationDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
		if (ctx.getAttribute("apartmentDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO",
					new ApartmentDAO(contextPath, (LocationDAO) ctx.getAttribute("locationDAO"),
							(AmenityDAO) ctx.getAttribute("amenityDAO"), (ReviewDAO) ctx.getAttribute("reviewDAO")));
		}
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Apartment> getAllApartments() {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<Apartment> retApartment = apartmentDAO.findAll();

//		for (Apartment a : retApartment) {
//			a.setReviews((ArrayList<Review>) daoReview.findAllByApartmentId(a.getId()));
//			a.setReservations((ArrayList<Reservation>) daoReser.findAllByApartmentId(a.getId()));
//			a.setAmenities((ArrayList<Amenity>) daoAmen.findAllByApartmentId(a.getId()));
//		}
		return retApartment;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getApartment(@PathParam("id") String id) {
		ApartmentDAO daoApertment = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return daoApertment.findOne(id);
	}

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addApartment(@Context HttpServletRequest request, Apartment apartment) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (!userDao.findOne(username).getRole().toString().equals("HOST")) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		apartment.setHost(username);
		Apartment newApartment = apartmentDao.save(ctx.getRealPath(""), apartment);

		return Response.status(Response.Status.CREATED).entity(newApartment).build();
	}

}
