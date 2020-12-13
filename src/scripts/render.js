/* eslint-disable no-unused-vars */
/* global Slots */

//import {EMPTY_IMAGE_DATA_URL} from '../constants'
// https://stackoverflow.com/questions/6018611/smallest-data-uri-image-possible-for-a-transparent-image
const EMPTY_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const EMPTY_PLACEHOLDER = '?'

const positionsList = document.getElementById('positionsList')

function dateToHtml(/** @type Date */ date) {
  const formatMachine = date.toISOString().slice(0, 10)
  const formatHumain = date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return `<time datetime="${formatMachine}">${formatHumain}</time>`
}

function dateToString(date) {
  const formatHumain = date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formatHumain
}

function renderLoadingProfil() {
  [
    'nom', 'date-naissance', 'date-deces', 'lieu-naissance', 'lieu-deces',
    'description', 'pere', 'mere', 'fratrie', 'conjoint', 'enfants',
  ].forEach(Slots.markLoading)
  Slots.setAttr('image-personne', 'src', EMPTY_IMAGE_DATA_URL)
  Slots.markLoading('image-personne')
}

function renderProfilOrHide(profil) {
  document.title = `Polit'IF – ${profil.nom}`
  Slots.setText('nom', profil.nom)

  if (profil.dateNaissance) {
    Slots.setHtml('date-naissance', profil.dateNaissance && dateToHtml(profil.dateNaissance))
  } else {
    Slots.hide('date-naissance')
  }

  if (profil.lieuNaissance) {
    Slots.setText('lieu-naissance', profil.lieuNaissance)
  } else {
    Slots.hide('lieu-naissance')
  }

  if (profil.dateDeces) {
    Slots.setHtml('date-deces', profil.dateDeces && dateToHtml(profil.dateDeces))
  } else {
    Slots.hide('date-deces')
  }

  if (profil.lieuDeces) {
    Slots.setText('lieu-deces', profil.lieuDeces)
  } else {
    Slots.hide('lieu-deces')
  }

  Slots.setText('pere', profil.pere)
  Slots.setText('mere', profil.mere)
  Slots.setText('conjoint', profil.conjoint)

  if (profil.image) {
    Slots.setAttr('image-personne', 'src', profil.image)
  } else {
    Slots.hide('image-personne')
  }
  if (profil.signature) {
    Slots.setAttr('signature-personne', 'src', profil.signature)
  } else {
    Slots.hide('signature-personne')
  }
}
function renderProfilPartial(profil) {
  if (profil === null) {
    renderLoadingProfil()
  } else {
    if (profil.nom) {
      document.title = `Polit'IF – ${profil.nom}`
      Slots.setText('nom', profil.nom)
    }
    profil.dateNaissance && Slots.setHtml('date-naissance', profil.dateNaissance && dateToHtml(profil.dateNaissance))
    profil.dateDeces && Slots.setHtml('date-deces', profil.dateDeces && dateToHtml(profil.dateDeces))
    profil.lieuNaissance && Slots.setText('lieu-naissance', profil.lieuNaissance)
    profil.lieuDeces && Slots.setText('lieu-deces', profil.lieuDeces)
    profil.pere && Slots.setText('pere', profil.pere)
    profil.mere && Slots.setText('mere', profil.mere)
    profil.fratrie && Slots.setText('fratrie', profil.fratrie.join(', '))
    profil.conjoint && Slots.setText('conjoint', profil.conjoint)
    profil.enfants && Slots.setText('enfants', profil.enfants.join(', '))
    profil.description && Slots.setHtml('description', `<p>${profil.description}</p>`)
  }
}

function renderRecherche(search) {
  const entreeRecherche = document.getElementById('search')
  if (entreeRecherche === null) {
    throw new Error('Affichage de la page Recherche impossible: éléments #search manquant')
  }
  entreeRecherche.value = search
}

function renderPositions(positions) {
  positionsList.innerHTML = ''
  positions.forEach(mandat => {
    const { debut, fin, nom } = mandat
    if (!nom) {
      return // skip
    }

    const li = document.createElement('li')

    if (debut && fin) {
      li.innerHTML = `<b></b> du ${dateToHtml(debut)} au ${dateToHtml(fin)}`
    } else if (debut) {
      li.innerHTML = `<b></b> à partir du ${dateToHtml(debut)}`
    } else if (fin) {
      li.innerHTML = `<b></b> jusqu'au ${dateToHtml(fin)}`
    } else {
      li.innerHTML = '<b></b>'
    }

    li.querySelector('b').innerText = nom
    positionsList.appendChild(li)
  })
}

function renderPartis(partis) {
  if (partis && Array.isArray(partis) && partis.length > 0) {
    Slots.setList('profil-liste-partis', partis)
  } else {
    Slots.hide('profil-liste-partis', partis)
  }
}
