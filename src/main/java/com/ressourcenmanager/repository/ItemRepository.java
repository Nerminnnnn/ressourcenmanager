package com.ressourcenmanager.repository;

import com.ressourcenmanager.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    List<Item> findByNameContainingIgnoreCase(String name);
    
    List<Item> findByDescriptionContainingIgnoreCase(String description);
    
    @Query("SELECT i FROM Item i WHERE i.name LIKE %:searchTerm% OR i.description LIKE %:searchTerm%")
    List<Item> searchItems(@Param("searchTerm") String searchTerm);
    
    List<Item> findByQuantityLessThan(Integer quantity);
}
