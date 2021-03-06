package services;

import java.security.Key;
import java.util.Date;

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

import beans.User;
import dao.UserDAO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Path("")
public class AuthService {

	@Context
	ServletContext ctx;

	public AuthService() {

	}

	@PostConstruct
	public void init() {

		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	public static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.find(user.getUsername(), user.getPassword());

		if (loggedUser != null) {
			String jws = Jwts.builder()
					.setSubject(loggedUser.getUsername())
					.setExpiration(new Date(new Date().getTime() + 1000*9000L))
					.setIssuedAt(new Date()).signWith(key).compact();
			loggedUser.setJwt(jws);
			return Response.status(Response.Status.OK).entity(loggedUser).build();
		}

		return Response.status(Response.Status.BAD_REQUEST).build();
	}

	@POST
	@Path("/signup")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response signup(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (userDao.findOne(user.getUsername()) != null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

		User newUser = userDao.save(ctx.getRealPath(""), user);
		if (newUser == null) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
		
		return Response.status(Response.Status.CREATED).entity(newUser).build();

	}

	public static String getUsername(HttpServletRequest request) {
		String auth = request.getHeader("Authorization");
		System.out.println("Authorization: " + auth);
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
				Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				return claims.getBody().getSubject();
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
		return null;
	}

}
