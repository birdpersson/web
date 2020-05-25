package services;

import java.util.ArrayList;
import java.util.Collection;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Apartment;
import beans.Guest;
import beans.Reservation;
import beans.Review;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.ReservationDAO;
import dao.ReviewDAO;

@Path("/guests")
public class GuestServices {

	@Context
	ServletContext ctx;
	
	public GuestServices() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira više puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("guestDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("guestDAO", new GuestDAO(contextPath));
		}
		
		if(ctx.getAttribute("apartmentDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
		
		if(ctx.getAttribute("reviewDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reviewDAO", new ReviewDAO(contextPath));
		}
		
		if(ctx.getAttribute("reservationDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
	}
		
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Guest> getGuests() {
		GuestDAO daoGuest = (GuestDAO) ctx.getAttribute("guestDAO");
		ReviewDAO daoReview = (ReviewDAO) ctx.getAttribute("reviewDAO");
		ReservationDAO daoReser = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO daoApart = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<Guest> retGuests = daoGuest.findAll();
		
		for(Guest g : retGuests) {
			g.setReviews((ArrayList<Review>) daoReview.findAllByGuestId(g.getId()));
			g.setReservations((ArrayList<Reservation>) daoReser.findAllByGuestId(g.getId()));
			g.setApartments((ArrayList<Apartment>) daoApart.findAllApartByGuestId(g.getId()));
		}
		return retGuests;

	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Guest getGuest(@PathParam("id") String id) {
		GuestDAO dao = (GuestDAO) ctx.getAttribute("guestDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Guest setGuest(Guest host) {
		GuestDAO dao = (GuestDAO) ctx.getAttribute("guestDAO");
		return dao.save(host);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Guest updateGuest(@PathParam("id") String id, Guest guest) {
		GuestDAO dao = (GuestDAO) ctx.getAttribute("guestDAO");
		return dao.update(id, guest);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Guest deleteGuest(@PathParam("id") String id) {
		GuestDAO dao = (GuestDAO) ctx.getAttribute("guestDAO");
		return dao.delete(id);
	}
			
}
