package br.com.convergencia.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.convergencia.IntegrationTest;
import br.com.convergencia.domain.ConfiguracaoUsuario;
import br.com.convergencia.domain.enumeration.Status;
import br.com.convergencia.repository.ConfiguracaoUsuarioRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ConfiguracaoUsuarioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConfiguracaoUsuarioResourceIT {

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.OPEN;
    private static final Status UPDATED_STATUS = Status.CLOSED;

    private static final String ENTITY_API_URL = "/api/configuracao-usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConfiguracaoUsuarioRepository configuracaoUsuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConfiguracaoUsuarioMockMvc;

    private ConfiguracaoUsuario configuracaoUsuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConfiguracaoUsuario createEntity(EntityManager em) {
        ConfiguracaoUsuario configuracaoUsuario = new ConfiguracaoUsuario().cpf(DEFAULT_CPF).status(DEFAULT_STATUS);
        return configuracaoUsuario;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConfiguracaoUsuario createUpdatedEntity(EntityManager em) {
        ConfiguracaoUsuario configuracaoUsuario = new ConfiguracaoUsuario().cpf(UPDATED_CPF).status(UPDATED_STATUS);
        return configuracaoUsuario;
    }

    @BeforeEach
    public void initTest() {
        configuracaoUsuario = createEntity(em);
    }

    @Test
    @Transactional
    void createConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeCreate = configuracaoUsuarioRepository.findAll().size();
        // Create the ConfiguracaoUsuario
        restConfiguracaoUsuarioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isCreated());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        ConfiguracaoUsuario testConfiguracaoUsuario = configuracaoUsuarioList.get(configuracaoUsuarioList.size() - 1);
        assertThat(testConfiguracaoUsuario.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testConfiguracaoUsuario.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createConfiguracaoUsuarioWithExistingId() throws Exception {
        // Create the ConfiguracaoUsuario with an existing ID
        configuracaoUsuario.setId(1L);

        int databaseSizeBeforeCreate = configuracaoUsuarioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfiguracaoUsuarioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCpfIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracaoUsuarioRepository.findAll().size();
        // set the field null
        configuracaoUsuario.setCpf(null);

        // Create the ConfiguracaoUsuario, which fails.

        restConfiguracaoUsuarioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllConfiguracaoUsuarios() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        // Get all the configuracaoUsuarioList
        restConfiguracaoUsuarioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configuracaoUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    void getConfiguracaoUsuario() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        // Get the configuracaoUsuario
        restConfiguracaoUsuarioMockMvc
            .perform(get(ENTITY_API_URL_ID, configuracaoUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(configuracaoUsuario.getId().intValue()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingConfiguracaoUsuario() throws Exception {
        // Get the configuracaoUsuario
        restConfiguracaoUsuarioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingConfiguracaoUsuario() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();

        // Update the configuracaoUsuario
        ConfiguracaoUsuario updatedConfiguracaoUsuario = configuracaoUsuarioRepository.findById(configuracaoUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedConfiguracaoUsuario are not directly saved in db
        em.detach(updatedConfiguracaoUsuario);
        updatedConfiguracaoUsuario.cpf(UPDATED_CPF).status(UPDATED_STATUS);

        restConfiguracaoUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConfiguracaoUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConfiguracaoUsuario))
            )
            .andExpect(status().isOk());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
        ConfiguracaoUsuario testConfiguracaoUsuario = configuracaoUsuarioList.get(configuracaoUsuarioList.size() - 1);
        assertThat(testConfiguracaoUsuario.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testConfiguracaoUsuario.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, configuracaoUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConfiguracaoUsuarioWithPatch() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();

        // Update the configuracaoUsuario using partial update
        ConfiguracaoUsuario partialUpdatedConfiguracaoUsuario = new ConfiguracaoUsuario();
        partialUpdatedConfiguracaoUsuario.setId(configuracaoUsuario.getId());

        partialUpdatedConfiguracaoUsuario.cpf(UPDATED_CPF);

        restConfiguracaoUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConfiguracaoUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConfiguracaoUsuario))
            )
            .andExpect(status().isOk());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
        ConfiguracaoUsuario testConfiguracaoUsuario = configuracaoUsuarioList.get(configuracaoUsuarioList.size() - 1);
        assertThat(testConfiguracaoUsuario.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testConfiguracaoUsuario.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateConfiguracaoUsuarioWithPatch() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();

        // Update the configuracaoUsuario using partial update
        ConfiguracaoUsuario partialUpdatedConfiguracaoUsuario = new ConfiguracaoUsuario();
        partialUpdatedConfiguracaoUsuario.setId(configuracaoUsuario.getId());

        partialUpdatedConfiguracaoUsuario.cpf(UPDATED_CPF).status(UPDATED_STATUS);

        restConfiguracaoUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConfiguracaoUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConfiguracaoUsuario))
            )
            .andExpect(status().isOk());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
        ConfiguracaoUsuario testConfiguracaoUsuario = configuracaoUsuarioList.get(configuracaoUsuarioList.size() - 1);
        assertThat(testConfiguracaoUsuario.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testConfiguracaoUsuario.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, configuracaoUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConfiguracaoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = configuracaoUsuarioRepository.findAll().size();
        configuracaoUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConfiguracaoUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(configuracaoUsuario))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConfiguracaoUsuario in the database
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConfiguracaoUsuario() throws Exception {
        // Initialize the database
        configuracaoUsuarioRepository.saveAndFlush(configuracaoUsuario);

        int databaseSizeBeforeDelete = configuracaoUsuarioRepository.findAll().size();

        // Delete the configuracaoUsuario
        restConfiguracaoUsuarioMockMvc
            .perform(delete(ENTITY_API_URL_ID, configuracaoUsuario.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConfiguracaoUsuario> configuracaoUsuarioList = configuracaoUsuarioRepository.findAll();
        assertThat(configuracaoUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
