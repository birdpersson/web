package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Apartment;
import beans.Review;
import dao.ApartmentDAO;
import dao.ReviewDAO;
import dao.UserDAO;


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
		
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	
	//Vracanje svih komentara. (za admina i hosta)
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllReviews(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReviewDAO reviewDao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Collection<Review> retVal = new ArrayList<Review>();
		
		if(userDao.findOne(username).getRole().toString().equals("ADMIN")) {
			System.out.println("Usao u ADMIN");
			return Response.status(Response.Status.OK).entity(reviewDao.findAll()).build();
		}
		
		else if(userDao.findOne(username).getRole().toString().equals("HOST")) {
			//Prvo pronalazimo sve stanove vezane za tog hosta...
			Collection<Apartment> hostsApart = apartmentDao.findAllApartByHostId(username);
			System.out.println("Usao u HOST");
			for(Apartment apar : hostsApart) {
				//Prvo zatim pronalazimo sve komentare vezane za svaki stan tog hosta...
				Collection<Review> reviewsByApar = reviewDao.findAllByApartmentId(apar.getId());
				for(Review rev : reviewsByApar) {
					retVal.add(rev);
				}
			}
			return Response.status(Response.Status.OK).entity(retVal).build(); 
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}
	
	
	//Vracanje komentara spram id apartmana. (za guesta)
	@GET
	@Path("/apartment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReviewsByAparmentId(@Context HttpServletRequest request, @PathParam("id") String id) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("GUEST")) {

			return Response.status(Response.Status.OK).entity(dao.findAllByApartmentId(id)).build();
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
//	@GET
//	@Path("/{id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Review getReview(@PathParam("id") String id) {
//		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
//		return dao.findOne(id);
//	}
	//serverska metoda za dodavanje novog komentara (koristi je guset)
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response setReview(@Context HttpServletRequest request, Review review) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("GUEST")) {
			return Response.status(Response.Status.OK).entity(dao.save(review)).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	
	}
	//serverska metoda za izmenu (koristi je host za izmenu statusa)
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReview(@Context HttpServletRequest request, @PathParam("id") String id, Review review) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		
		if(userDao.findOne(username).getRole().toString().equals("HOST")) {
			return Response.status(Response.Status.OK).entity(dao.update(id, review)).build();
		}
		
		return Response.status(Response.Status.FORBIDDEN).build();
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Review deleteReview(@PathParam("id") String id) {
		ReviewDAO dao = (ReviewDAO) ctx.getAttribute("reviewDAO");
		return dao.delete(id);
	}
	
}
