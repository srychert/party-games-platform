package pl.srychert.PartyGamesPlatform.config;

import java.security.Principal;
import java.util.Objects;

public class AnonymousPrincipal implements Principal {
    private String name;

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object another) {
        if (!(another instanceof Principal principal))
            return false;

        return principal.getName().equals(name);

    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
