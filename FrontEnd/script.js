// Catégorie de filtrage

function recuperationCategories() {
  // Récupération des catégories de l'API (fetch GET)

  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((category) => {
      categoriesFiltres = category;

      // Choix de l'emplacement parent

      const sectionFiltres = document.querySelector(".filtres");

      // Création du bouton filtre tous

      const boutonTous = document.createElement("button");
      boutonTous.classList.add("boutonTous");
      boutonTous.innerText = "Tous";

      // Rattachement du bouton

      sectionFiltres.appendChild(boutonTous);

      // Evenement au clique

      boutonTous.addEventListener("click", (e) => {
        e.preventDefault();
        recuperationTravaux();
      });

      // assignation des catégories au boutons filtres

      for (let i = 0; i < category.length; i++) {
        const categories = category[i];

        // creation boutons filtres

        const boutonsFiltres = document.createElement("button");
        boutonsFiltres.classList.add("boutonsFiltres");
        boutonsFiltres.innerText = categories.name;
        sectionFiltres.appendChild(boutonsFiltres);

        // evenement click

        boutonsFiltres.addEventListener("click", (e) => {
          e.preventDefault();
          recuperationTravaux(categories.name);
        });
      }
    });
}

// Récupération des donnés Travaux de l'API

function recuperationTravaux(filtre = "tous") {
  /*le parametre de la fonction recuperationTravaux indique 
  l'affichage de filtre tous est l'affichage par defaut par defaut*/

  // Récupération elements du tableau travaux de l'API

  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((travaux) => {
      // informations fonctionnement affichage

      if (filtre == "tous") {
        affichage(travaux);

        // information d'affichage filtrer
      } else {
        const filtrage = travaux.filter(function (afichageFiltrer) {
          return afichageFiltrer.category.name === filtre;
        });

        //appel de la fonction affichage avec fitrage pour argument

        affichage(filtrage);
      }
    });
}

//Création de l'affichage

function affichage(elementsGalerie) {
  // Choix de l'emplacement parent (balise qui accueui les fiches)

  const sectionAffichage = document.querySelector(".gallery");

  // rafraichissement affichage
  sectionAffichage.innerHTML = "";

  // boucle sur les elements a afficher
  for (let i = 0; i < elementsGalerie.length; i++) {
    const articleGalerie = elementsGalerie[i];

    // Création de l'affiçchage de la galerie par defaut

    const fiche = document.createElement("div");
    fiche.classList.add("fiche");
    const image = document.createElement("img");

    //l'url de l'image correspond a la clé imageURL dans l'API
    image.src = articleGalerie.imageUrl;

    const titre = document.createElement("p");
    //le titre corespond a la clé title de l'API
    titre.innerText = articleGalerie.title;

    //Rattachement des elements

    sectionAffichage.appendChild(fiche);
    fiche.appendChild(image);
    fiche.appendChild(titre);
  }
}

// Appel de la fonction recuperation des travaux

recuperationCategories();

// Appel de la fonction d'affichage par defaut

recuperationTravaux();

// Statut utilisateur connecté

function statutConnecte() {
  const token = localStorage.getItem("token");
  const login = document.getElementById("login");

  // Condition du statut connecté

  if (token != null) {
    // si le token n'est pas null

    //suppression de l'option Login
    login.style.display = "none";

    //choix de l'emplacemet de la bare de modification

    const header = document.querySelector("header");

    // invertion de l'affichage de la barre de modification et de la nav
    header.style.flexDirection = "column-reverse";

    //création de la barre de modification
    const blackbanner = document.createElement("div");
    blackbanner.classList.add("black-banner");

    // icone modification

    const iconeModifier = document.createElement("i");
    iconeModifier.classList = "fa-solid fa-pen-to-square";
    iconeModifier.setAttribute("id", "icon-modif");

    // label modifier

    const labelModif = document.createElement("p");

    labelModif.innerText = "Mode édition";
    labelModif.classList.add("mode-edition");
    const boutonPublier = document.createElement("button");

    // Création d'un bouton publier

    boutonPublier.innerText = "publier les changements";
    boutonPublier.type = "submit";
    boutonPublier.classList.add("publishBtn");

    //apparition des optionde modification

    const modifier = document.getElementById("modifier");
    modifier.style.display = "block";
    modifier.style.textDecoration = "none";
    const modale1 = document.getElementsByClassName("modales");
    const modifierProjet = document.getElementById("modifier-projets");

    modifierProjet.style.display = "block";
    modifierProjet.style.textDecoration = "none";

    //Rattachement

    header.appendChild(blackbanner);
    blackbanner.appendChild(iconeModifier);
    blackbanner.appendChild(labelModif);
    blackbanner.appendChild(boutonPublier);
  } else {
    // si le statut n'est pas connecté

    logout.style.display = "none";
    login.style.display = "block";
  }
}
statutConnecte();

