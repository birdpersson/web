package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.Reservation;
import beans.ReservationDTO;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReservationDAO;
import dao.ReviewDAO;
import dao.UserDAO;

@Path("/reservation")
public class ReservationService {
	@Context
	ServletContext ctx;

	public ReservationService() {
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

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addReservation(@Context HttpServletRequest request, Reservation reservation) {
		if (!AuthService.getUsername(request).equals(reservation.getGuestId())) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (!userDao.findOne(username).getRole().toString().equals("GUEST")) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
		ReservationDAO reservationDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation newReservation = reservationDao.save(ctx.getRealPath(""), reservation);

		return Response.status(Response.Status.CREATED).entity(newReservation).build();
	}

	@GET
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchReservation(@Context HttpServletRequest request,
			@QueryParam("username") String queryUsername) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO reservDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
//		LocationDAO locatDao = (LocationDAO) ctx.getAttribute("locationDAO");
		Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();

		if (!userDao.findOne(username).getRole().toString().equals("GUEST")) {

			Collection<Reservation> reserv = reservDao.findAllByGuestId(queryUsername);

			for (Reservation r : reserv) {

				ReservationDTO reservDTO = new ReservationDTO();
				Apartment apartm = apartDao.findOne(r.getApartmentId());
				if (apartm == null ) {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}

				// smestaju se vrednost iz objekta reservation i apartment u jedan objekat.
				reservDTO.setId(r.getId());
				reservDTO.setApartmentId(r.getApartmentId());
				reservDTO.setGuestId(r.getGuestId());
				reservDTO.setFrom(r.getFrom());
				reservDTO.setTo(r.getTo());
				reservDTO.setNight(r.getNight());
				reservDTO.setPrice(r.getPrice());
				reservDTO.setConfirmation(r.getConfirmation());
				reservDTO.setMessage(r.getMessage());
				reservDTO.setStatus(r.getStatus());

				// Za apartman detalji:
				if (apartm.getType() == null) {
					reservDTO.setType(null);
				} else {
					reservDTO.setType(apartm.getType());
				}
				// Za lokaciju apartmana:
				reservDTO.setAddress(apartm.getLocation().getAddress().getStreet());


				// vraca se lista reservacija sa svim podacima;
				returnDTO.add(reservDTO);

			}

			return Response.status(Response.Status.OK).entity(returnDTO).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReservation(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO reservDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		Collection<Reservation> allReservations = new ArrayList<Reservation>();
		Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();

		// Prolazi kroz sve dobavljene rezervacije i za svaku dobavlja podatke o stanu
		// na koji se ta rezervacija odnosi.
		if (userDao.findOne(username).getRole().toString().equals("ADMIN")) {

			allReservations = reservDao.findAll();
			returnDTO = getReservationsDTO(allReservations, username, "ADMIN");
			return Response.status(Response.Status.OK).entity(returnDTO).build();

		} else if (userDao.findOne(username).getRole().toString().equals("GUEST")) {

			allReservations = reservDao.findAllByGuestId(username);
			returnDTO = getReservationsDTO(allReservations, username, "GUEST");
			return Response.status(Response.Status.OK).entity(returnDTO).build();
		}

		else if (userDao.findOne(username).getRole().toString().equals("HOST")) {

			allReservations = reservDao.findAll();
			returnDTO = getReservationsDTO(allReservations, username, "HOST");
			return Response.status(Response.Status.OK).entity(returnDTO).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

	public Collection<ReservationDTO> getReservationsDTO(Collection<Reservation> allReservations, String username,
			String role) {
//		LocationDAO locatDao = (LocationDAO) ctx.getAttribute("locationDAO");
		ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();

		for (Reservation r : allReservations) {

			// pomocne promenljive
			ReservationDTO reservDTO = new ReservationDTO();
			Apartment apartm = apartDao.findOne(r.getApartmentId());
//			Location locat = locatDao.findLocatByApartId(r.getApartmentId());

			if (apartm == null /* || locat == null */) {
				return null;
			}
			// Provera da li je rola usera Host
			if (role == "HOST") {
				// Provera da li stan pripada tom hostu koji je ulogovan.
				if (!apartm.getHost().equals(username)) {
					continue;
				}
			}

			// smestaju se vrednost iz objekta reservation i apartment u jedan objekat.
			reservDTO.setId(r.getId());
			reservDTO.setApartmentId(r.getApartmentId());
			reservDTO.setGuestId(r.getGuestId());
			reservDTO.setFrom(r.getFrom());
			reservDTO.setTo(r.getTo());
//			reservDTO.setDate(r.getDate());
			reservDTO.setNight(r.getNight());
			reservDTO.setPrice(r.getPrice());
			reservDTO.setConfirmation(r.getConfirmation());
			reservDTO.setMessage(r.getMessage());
			reservDTO.setStatus(r.getStatus());

			// Za apartman detalji:
			if (apartm.getType() == null) {
				reservDTO.setType(null);
//					return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				reservDTO.setType(apartm.getType());
			}
			// Za lokaciju apartmana:
			reservDTO.setAddress(apartm.getLocation().getAddress().getStreet());

			// vraca se lista reservacija sa svim podacima;
			returnDTO.add(reservDTO);
		}
		return returnDTO;
	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReservation(@Context HttpServletRequest request, @PathParam("id") String id,
			Reservation reservation) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");

		if (!userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			return Response.status(Response.Status.CREATED).entity(dao.update(ctx.getRealPath(""), reservation)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}

//	@PUT
//	@Path("/{id}/changeStatus/{status}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Reservation updateReservation(@PathParam("id") String id, @PathParam("status") String status) {
//		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
//		return dao.changeStatus(id, status);
//	}
}

