package in.pfe.elearning.payload.response;

import java.util.List;

import org.bson.types.ObjectId;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String id;
	private String email;
	private List<String> roles;

	private boolean verified;

	public JwtResponse(String accessToken, String id, String email, List<String> roles,boolean v) {
		this.token = accessToken;
		this.id = id;

		this.email = email;
		this.roles = roles;
		this.verified=v;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}
}
