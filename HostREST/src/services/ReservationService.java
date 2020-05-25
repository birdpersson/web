package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Reservation;
import dao.ReservationDAO;

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
	}
	
	
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getReservation() {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation getReservation(@PathParam("id") String id) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation setReservation(Reservation review) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.save(review);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation updateReservation(@PathParam("id") String id, Reservation review) {
		ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		return dao.update(id, review);
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
