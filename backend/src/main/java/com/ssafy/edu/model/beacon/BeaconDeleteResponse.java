package com.ssafy.edu.model.beacon;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BeaconDeleteResponse {
    List<String> beacon_id;
    List<BeaconInfoResponse> beacon_info;
}
