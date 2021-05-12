package com.ssafy.edu.model.beacon;


import com.ssafy.edu.model.line.LineInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BeaconList {
    List<String> beacon_id;
    List<BeaconInfoResponse> beacon_info;
    LineInfo line_equipment;
}
