package pl.srychert.PartyGamesPlatform.exception.general;

public class NotEnoughGoldException extends Exception {
    public NotEnoughGoldException() {
    }

    public NotEnoughGoldException(String message) {
        super(message);
    }
}