function logOut() {
  //selection de l'élement declancheur

  const logout = document.getElementById("logout");

  // Evenement au click

  logout.addEventListener("click", (e) => {
    e.preventdefault;
    deconnection();
  });
}
// Deconnection

function deconnection() {
  // suppression token du localStorage

  const actionDeconnection = localStorage.clear();

  //Rafraichissement de la page

  location.reload();
}

logOut();


const overlay = document.querySelector(".modales");

function affichageDesMiniature() {
  const miniatures = document.getElementById("affichage-miniature");
  miniatures.innerHTML = "";
  // Récupération elements du tableau travaux de l'API
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((projets) => {
      // informations fonctionnement affichage

      for (let i = 0; i < projets.length; i++) {
        const elements = projets[i];

        //Condition d'affichage
        if (elements !== null) {
          // Création de l'affiçchage miniature

          // construction fiche miniature

          const ficheMiniature = document.createElement("div");
          ficheMiniature.classList.add("fiche-miniature");

          const icones = document.createElement("div");
          icones.classList.add("icones-fiche-miniature");

          //bouton icone deplacement =>

          const boutonDeplacer = document.createElement("button");
          boutonDeplacer.setAttribute("id", "bouton-deplacer");
          const iconeDeplacer = document.createElement("i");
          iconeDeplacer.classList = "fa-solid fa-arrows-up-down-left-right";
          iconeDeplacer.setAttribute("id", "icone-deplacer");

          // creation du boutton de suppression
          const boutonSuprimmer = document.createElement("button");
          boutonSuprimmer.classList.add("bouton-delete");
          boutonSuprimmer.setAttribute("id", elements.id);

          // creation de l'icône poubelle
          const iconeEffacer = document.createElement("i");
          iconeEffacer.classList = "fa-solid fa-trash-can";
          iconeEffacer.style.color = "#ffffff";
          iconeEffacer.style.backgroundColor = "black";

          // création et importation image
          const image = document.createElement("img");
          image.src = elements.imageUrl;
          image.classList.add = "image-miniature";

          //choix éditer

          const editer = document.createElement("a");
          editer.innerText = "éditer";
          editer.classList.add = "editer";

          //rattahement
          icones.appendChild(boutonDeplacer);
          boutonDeplacer.appendChild(iconeDeplacer);
          icones.appendChild(boutonSuprimmer);
          boutonSuprimmer.appendChild(iconeEffacer);
          ficheMiniature.appendChild(icones);
          ficheMiniature.appendChild(image);
          ficheMiniature.appendChild(editer);
          miniatures.appendChild(ficheMiniature);
        }
      }
    });
}
affichageDesMiniature();

// ouvrir et fermer modale1

function ouvrirModale1() {
  const modale1 = document.getElementById("modale1");
  modale1.style.display = "block";
  modale1.removeAttribute("aria-hidden");
  modale1.setAttribute("aria-modal", true);
}

function fermerModale1() {
  modale1.style.display = "none";
  modale1.removeAttribute("aria-hidden");
  modale1.setAttribute("aria-modale", true);
}

//ouvrir fermer modale2

function ouvrirModale2() {
  modale2.style.display = "Block";
  modale2.removeAttribute("aria-hidden");
  modale2.setAttribute("aria-modal", true);
}

function fermerModale2() {
  const modale2 = document.getElementById("modale2");
  modale2.style.display = "none";
  modale2.removeAttribute("aria-modale");
  modale2.setAttribute("aria-hidden", true);
}

//  Le clique sur Modifier Ouvre la modale 1

function modifcationProjets() {
  const modifierProjets = document.getElementById("modifier-projets");
  modifierProjets.addEventListener("click", (e) => {
    e.preventDefault;
    ouvrirModale1();
    overlay.style.display = "block";
  });
}

// Le bouton Ajouter une photo Ouvre la modale 2 et ferme la modale 1

function ajouterPhoto() {
  const boutonAjouterPhotoModale1 = document.getElementById("validation");
  boutonAjouterPhotoModale1.addEventListener("click", (e) => {
    e.preventDefault;
    ouvrirModale2();
    fermerModale1();
    overlay.style.display = "block";
  });
}

// Le bouton fermer modale 1

function boutonFermerModale1() {
  const boutonFermerModale1 = document.getElementById("fermer-modale1");
  boutonFermerModale1.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale1();
    overlay.style.display = "none";
  });
}

// le bouton retour de la modale 2 ferme la modale 2 et ouvre la modale 1

function boutonRetourModale2() {
  const boutonRetour = document.getElementById("retour");
  boutonRetour.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale2();
    ouvrirModale1();
    overlay.style.display = "block";
  });
}

