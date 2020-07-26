package utils;

import java.security.Key;

import javax.servlet.http.HttpServletRequest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class Authentication {
	public static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

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
