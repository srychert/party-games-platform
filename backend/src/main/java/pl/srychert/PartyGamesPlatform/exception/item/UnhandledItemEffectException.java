package pl.srychert.PartyGamesPlatform.exception.item;

public class UnhandledItemEffectException extends Exception {
    public UnhandledItemEffectException() {
        super("Unhandled effect");
    }

    public UnhandledItemEffectException(String message) {
        super(message);
    }
}
