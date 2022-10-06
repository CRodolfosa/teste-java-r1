package br.com.convergencia.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
    OPEN("Ativo"),
    CLOSED("Inativo");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
