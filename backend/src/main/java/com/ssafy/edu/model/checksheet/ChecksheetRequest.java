package com.ssafy.edu.model.checksheet;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChecksheetRequest {
    String equipment;
    String checkName;
    String beaconId;
    String properBeaconId;
    String userId;
    String line;
}
