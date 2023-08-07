package com.amel.produit.controllers;

import com.amel.produit.entities.Produit;
import com.amel.produit.repository.ProduitRepository;
import com.amel.produit.services.IProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.amel.produit.Dto.ProduitDto;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/Produit")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {
    @Autowired
    IProduitService iProduitService;
    @Autowired
    private ProduitRepository repo;
    @PostMapping("/saveOrUpdate")
    public ResponseEntity<ProduitDto> AjouterProduit(@RequestBody ProduitDto produitDto) {
        ProduitDto produitDtosaved = iProduitService.save(produitDto);
        return new ResponseEntity<ProduitDto>(produitDtosaved, HttpStatus.CREATED);
    }
    @GetMapping("/recherherProduit/{id}")
    public ProduitDto getproduit(@PathVariable Long id) {
        // TODO Auto-generated method stub
        return iProduitService.getbyId(id);
    }
    @DeleteMapping("/supprimer/{id}")
    public void delete(@PathVariable Long id) {
        // TODO Auto-generated method stub
        iProduitService.delete(id);
    }
    @DeleteMapping("/deleteAll")
    public void delete() {
        // TODO Auto-generated method stub
        repo.deleteAll();
    }
    @GetMapping("/listerProduits")
    public List<ProduitDto> liste() {
        // TODO Auto-generated method stub
        return iProduitService.findAll();

    }
    @GetMapping("/produit")
    public ResponseEntity<List<Produit>> getAllProduits(@RequestParam(required = false) String nom) {
        try {
            List<Produit> produits = new ArrayList<Produit>();

            if (nom == null)
                repo.findAll().forEach(produits::add);
            else
                repo.findByNomContaining(nom).forEach(produits::add);

            if (produits.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(produits, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
