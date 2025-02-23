package com.rethinkneverends.ecommerce_backend.authentication.service;


import java.util.Map;

public interface NotificationService {
    void sendNotification(Map<String, Object> config) throws Exception;
}
