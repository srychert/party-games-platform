package pl.srychert.PartyGamesPlatform.exception.item;

public class ItemTooExpensiveException extends Exception {
    public ItemTooExpensiveException() {
        super("Item too expensive");
    }

    public ItemTooExpensiveException(String message) {
        super(message);
    }
}
