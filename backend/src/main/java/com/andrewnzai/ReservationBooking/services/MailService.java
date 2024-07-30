package com.andrewnzai.ReservationBooking.services;

import com.andrewnzai.ReservationBooking.emails.NotificationEmail;
import lombok.AllArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    private String build(String message) {
        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("MailTemplate", context);
    }

    @Async
    public void sendMail(NotificationEmail notificationEmail) throws Exception {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("reservationbooking@email.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(build(notificationEmail.getBody()));
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            throw new Exception("Exception occurred when sending mail to " + notificationEmail.getRecipient(), e);
        }
    }
}