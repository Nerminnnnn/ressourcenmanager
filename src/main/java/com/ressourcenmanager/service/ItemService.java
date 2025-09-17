package com.ressourcenmanager.service;

import com.ressourcenmanager.model.Item;
import com.ressourcenmanager.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }
    
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }
    
    public Item updateItem(Long id, Item itemDetails) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setName(itemDetails.getName());
            item.setDescription(itemDetails.getDescription());
            item.setQuantity(itemDetails.getQuantity());
            return itemRepository.save(item);
        }
        return null;
    }
    
    public boolean deleteItem(Long id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Item> searchItems(String searchTerm) {
        return itemRepository.searchItems(searchTerm);
    }
    
    public List<Item> getLowStockItems(Integer threshold) {
        return itemRepository.findByQuantityLessThan(threshold);
    }
}
