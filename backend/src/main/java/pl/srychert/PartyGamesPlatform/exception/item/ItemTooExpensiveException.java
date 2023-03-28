package pl.srychert.PartyGamesPlatform.exception.item;

public class ItemTooExpensiveException extends Exception {
    public ItemTooExpensiveException() {
    }

    public ItemTooExpensiveException(String message) {
        super(message);
    }
}
