package pl.srychert.PartyGamesPlatform.exception.item;

public class ItemNotPresentException extends Exception {
    public ItemNotPresentException() {
        super("Item not present");
    }

    public ItemNotPresentException(String message) {
        super(message);
    }
}
