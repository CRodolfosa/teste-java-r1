package br.com.convergencia.web.rest;

import br.com.convergencia.domain.ConfiguracaoUsuario;
import br.com.convergencia.repository.ConfiguracaoUsuarioRepository;
import br.com.convergencia.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.convergencia.domain.ConfiguracaoUsuario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConfiguracaoUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(ConfiguracaoUsuarioResource.class);

    private static final String ENTITY_NAME = "configuracaoUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConfiguracaoUsuarioRepository configuracaoUsuarioRepository;

    public ConfiguracaoUsuarioResource(ConfiguracaoUsuarioRepository configuracaoUsuarioRepository) {
        this.configuracaoUsuarioRepository = configuracaoUsuarioRepository;
    }

    /**
     * {@code POST  /configuracao-usuarios} : Create a new configuracaoUsuario.
     *
     * @param configuracaoUsuario the configuracaoUsuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new configuracaoUsuario, or with status {@code 400 (Bad Request)} if the configuracaoUsuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/configuracao-usuarios")
    public ResponseEntity<ConfiguracaoUsuario> createConfiguracaoUsuario(@Valid @RequestBody ConfiguracaoUsuario configuracaoUsuario)
        throws URISyntaxException {
        log.debug("REST request to save ConfiguracaoUsuario : {}", configuracaoUsuario);
        if (configuracaoUsuario.getId() != null) {
            throw new BadRequestAlertException("A new configuracaoUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConfiguracaoUsuario result = configuracaoUsuarioRepository.save(configuracaoUsuario);
        return ResponseEntity
            .created(new URI("/api/configuracao-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /configuracao-usuarios/:id} : Updates an existing configuracaoUsuario.
     *
     * @param id the id of the configuracaoUsuario to save.
     * @param configuracaoUsuario the configuracaoUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated configuracaoUsuario,
     * or with status {@code 400 (Bad Request)} if the configuracaoUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the configuracaoUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/configuracao-usuarios/{id}")
    public ResponseEntity<ConfiguracaoUsuario> updateConfiguracaoUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ConfiguracaoUsuario configuracaoUsuario
    ) throws URISyntaxException {
        log.debug("REST request to update ConfiguracaoUsuario : {}, {}", id, configuracaoUsuario);
        if (configuracaoUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, configuracaoUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!configuracaoUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConfiguracaoUsuario result = configuracaoUsuarioRepository.save(configuracaoUsuario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, configuracaoUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /configuracao-usuarios/:id} : Partial updates given fields of an existing configuracaoUsuario, field will ignore if it is null
     *
     * @param id the id of the configuracaoUsuario to save.
     * @param configuracaoUsuario the configuracaoUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated configuracaoUsuario,
     * or with status {@code 400 (Bad Request)} if the configuracaoUsuario is not valid,
     * or with status {@code 404 (Not Found)} if the configuracaoUsuario is not found,
     * or with status {@code 500 (Internal Server Error)} if the configuracaoUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/configuracao-usuarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConfiguracaoUsuario> partialUpdateConfiguracaoUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ConfiguracaoUsuario configuracaoUsuario
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConfiguracaoUsuario partially : {}, {}", id, configuracaoUsuario);
        if (configuracaoUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, configuracaoUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!configuracaoUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConfiguracaoUsuario> result = configuracaoUsuarioRepository
            .findById(configuracaoUsuario.getId())
            .map(existingConfiguracaoUsuario -> {
                if (configuracaoUsuario.getCpf() != null) {
                    existingConfiguracaoUsuario.setCpf(configuracaoUsuario.getCpf());
                }
                if (configuracaoUsuario.getStatus() != null) {
                    existingConfiguracaoUsuario.setStatus(configuracaoUsuario.getStatus());
                }

                return existingConfiguracaoUsuario;
            })
            .map(configuracaoUsuarioRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, configuracaoUsuario.getId().toString())
        );
    }

    /**
     * {@code GET  /configuracao-usuarios} : get all the configuracaoUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of configuracaoUsuarios in body.
     */
    @GetMapping("/configuracao-usuarios")
    public List<ConfiguracaoUsuario> getAllConfiguracaoUsuarios() {
        log.debug("REST request to get all ConfiguracaoUsuarios");
        return configuracaoUsuarioRepository.findAll();
    }

    /**
     * {@code GET  /configuracao-usuarios/:id} : get the "id" configuracaoUsuario.
     *
     * @param id the id of the configuracaoUsuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the configuracaoUsuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/configuracao-usuarios/{id}")
    public ResponseEntity<ConfiguracaoUsuario> getConfiguracaoUsuario(@PathVariable Long id) {
        log.debug("REST request to get ConfiguracaoUsuario : {}", id);
        Optional<ConfiguracaoUsuario> configuracaoUsuario = configuracaoUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(configuracaoUsuario);
    }

    /**
     * {@code DELETE  /configuracao-usuarios/:id} : delete the "id" configuracaoUsuario.
     *
     * @param id the id of the configuracaoUsuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/configuracao-usuarios/{id}")
    public ResponseEntity<Void> deleteConfiguracaoUsuario(@PathVariable Long id) {
        log.debug("REST request to delete ConfiguracaoUsuario : {}", id);
        configuracaoUsuarioRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
