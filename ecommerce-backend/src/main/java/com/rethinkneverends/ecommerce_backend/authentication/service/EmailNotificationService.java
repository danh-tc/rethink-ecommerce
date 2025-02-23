package com.rethinkneverends.ecommerce_backend.authentication.service;


import com.rethinkneverends.ecommerce_backend.common.constant.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@RequiredArgsConstructor
@Setter
@Service
@Log4j2
public class EmailNotificationService implements NotificationService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    @Override
    public void sendNotification(Map<String, Object> config) throws MessagingException {
        String templateName;
        EmailTemplateName emailTemplate = (EmailTemplateName) config.get("emailTemplate");

        if (null == emailTemplate) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.name();
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", config.get("username"));
        properties.put("confirmationUrl", config.get("confirmationUrl"));
        properties.put("activation_code", config.get("verificationToken"));

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom("no-reply@rethinknevereneds.com");
        helper.setTo((String) config.get("recipient"));
        helper.setSubject((String) config.get("subject"));

        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);

        mailSender.send(mimeMessage);
    }
}
