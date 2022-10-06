package br.com.convergencia.domain;

import br.com.convergencia.domain.enumeration.Status;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ConfiguracaoUsuario.
 */
@Entity
@Table(name = "configuracao_usuario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ConfiguracaoUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConfiguracaoUsuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return this.cpf;
    }

    public ConfiguracaoUsuario cpf(String cpf) {
        this.setCpf(cpf);
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Status getStatus() {
        return this.status;
    }

    public ConfiguracaoUsuario status(Status status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConfiguracaoUsuario)) {
            return false;
        }
        return id != null && id.equals(((ConfiguracaoUsuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConfiguracaoUsuario{" +
            "id=" + getId() +
            ", cpf='" + getCpf() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
