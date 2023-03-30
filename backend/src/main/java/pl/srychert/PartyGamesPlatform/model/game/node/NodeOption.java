package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.lang.reflect.Parameter;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class NodeOption {
    private String name;
    private List<Parameter> parameters;
}
