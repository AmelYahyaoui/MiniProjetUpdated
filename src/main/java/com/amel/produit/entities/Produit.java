package com.amel.produit.entities;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


@SuperBuilder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
	public class Produit {
	@Id
	@GeneratedValue (strategy=GenerationType.AUTO)
	private Long id;
	private String nom;
	private double prixunitaire;
	private int quantite;
	

}
