package in.pfe.elearning.payload.request;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ResetPasswordRequest {

    private String token;
    private String newPassword;

    public ResetPasswordRequest() {
    }

    public ResetPasswordRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}