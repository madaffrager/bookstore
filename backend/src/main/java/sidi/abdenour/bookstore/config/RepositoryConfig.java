package sidi.abdenour.bookstore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import sidi.abdenour.bookstore.entity.Book;
import sidi.abdenour.bookstore.entity.BookCategory;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

@Configuration

public class RepositoryConfig implements RepositoryRestConfigurer {


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(BookCategory.class);
    }
}
