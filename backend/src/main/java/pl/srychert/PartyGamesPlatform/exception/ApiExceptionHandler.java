package pl.srychert.PartyGamesPlatform.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import java.util.List;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException (ApiRequestException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException  apiException = new ApiException(
                e.getMessage(),
                badRequest
        );
        return new ResponseEntity<>(apiException, badRequest);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException e) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException  apiException = new ApiException(
                "Validation error",
                badRequest
        );

        List<String> detailedMessages = e.getBindingResult().getAllErrors().stream()
                .map(err -> err.unwrap(ConstraintViolation.class))
                .map(err -> String.format("'%s' %s", err.getPropertyPath(), err.getMessage())).toList();

        apiException.setDetailedMessages(detailedMessages);

        return new ResponseEntity<>(apiException, badRequest);
    }
}
