package com.amel.produit.services;

import com.amel.produit.Dto.ProduitDto;

import java.util.List;

public interface IProduitService {
	
	ProduitDto save(ProduitDto dto); 
    ProduitDto getbyId(Long id);
    List<ProduitDto> findAll();
    void delete(Long id);
}
