package pl.srychert.PartyGamesPlatform.model.game.item;

import pl.srychert.PartyGamesPlatform.enums.ItemEffect;

import java.util.AbstractMap;

public interface Usable {
    AbstractMap.SimpleImmutableEntry<ItemEffect, ?> use();
}
