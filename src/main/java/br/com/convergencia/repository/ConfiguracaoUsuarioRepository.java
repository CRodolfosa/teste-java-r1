package br.com.convergencia.repository;

import br.com.convergencia.domain.ConfiguracaoUsuario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ConfiguracaoUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfiguracaoUsuarioRepository extends JpaRepository<ConfiguracaoUsuario, Long> {}
