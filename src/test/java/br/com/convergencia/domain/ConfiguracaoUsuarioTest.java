package br.com.convergencia.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.convergencia.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConfiguracaoUsuarioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConfiguracaoUsuario.class);
        ConfiguracaoUsuario configuracaoUsuario1 = new ConfiguracaoUsuario();
        configuracaoUsuario1.setId(1L);
        ConfiguracaoUsuario configuracaoUsuario2 = new ConfiguracaoUsuario();
        configuracaoUsuario2.setId(configuracaoUsuario1.getId());
        assertThat(configuracaoUsuario1).isEqualTo(configuracaoUsuario2);
        configuracaoUsuario2.setId(2L);
        assertThat(configuracaoUsuario1).isNotEqualTo(configuracaoUsuario2);
        configuracaoUsuario1.setId(null);
        assertThat(configuracaoUsuario1).isNotEqualTo(configuracaoUsuario2);
    }
}
