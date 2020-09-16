package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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

import org.glassfish.jersey.media.multipart.ContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.message.internal.ReaderWriter;

import beans.Amenity;
import beans.Apartment;
import beans.ApartmentDTO;
import beans.Reservation;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.LocationDAO;
import dao.ReservationDAO;
import dao.ReviewDAO;
import dao.UserDAO;

@Path("/apartment")
public class ApartmentService {

	@Context
	ServletContext ctx;

	public ApartmentService() {
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
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ApartmentDTO> getAllApartments(@Context HttpServletRequest request) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
    	AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
    	ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");

    	Collection<Apartment> apartments = apartmentDAO.findAll();
		Collection<ApartmentDTO> retApartment = new ArrayList<>();
		
		//za neulogovanog/neregistrovanog korisnika vraca sve aktivne stanove  
		if(username == null) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
		}
		//za guesta vraca sve aktivne stanove  
		else if (userDao.findOne(username).getRole().toString().equals("GUEST")) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
		}
		//za hosta vraca sve njegove aktivne i nekativne stanove
		else if (userDao.findOne(username).getRole().toString().equals("HOST")) {
			
			apartments = apartmentDAO.findAllApartByHostId(username);
//			apartments = apartments.stream()
//					.filter(a ->  a.getStatus().equals("aktivan"))
//					.collect(Collectors.toList());
		}
		else{
			//za admina vraca sve aktivne i neaktivne stanove (mogu ih filtrirati po statusu) 
			//Ovo je besmislena linija koda, ali cisto radi ilustracije slucaja za admina
			apartments = apartments;
		}

		for (Apartment a : apartments) {
			ArrayList<Amenity> amenitiesOriginal = amenityDAO.findAllByApartmentId(ctx.getRealPath(""), a.getId());
			ArrayList<String> amenities = new ArrayList<>();
			for (Amenity amenity : amenitiesOriginal) {
				amenities.add(amenity.getName());
			}
			ApartmentDTO dto = new ApartmentDTO(a.getId(), a.getType(), a.getRooms(), a.getGuests(), a.getLocation(),
					a.getTo(), a.getFrom(), a.getHost(), a.getPrice(), a.getStatus(), amenities);
			retApartment.add(dto);
		}

		return retApartment;
	}

	

	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Apartment> getApartmentsForReviews(@Context HttpServletRequest request) {
	  	String username = AuthService.getUsername(request);

		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
    	ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ReviewDAO reviewDAO = (ReviewDAO) ctx.getAttribute("reviewDAO");

		Collection<Apartment> apartments = apartmentDAO.findAll();
		
		//za neulogovanog/neregistrovanog korisnika vraca sve aktivne stanove  
		if(username == null) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
			for(Apartment apartment : apartments) {
				apartment.setReservations(reservationDAO.findAllByApartmentId(apartment.getId()));
				apartment.setReviews(reviewDAO.findAllByApartmentId(apartment.getId()));
			}

		}
		//za guesta vraca sve aktivne stanove  
		else if (userDao.findOne(username).getRole().toString().equals("GUEST")) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
			for(Apartment apartment : apartments) {
				apartment.setReservations(reservationDAO.findAllByApartmentId(apartment.getId()));
				apartment.setReviews(reviewDAO.findAllByApartmentId(apartment.getId()));
			}
		}
		//za hosta vraca sve njegove aktivne stanove (za nekativne nema pretrage niti filtracije)
		else if (userDao.findOne(username).getRole().toString().equals("HOST")) {
			
			apartments = apartmentDAO.findAllApartByHostId(username);
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
			for(Apartment apartment : apartments) {
				apartment.setReservations(reservationDAO.findAllByApartmentId(apartment.getId()));
				apartment.setReviews(reviewDAO.findAllByApartmentId(apartment.getId()));
			}
		}
		else{
			//za admina vraca sve aktivne i neaktivne stanove (mogu ih filtrirati po statusu) 
			//Ovo je besmislena linija koda, ali cisto radi ilustracije slucaja za admina
			apartments = apartments;
			for(Apartment apartment : apartments) {
				apartment.setReservations(reservationDAO.findAllByApartmentId(apartment.getId()));
				apartment.setReviews(reviewDAO.findAllByApartmentId(apartment.getId()));
			}
		}
		
		return apartments;
	}
	
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getApartment(@PathParam("id") String id) {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ReviewDAO reviewDAO = (ReviewDAO) ctx.getAttribute("reviewDAO");
		Apartment apartment = apartmentDAO.findOne(id);
		apartment.setReservations(reservationDAO.findAllByApartmentId(id));
		apartment.setReviews(reviewDAO.findAllByApartmentId(id));
		return apartment;
	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateApartment(@Context HttpServletRequest request, Apartment apartment) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (!userDao.findOne(username).getRole().toString().equals("HOST")) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return Response.status(Response.Status.CREATED).entity(apartmentDao.update(ctx.getRealPath(""), apartment)).build();
	}

	@DELETE
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteApartment(@Context HttpServletRequest request, @PathParam("id") String id) {
		String username = AuthService.getUsername(request);
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (userDao.findOne(username).getRole().toString().equals("GUEST")) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
		ApartmentDAO apartmentDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Apartment apartment = apartmentDao.findOne(id);
		apartment.setDeleted(true);
		return Response.status(Response.Status.CREATED)
				.entity(apartmentDao.update(ctx.getRealPath(""), apartment)).build();
	}

    @GET
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchApartments(@Context HttpServletRequest request, 
			@QueryParam("location") String location,
			@QueryParam("from") Long from,
			@QueryParam("to") Long to,
			@QueryParam("roomsMin") Long roomsMin,
			@QueryParam("roomsMax") Long roomsMax,
			@QueryParam("guests") Long guests,
			@QueryParam("priceMin") Long priceMin,
			@QueryParam("priceMax") Long priceMax) {

    	//Obrisati na kraju
    	System.out.println("location: " + location);
    	System.out.println("from: " + from);
    	System.out.println("to: " + to);
    	System.out.println("roomsMin: " + roomsMin);
    	System.out.println("roomsMax: " + roomsMax);
    	System.out.println("guests: " + guests);
    	System.out.println("priceMin: " + priceMin);
    	System.out.println("priceMax: " + priceMax);

    	String username = AuthService.getUsername(request);

		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
    	ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");		
		Collection<Apartment> apartments = apartmentDAO.findAll();

		//za neulogovanog/neregistrovanog korisnika vraca sve aktivne stanove  
		if(username == null) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
		}
		//za guesta vraca sve aktivne stanove  
		else if (userDao.findOne(username).getRole().toString().equals("GUEST")) {
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
		}
		//za hosta vraca sve njegove aktivne stanove (za nekativne nema pretrage niti filtracije)
		else if (userDao.findOne(username).getRole().toString().equals("HOST")) {
			
			apartments = apartmentDAO.findAllApartByHostId(username);
			apartments = apartments.stream()
					.filter(a ->  a.getStatus().equals("aktivan"))
					.collect(Collectors.toList());
		}
		else{
			//za admina vraca sve aktivne i neaktivne stanove (mogu ih filtrirati po statusu) 
			//Ovo je besmislena linija koda, ali cisto radi ilustracije slucaja za admina
			apartments = apartments;
		}
 
		if(location != null) {
			apartments = apartments.stream()
				.filter(l -> l.getLocation().getAddress().getCity().toLowerCase().contains(location.toLowerCase()))
				.collect(Collectors.toList());
		}
		if(priceMin != null) {
			apartments = apartments.stream()
				.filter(a -> a.getPrice() >= priceMin)
				.collect(Collectors.toList());
		}
		if(priceMax != null) {
			apartments = apartments.stream()
				.filter(a -> a.getPrice() <= priceMax)
				.collect(Collectors.toList());
		}
		if(guests != null) {
			apartments = apartments.stream()
				.filter(a -> a.getGuests() >= guests)
				.collect(Collectors.toList());
		}
		if(roomsMin != null) {
			apartments = apartments.stream()
				.filter(a -> a.getRooms() >= roomsMin)
				.collect(Collectors.toList());
		}
		if(roomsMax != null) {
			apartments = apartments.stream()
				.filter(a -> a.getRooms() <= roomsMax)
				.collect(Collectors.toList());
		}
		if (from != null) {
			apartments = apartments.stream()
					.filter(a -> a.getTo() < from)
					.collect(Collectors.toList());
		}
		if (to != null) {
			apartments = apartments.stream()
					.filter(a -> a.getFrom() > to)
					.collect(Collectors.toList());
		}
		if (from != null && to != null) {
			apartments = apartments.stream()
					.filter(apartment -> {
						Collection<Reservation> reservations = apartment.getReservations().stream()
								.filter(r -> (r.getFrom() < from && r.getTo() > from
											|| r.getFrom() > from && r.getTo() < to
											|| r.getFrom() < to && r.getTo() > to
										))
								.collect(Collectors.toList());
						return reservations.isEmpty();
					})
					.collect(Collectors.toList());
		}

		return Response.status(Response.Status.OK).entity(apartments).build();
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

	@POST
	@Path("/{id}/upload")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadPhotos(@Context HttpServletRequest request, @PathParam("id") String id,
			FormDataMultiPart multiPart) {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		List<FormDataBodyPart> fields = multiPart.getFields("image");
		for (FormDataBodyPart filePart : fields) {
			ContentDisposition fileDetail = filePart.getContentDisposition();

			// TODO: Check if paths work on windows
			String path = ctx.getRealPath("") + "images/" + id;
			new File(path).mkdirs();
			File file = new File(path, fileDetail.getFileName());

			try (FileOutputStream out = new FileOutputStream(file)) {
				ReaderWriter.writeTo(filePart.getEntityAs(InputStream.class), out);
				apartmentDAO.saveImage(ctx.getRealPath(""), "images/" + id + "/" + fileDetail.getFileName(), id);
			} catch (IOException e) {
				e.printStackTrace();
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			}
		}
		return Response.status(Response.Status.CREATED).build();
	}

}
