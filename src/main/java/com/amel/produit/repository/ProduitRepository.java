package com.amel.produit.repository;

import com.amel.produit.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByNomContaining(String nom);
}