// le bouton fermer de la modale 2 ferme la modale 2

function boutonFermerModale2() {
  const boutonFermerModale2 = document.getElementById("fermer-modale2");
  boutonFermerModale2.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale2();
    overlay.style.display = "none";
  });
}

// fermeture au click en dehors de la modale
document.onclick = (event) => {
  const elementClique = event.target;

  if (event.target == overlay) {
    fermerModale1();
    fermerModale2();
    overlay.style.display = "none";
  }
};

modifcationProjets();
boutonFermerModale1();
ajouterPhoto();
boutonRetourModale2();
boutonFermerModale2();

const valider = document.getElementById("valider-modale2");
const prevImage = document.createElement("img");
const iconeImage = document.getElementById("icone-image");
// Prévisualisation de l'image selectionnée
function previewPictrure() {
  const sectionPrev = document.getElementById("image-prev");
  const inputImage = document.getElementById("selectioner");

  // evenement change pour acceder a l'input file

  inputImage.addEventListener("change", (e) => {
    iconeImage.style.display = "none";
    sectionPrev.innerHTML = "";

    //création de la prévisualisation

    prevImage.classList.add("imagePrevisualise");
    let selectionFichier = document.getElementById("selectioner").files[0];

    //création et assigantion de l'url du fichier a l'image
    const urlObjet = URL.createObjectURL(selectionFichier);
    prevImage.src = urlObjet;
    sectionPrev.appendChild(prevImage);
  });
}
previewPictrure();

//Validation et vérification formulaire

function validationFormulaire() {
  //Capture de l'élément seléctionné

  let selectionFichier = document.getElementById("selectioner").files[0];

  // Valeure du champs titre

  const titre = document.getElementById("titre").value;

  // valeur du champs catégorie

  const categorie = document.getElementById("liste-categories").value;

  //Condition de validation gestion des erreurs
  console.log(selectionFichier);
  if (selectionFichier == undefined) {
    alert("Veuillez choisir une image");
    return;
  }
  if (titre == "") {
    alert("Veuillez définir un titre");
    return;
  }
  if (categorie == "Champs-selection") {
    alert("Veuillez selectionner une catégorie");
    return;
  }

  // Création FormData avec les éléments du formulaire

  let formData = new FormData();
  formData.append("image", selectionFichier);
  formData.append("title", titre);
  formData.append("category", categorie);

  // Envoie FormData dans la requète poste

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("erreur lors du transfert");
    })
    .then((data) => {
      fermerModale2();
      document.querySelector(".formulaire-ajout").reset();
      prevImage.remove();
      iconeImage.style.display = "block";
      ouvrirModale1();
      affichageDesMiniature();
      recuperationTravaux();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Evenement de validation du formulaire

valider.addEventListener("click", (e) => {
  e.preventDefault();
  validationFormulaire();
});

const token = localStorage.getItem("token");

//emplacement affichage miniature

const miniatures = document.querySelector(".affichage-miniature");
//event click dans l'affichage miniature identification de l'id a supprimer

miniatures.addEventListener("click", (e) => {
  e.preventDefault();

  // Assiganation de l'Id du projet aux bouton de suppression
  if (e.target.closest(".bouton-delete")) {
    const emplacementClick = e.target.closest(".bouton-delete");
    const idDuBouton = emplacementClick.id;
    //declaration de la fonction suppression

    suppression(idDuBouton);
    affichageDesMiniature();
    recuperationTravaux();
  }
});

// Reqète de supression API

function suppression(idDuBouton) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${idDuBouton}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => {
      if (reponse.status == 204) {
        console.log("Suppression du Projet");
      } else {
        alert("Erreur dans la suppression du projet");
      }
    })
    .catch((ERROR) => {
      alert(ERROR);
    });
}


/* // Par defaut

const formulaire = document.querySelector("form");
const champsEmail = document.querySelector('input[name="email"]');
const champsMotDePasse = document.querySelector('input[name="psw"]');

// Événement se connecter

formulaire.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = champsEmail.value;
  const password = champsMotDePasse.value;

  // Envoi des données d'identification à l'API pour vérification

  const response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    //Reponses post identification

    .then((response) => {
      //Si la réponse n'est pas ok

      if (!response.ok) {
        throw new Error("Erreur d’identifiant ou de mot de passe");
      }
      return response.json();

      // message d'erreur mauvais mot de pass
    })

    .then((data) => {
      // Si data.token est retourné

      if (data.token) {
        // Stockage du token dans localstorage

        localStorage.setItem("token", data.token);

        // Redirection page d'accueil

        window.location.href = "./index.html";
      } else {
        throw new Error("Erreur lors de la connexion");
      }
    });
});
 */