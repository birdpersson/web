package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Review;
import dao.ReviewDAO;


@Path("/reviews")
public class ReviewsServices {
	
	@Context
	ServletContext ctx;

	public ReviewsServices() {}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira više puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if(ctx.getAttribute("reviewDAO")==null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reviewDAO", new ReviewDAO(contextPath));
		}
	}
	
	
	//serverska metoda za vracanje svih produkata
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Review> getReview() {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Review getReview(@PathParam("id") String id) {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.findOne(id);
	}
	
	
	//serverska metoda za dodavanje 1 produkta
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Review setReview(Review review) {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.save(review);
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Review updateReview(@PathParam("id") String id, Review review) {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.update(id, review);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Review deleteReview(@PathParam("id") String id) {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.delete(id);
	}
}
