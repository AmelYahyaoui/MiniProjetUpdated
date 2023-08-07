import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.css']
})
export class ProduitsListComponent implements OnInit{
  produits?: Produit[];
  currentProduit: Produit = {};
  currentIndex = -1;
  nom = '';
  produit: Produit = {
    nom: '',
    prixunitaire: 0,
    quantite: 0
  };
  message = '';
  submitted = false;
 
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.message = '';
    this.retrieveProduits();
  }
  retrieveProduits(): void {
    this.produitService.getAll()
      .subscribe({
        next: (data) => {
          this.produits = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveProduits();
    this.currentProduit = {};
    this.currentIndex = -1;

  }
  setActiveProduit(produit: Produit, index: number): void {
    this.currentProduit = produit;
    this.currentIndex = index;
  }
  removeAllProduits(): void {
    this.produitService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchTitle(): void {
    this.currentProduit = {};
    this.currentIndex = -1;

    this.produitService.findByTitle(this.nom)
      .subscribe({
        next: (data) => {
          this.produits = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  saveProduit(): void {

    const data = {
      nom: this.produit.nom,
      prixunitaire: this.produit.prixunitaire,
      quantite:this.produit.quantite
    };
    const punitaire: any = this.produit.prixunitaire;
    const qntite: any = this.produit.quantite;
    if(this.produit.nom==''){
      Swal.fire('entrer nom produit', '', 'warning')
      
    }else if(punitaire  <= 0 || isNaN(parseFloat(punitaire)) ){
      Swal.fire('Vérifier prix unitaire', '', 'warning')
      
    }
    else if(qntite  <= 0 || isNaN(parseFloat(qntite)) ){
      Swal.fire('Vérifier la quantité', '', 'warning')
     
    }else{
      Swal.fire({
        title: 'Voulez-vous enregistrer ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.produitService.create(data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
              this.message="Produit Enregistrer avec succées";
            },
            error: (e) => console.error(e)
          });
          Swal.fire('Produit Enregistrer avec succées', '', 'success')
          setTimeout(this.reloadlocation, 1.0 * 1000);
          
        } else if (result.isDenied) {
          Swal.fire('Annuler', '', 'info')
          setTimeout(this.reloadlocation, 1.0 * 1000);
        }
      })
    }


   
  }
  reloadlocation():void{
    location.reload();
  }
  newProduit(): void {
    this.submitted = false;
    this.produit = {
      nom: '',
      prixunitaire: 0,
      quantite: 0
    };
  }

  deleteProduit(): void {

    Swal.fire({
      title: 'Es-tu sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.delete(this.currentProduit.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            setTimeout(this.reloadlocation, 1.0 * 1000);
  
          },
          error: (e) => console.error(e)
        });

      }
    })
  }
  updateProduit(): void {
    this.message = '';

    const nomp: any = this.currentProduit.nom;
    const punitaire: any = this.currentProduit.prixunitaire;
    const qntite: any = this.currentProduit.quantite;
    if(nomp==''){
      Swal.fire('entrer nom produit', '', 'warning')
    }else if(punitaire  <= 0 || isNaN(parseFloat(punitaire)) ){
      Swal.fire('Vérifier prix unitaire', '', 'warning')
    }
    else if(qntite  <= 0 || isNaN(parseFloat(qntite)) ){
      Swal.fire('Vérifier la quantité', '', 'warning')
    }else{
      Swal.fire({
        title: 'Voulez-vous enregistrer les modifications?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Modifier',
        denyButtonText: `Annuler`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.produitService.create(this.currentProduit)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            this.message = res.message ? res.message : 'Produit modifier avec succées!';
            Swal.fire('Modification enregistrer!', '', 'success')
            setTimeout(this.reloadlocation, 1.0 * 1000);
  
          },
          error: (e) => console.error(e)
        });
         
        } else if (result.isDenied) {
          Swal.fire('Annuler', '', 'info')
          setTimeout(this.reloadlocation, 1.0 * 1000);
        }
      })
    
    } 
  }

}
