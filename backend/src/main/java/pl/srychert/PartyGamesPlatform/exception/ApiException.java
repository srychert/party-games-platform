package pl.srychert.PartyGamesPlatform.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
public class ApiException {
    private final String message;
    private final HttpStatus httpStatus;
    private List<String> detailedMessages;

    public ApiException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

}
