package in.pfe.elearning.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    @Value("${spring.mail.username}")
    private String mailAddress;

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailAddress);
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" +
                "http://localhost:3000/auth/reset-password?token=" + token);

        javaMailSender.send(message);
    }

    public void sendNotificationEmail(String to , String messageBody){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailAddress);
        message.setTo(to);
        message.setSubject("تعلم online - إشعار جديد");
        message.setText(messageBody);
        javaMailSender.send(message);
    }
}
