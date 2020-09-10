package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.Reservation;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReservationDAO;
import dao.ReviewDAO;
import dao.UserDAO;

@Path("")
public class UserService {

	@Context
	ServletContext ctx;

	public UserService() {
		super();
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		if (ctx.getAttribute("locationDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
		if (ctx.getAttribute("amenityDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
		if (ctx.getAttribute("reservationDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
		if (ctx.getAttribute("reviewDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reviewDAO", new ReviewDAO(contextPath));
		}
		if (ctx.getAttribute("apartmentDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath,
					(LocationDAO) ctx.getAttribute("locationDAO"), (AmenityDAO) ctx.getAttribute("amenityDAO"),
					(ReservationDAO) ctx.getAttribute("reservationDAO"), (ReviewDAO) ctx.getAttribute("reviewDAO")));
		}
	}

	@GET
	@Path("profile/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProfile(@Context HttpServletRequest request, @PathParam("username") String username) {
		if (AuthService.getUsername(request).equals(username)) {
			UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
			User user = userDAO.findOne(username);
			return Response.status(Response.Status.OK).entity(user).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@PUT
	@Path("profile/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editProfile(@Context HttpServletRequest request, @PathParam("username") String username,
			User user) {
		if (AuthService.getUsername(request).equals(username)) {
			UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
			User newUser = userDAO.update(ctx.getRealPath(""), user);
			return Response.status(Response.Status.CREATED).entity(newUser).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@GET
	@Path("user/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsers(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			Collection<User> users = userDao.findAll();
			return Response.status(Response.Status.OK).entity(users).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	// PROVERITI!!!!!!!
	@GET
	@Path("user/customers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsersByApartment(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO reservationDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<User> retVal = new ArrayList<User>();

		if (userDao.findOne(username).getRole().toString().equals("HOST")) {
			// Prvo pronalazimo sve stanove vezane za tog hosta...
			Collection<Apartment> hostsApart = apartmentDao.findAllApartByHostId(username);
			for (Apartment apar : hostsApart) {

				// Zatim pronalazimo sve korisnike koji imaju trenutnu rezervaciju za neki stan
				// tog hosta...
				Collection<Reservation> reservations = reservationDao.findAllByApartmentId(apar.getId());
				for (Reservation r : reservations) {
					User user = userDao.findOne(r.getGuestId());
					if (!retVal.contains(user))
						retVal.add(user);
				}
//				User guestByApar = userDao.findOne(reservationDao.findGuestByApartmentId(apar.getId()));
//				retVal.add(guestByApar);
			}
			return Response.status(Response.Status.OK).entity(retVal).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

//	//Vracanje komentara spram id hosta. (za hosta)
//	@GET
//	@Path("/apartmentHost")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response getReviewsByHostId(@Context HttpServletRequest request, @QueryParam("id") String hostId) {
//		String username = AuthService.getUsername(request);
//		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
//		ReviewDAO reviewDao = (ReviewDAO) ctx.getAttribute("reviewDAO");
//		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
//		Collection<Review> retVal = new ArrayList<Review>();
//		
//		if(userDao.findOne(username).getRole().toString().equals("HOST")) {
//			//Prvo pronalazimo sve stanove vezane za tog hosta...
//			Collection<Apartment> hostsApart = apartmentDao.findAllApartByHostId(hostId);
//			for(Apartment apar : hostsApart) {
//				
//				//Prvo zatim pronalazimo sve komentare vezane za svaki stan tog hosta...
//				Collection<Review> reviewsByApar = reviewDao.findAllByApartmentId(apar.getId());
//				for(Review rev : reviewsByApar) {
//					retVal.add(rev);
//				}
//			}
//			return Response.status(Response.Status.OK).entity(retVal).build(); 
//		}
//		return Response.status(Response.Status.FORBIDDEN).build();
//	}

}
