package pl.srychert.PartyGamesPlatform.exception.general;

public class NotEnoughGoldException extends Exception {
    public NotEnoughGoldException() {
        super("Not enough gold");
    }

    public NotEnoughGoldException(String message) {
        super(message);
    }
}
