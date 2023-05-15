package pl.srychert.PartyGamesPlatform.model.game.item;

import pl.srychert.PartyGamesPlatform.enums.ItemEffect;

import java.util.Map;

public interface Usable<T> {
    Map<ItemEffect, T> use();
}
