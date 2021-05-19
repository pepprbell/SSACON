package com.ssafy.edu.service.message;

import com.ssafy.edu.model.message.MessageCreateForm;
import com.ssafy.edu.model.message.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface MessageService {
    public ResponseEntity<MessageResponse> createMessage(MessageCreateForm messageCreateForm);
    public ResponseEntity<MessageResponse> getMessageUser(String userId);
}
