package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Amenitie;
import beans.Apartment;
import beans.Reservation;
import beans.Review;
import dao.AmenitieDAO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReservationDAO;
import dao.ReviewDAO;


@Path("/apartments")
public class ApartmentServices  {
	@Context
	ServletContext ctx;
	
	public ApartmentServices() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
		
		if (ctx.getAttribute("locationDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
		
		if (ctx.getAttribute("reviewDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reviewDAO", new ReviewDAO(contextPath));
		}
		
		if (ctx.getAttribute("reservationDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
		
		if (ctx.getAttribute("amenitieDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenitieDAO", new AmenitieDAO(contextPath));
		}
	}
	
	
	//serverska metoda za vracanje svih produkata
		@GET
		@Path("/")
		@Produces(MediaType.APPLICATION_JSON)
		public Collection<Apartment> getApartments() {
			ApartmentDAO daoApartment = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
			ReviewDAO daoReview = (ReviewDAO) ctx.getAttribute("reviewDAO");
			ReservationDAO daoReser = (ReservationDAO) ctx.getAttribute("reservationDAO");
			LocationDAO daoLoc = (LocationDAO) ctx.getAttribute("locationDAO");
			AmenitieDAO daoAmen = (AmenitieDAO) ctx.getAttribute("amenitieDAO");
			Collection<Apartment> retApartment = daoApartment.findAll();
			
			for(Apartment a : retApartment) {
				a.setReviews((ArrayList<Review>) daoReview.findAllByApartmentId(a.getId()));
				a.setReservations((ArrayList<Reservation>) daoReser.findAllByApartmentId(a.getId()));
				a.setLocation(daoLoc.findLocatByApartId(a.getId()));
				a.setAmenities((ArrayList<Amenitie>) daoAmen.findAllByApartmentId(a.getId()));
			}
			return retApartment;
		}
}
