package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.apache.jasper.tagplugins.jstl.core.ForEach;

import beans.Apartment;
import beans.Review;
import dao.ApartmentDAO;
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
		
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
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
	
	//Vracanje komentara spram id apartmana. (za guesta)
	@GET
	@Path("/apartment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Review> getReviewsByAparmentId(@PathParam("id") String id) {
		System.out.println("Usao je u getReviewsByAparmentId: " + id);
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.findAllByApartmentId(id);
	}
	
	//Vracanje komentara spram id hosta. (za hosta)
	@GET
	@Path("/apartmentHost")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Review> getReviewsByHostId(@QueryParam("id") String hostId) {
		ReviewDAO reviewDao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<Review> retVal = new ArrayList<Review>();
		
		Collection<Apartment> hostsApart = apartmentDao.findAllApartByHostId(hostId);
		for(Apartment apar : hostsApart) {
			
			Collection<Review> reviewsByApar = reviewDao.findAllByApartmentId(apar.getId());
			
			for(Review rev : reviewsByApar) {
				retVal.add(rev);
			}
		}
		return retVal; 
	}
	
	
}
