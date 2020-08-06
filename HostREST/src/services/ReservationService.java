package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Apartment;
import beans.Location;
import beans.Reservation;
import beans.ReservationDTO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReservationDAO;
import dao.UserDAO;

@Path("/reservations")
public class ReservationService {
	@Context
	ServletContext ctx;
	
	public ReservationService() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira više puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("reservationDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
		
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
		
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		
		if(ctx.getAttribute("locationDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
	}
	
	
	//serverska metoda za vracanje svih produkata
	//	@GET
	//	@Path("/")
	//	@Produces(MediaType.APPLICATION_JSON)
	//	public Collection<Reservation> getReservation() {
	//		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
	//		return dao.findAll();
	//	}
	
	//	@GET
	//	@Path("/{id}")
	//	@Produces(MediaType.APPLICATION_JSON)
	//	public Reservation getReservation(@PathParam("id") String id) {
	//		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
	//		return dao.findOne(id);
	//	}
	
	
	//Vrati sve rezervacije od tog guesta.
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getGuestsReservation(@Context HttpServletRequest request, @PathParam("id") String guestId) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO reservDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		LocationDAO locatDao = (LocationDAO) ctx.getAttribute("locationDAO");
		Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();
		
		if(userDao.findOne(username).getRole().toString().equals("GUEST")) {
			//Prolazi kroz sve dobavljene rezervacije i za svaku dobavlja podatke o stanu 
			//na koji se ta rezervacija odnosi.
			Collection<Reservation> allReservations = reservDao.findAllByGuestId(guestId);
			for(Reservation r : allReservations) {
				//pomocne promenljive
				ReservationDTO reservDTO = new ReservationDTO();
				Apartment apartm = apartDao.findOne(r.getApartmentId());
				Location locat = locatDao.findLocatByApartId(r.getApartmentId());
				if(apartm == null || locat == null) {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				
				//smestaju se vrednost iz objekta reservation i apartment u jedan objekat.
				reservDTO.setId(r.getId());
				reservDTO.setApartmentId(r.getApartmentId());
				reservDTO.setGuestId(r.getGuestId());
				reservDTO.setDate(r.getDate());
				reservDTO.setNight(r.getNight());
				reservDTO.setPrice(r.getPrice());
				reservDTO.setConfirmation(r.getConfirmation());
				reservDTO.setMessage(r.getMessage());
				reservDTO.setStatus(r.getStatus());
	
				//Za apartman detalji:
				if(apartm.getType()==null) {
					reservDTO.setType(null);
//					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					reservDTO.setType(apartm.getType());
				}
				//Za lokaciju apartmana:
				if(locat.getAddress()==null) {
					reservDTO.setAddress("unknown");
//					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					reservDTO.setAddress(locat.getAddress());
				}
				
				//vraca se lista reservacija sa svim podacima;
				returnDTO.add(reservDTO);
			}
			return Response.status(Response.Status.OK).entity(returnDTO).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
	}
	
	
	//Vrati sve rezervacije za admina.
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAdminsReservation(@Context HttpServletRequest request,@QueryParam("id") String hostId) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO reservDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		LocationDAO locatDao = (LocationDAO) ctx.getAttribute("locationDAO");
		ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();
		
		if(userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			//Prolazi kroz sve dobavljene rezervacije i za svaku dobavlja podatke o stanu 
			//na koji se ta rezervacija odnosi.
			Collection<Reservation> allReservations = reservDao.findAll();
			for(Reservation r : allReservations) {
				
				//pomocne promenljive
				ReservationDTO reservDTO = new ReservationDTO();
				Apartment apartm = apartDao.findOne(r.getApartmentId());
				Location locat = locatDao.findLocatByApartId(r.getApartmentId());
				
				if(apartm == null || locat == null) {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				
				//smestaju se vrednost iz objekta reservation i apartment u jedan objekat.
				reservDTO.setId(r.getId());
				reservDTO.setApartmentId(r.getApartmentId());
				reservDTO.setGuestId(r.getGuestId());
				reservDTO.setDate(r.getDate());
				reservDTO.setNight(r.getNight());
				reservDTO.setPrice(r.getPrice());
				reservDTO.setConfirmation(r.getConfirmation());
				reservDTO.setMessage(r.getMessage());
				reservDTO.setStatus(r.getStatus());
				
				//Za apartman detalji:
				if(apartm.getType()==null) {
					reservDTO.setType(null);
//						return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					reservDTO.setType(apartm.getType());
				}
				//Za lokaciju apartmana:
				if(locat.getAddress()==null) {
					reservDTO.setAddress("unknown");
//						return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					reservDTO.setAddress(locat.getAddress());
				}
				
				//vraca se lista reservacija sa svim podacima;
				returnDTO.add(reservDTO);
			}
			return Response.status(Response.Status.OK).entity(returnDTO).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
	}
	
		
		
		//Vrati sve rezervacije od stanova tog hosta.
		@GET
		@Path("/hostsReservations")
		@Produces(MediaType.APPLICATION_JSON)
		public Response getHostsReservation(@Context HttpServletRequest request,@QueryParam("id") String hostId) {
			String username = AuthService.getUsername(request);
			UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
			ReservationDAO reservDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
			ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
			LocationDAO locatDao = (LocationDAO) ctx.getAttribute("locationDAO");
			Collection<ReservationDTO> returnDTO = new ArrayList<ReservationDTO>();
			
			if(userDao.findOne(username).getRole().toString().equals("HOST")) {
				//Prolazi kroz sve dobavljene rezervacije i za svaku dobavlja podatke o stanu 
				//na koji se ta rezervacija odnosi.
				Collection<Reservation> allReservations = reservDao.findAll();
				for(Reservation r : allReservations) {
					//pomocne promenljive
					ReservationDTO reservDTO = new ReservationDTO();
					Apartment apartm = apartDao.findOne(r.getApartmentId());
					Location locat = locatDao.findLocatByApartId(r.getApartmentId());
					
					if(apartm == null || locat == null) {
						return Response.status(Response.Status.BAD_REQUEST).build();
					}
					
					//Provera da li stan pripada tom hostu koji je ulogovan.
					else if(!apartm.getHostId().equals(username)) {
						continue;
					}
					//smestaju se vrednost iz objekta reservation i apartment u jedan objekat.
					reservDTO.setId(r.getId());
					reservDTO.setApartmentId(r.getApartmentId());
					reservDTO.setGuestId(r.getGuestId());
					reservDTO.setDate(r.getDate());
					reservDTO.setNight(r.getNight());
					reservDTO.setPrice(r.getPrice());
					reservDTO.setConfirmation(r.getConfirmation());
					reservDTO.setMessage(r.getMessage());
					reservDTO.setStatus(r.getStatus());
				
					//Za apartman detalji:
					if(apartm.getType()==null) {
						reservDTO.setType(null);
//								return Response.status(Response.Status.BAD_REQUEST).build();
					}
					else {
						reservDTO.setType(apartm.getType());
					}
					//Za lokaciju apartmana:
					if(locat.getAddress()==null) {
						reservDTO.setAddress("unknown");
//								return Response.status(Response.Status.BAD_REQUEST).build();
					}
					else {
						reservDTO.setAddress(locat.getAddress());
					}
					
					//vraca se lista reservacija sa svim podacima;
					returnDTO.add(reservDTO);
				}
				return Response.status(Response.Status.OK).entity(returnDTO).build();
			}
			return  Response.status(Response.Status.FORBIDDEN).build();
		}
		
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation setReservation(Reservation reservation) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.save(reservation);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReservation(@Context HttpServletRequest request, 
			@PathParam("id") String id, Reservation reservation) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("GUEST")) {
			return Response.status(Response.Status.OK).entity(dao.update(id, reservation)).build();
		}
		return  Response.status(Response.Status.FORBIDDEN).build();
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation deleteReservation(@PathParam("id") String id) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.delete(id);
	}
	
	
	@PUT
	@Path("/{id}/changeStatus/{status}")
	
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation updateReservation(@PathParam("id") String id,@PathParam("status") String status) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.changeStatus(id, status);
	}
}
