package com.amel.produit.Dto;



import com.amel.produit.entities.Produit;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProduitDto {
	private Long id ;
	private String nom;
	private double prixunitaire;
	private int quantite;
	
	public static ProduitDto fromEntity(Produit produit) {
		
		if(produit==null) {
			
			return null;
		}
		return ProduitDto.builder()
		.id(produit.getId())
		.nom(produit.getNom())
		.prixunitaire(produit.getPrixunitaire())
		.quantite(produit.getQuantite())
		.build();
		
	}
	
	public static Produit toEntity(ProduitDto produitDto) {
		
		if(produitDto==null) {
			return null;
	}
		return Produit.builder()
		.id(produitDto.getId())
		.nom(produitDto.getNom())
		.prixunitaire(produitDto.getPrixunitaire())
		.quantite(produitDto.getQuantite())
		.build();
	}	
}
