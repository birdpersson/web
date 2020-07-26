package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.UserDAO;
import utils.Authentication;

@Path("")
public class UserService {

	@Context
	ServletContext ctx;

	public UserService() {

	}

	@PostConstruct
	public void init() {

		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	@GET
	@Path("profile/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProfile(@Context HttpServletRequest request,
			@PathParam("username") String username) {
		if (Authentication.getUsername(request).equals(username)) {
			UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
			User user = userDAO.findOne(username);
			return Response.status(Response.Status.OK).entity(user).build();
		}
		return Response.status(Response.Status.FORBIDDEN).build();
	}
}
