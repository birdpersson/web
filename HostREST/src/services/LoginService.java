package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Admin;
import beans.Guest;
import beans.Host;
import beans.User;
import dao.AdminDAO;
import dao.GuestDAO;
import dao.HostDAO;

@Path("")
public class LoginService {

	@Context
	ServletContext ctx;

	public LoginService() {

	}

	@PostConstruct
	public void init() {

		if (ctx.getAttribute("adminDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("adminDAO", new AdminDAO(contextPath));
		}

		if (ctx.getAttribute("guestDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("guestDAO", new GuestDAO(contextPath));
		}

		if (ctx.getAttribute("hostDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("hostDAO", new HostDAO(contextPath));
		}

	}

	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		AdminDAO adminDao = (AdminDAO) ctx.getAttribute("adminDAO");
		GuestDAO guestDao = (GuestDAO) ctx.getAttribute("guestDAO");
		HostDAO hostDao = (HostDAO) ctx.getAttribute("hostDAO");

		Admin loggedAdmin = adminDao.find(user.getUsername(), user.getPassword());
		Guest loggedGuest = guestDao.find(user.getUsername(), user.getPassword());
		Host loggedHost = hostDao.find(user.getUsername(), user.getPassword());

		if (loggedAdmin != null) {
			request.getSession().setAttribute("admin", loggedAdmin);
			return Response
					.status(Response.Status.OK)
					.entity(loggedAdmin)
					.build();
		}

		if (loggedGuest != null) {
			request.getSession().setAttribute("guest", loggedGuest);
			return Response
					.status(Response.Status.OK)
					.entity(loggedGuest)
					.build();
		}

		if (loggedHost != null) {
			request.getSession().setAttribute("host", loggedHost);
			return Response
					.status(Response.Status.OK)
					.entity(loggedHost)
					.build();
		}

		return Response
				.status(Response.Status.BAD_REQUEST)
				.entity("Invalid username and/or password")
				.build();
	}

	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}

//	@GET
//	@Path("/currentUser")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public User login(@Context HttpServletRequest request) {
//		return (User) request.getSession().getAttribute("user");
//	}

}
