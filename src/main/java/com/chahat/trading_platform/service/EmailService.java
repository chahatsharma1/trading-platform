package com.chahat.trading_platform.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    public void sendOtpMail(String email, String otp) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, "utf-8");

        String subject = "Verify OTP";
        String text = "Your Verification is" + otp + ".";

        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(text);
        mimeMessageHelper.setTo(email);

        try {
            javaMailSender.send(message);
        }
        catch (MailException e){
            throw new MailSendException(e.getMessage());
        }
    }

}
