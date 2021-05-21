package com.ssafy.edu.service.checksheet;

import com.ssafy.edu.model.checksheet.ChecksheetRequest;
import com.ssafy.edu.model.checksheet.ChecksheetResponse;
import org.springframework.http.ResponseEntity;

public interface ChecksheetService {
    public ResponseEntity<ChecksheetResponse> sendChecksheet(ChecksheetRequest checksheet);
    public ResponseEntity<ChecksheetResponse> getChecksheet();
    public ResponseEntity<ChecksheetResponse> getBeaconHere(String userId);
}
