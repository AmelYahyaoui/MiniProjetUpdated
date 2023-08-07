package com.amel.produit.services;

import com.amel.produit.entities.Produit;
import com.amel.produit.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amel.produit.Dto.ProduitDto;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j

public class ProduitService implements IProduitService {
	@Autowired
	private ProduitRepository repo;
	@Override
	public ProduitDto save(ProduitDto dto) {
	Produit produit=ProduitDto.toEntity(dto);
	repo.save(produit);
	return ProduitDto.fromEntity(produit);

	}

	@Override
	public ProduitDto getbyId(Long id) {
		// TODO Auto-generated method stub
		Optional<Produit> optionalProduit =repo.findById(id);
		if (optionalProduit.isPresent()) {
			Produit produit=optionalProduit.get();
			return ProduitDto.fromEntity(produit);
		}
		else {
			return null;
		}
		}

	@Override
	public List<ProduitDto> findAll() {
		// TODO Auto-generated method stub
		return repo.findAll().stream().map(ProduitDto::fromEntity).collect(Collectors.toList());
	}

	@Override
	public void delete(Long id) {
		repo.deleteById(id);
		
	}

	
	
	
	
	
}
