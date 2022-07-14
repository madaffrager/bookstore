package sidi.abdenour.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import sidi.abdenour.bookstore.entity.Book;
@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book,Long> {
}
