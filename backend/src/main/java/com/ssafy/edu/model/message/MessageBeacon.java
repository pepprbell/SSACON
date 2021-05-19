package com.ssafy.edu.model.message;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageBeacon {
    String beaconName;
    String beaconId;
    Date lastSignal;
}
