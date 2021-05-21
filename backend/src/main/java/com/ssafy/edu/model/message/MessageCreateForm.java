package com.ssafy.edu.model.message;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageCreateForm {
    String beaconId;
    String userId;
    String message;
}
