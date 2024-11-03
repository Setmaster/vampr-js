class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let current = this.creator;
    while (current) {
      count++;
      current = current.creator;
    }

    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestorsOfThis = [];
    let closest = null;
    let currentAncestor = this;
    while (currentAncestor) {
      ancestorsOfThis.push(currentAncestor);
      currentAncestor = currentAncestor.creator;
    }

    currentAncestor = vampire;
    while (currentAncestor) {
      if (ancestorsOfThis.includes(currentAncestor)) {
        return currentAncestor;
      }
      currentAncestor = currentAncestor.creator;
    }
    return closest;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const entry of this.offspring) {
      if (entry.name === name){
        return entry;
      }
      const match = entry.vampireWithName(name);
      if (match){
        return match;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = this.offspring.length;
    for (const offspring of this.offspring) {
      count += offspring.totalDescendents;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    const output = [];
    for (const offspring of this.offspring) {
      if (offspring.yearConverted > 1980){
        output.push(offspring);
      }
      output.push(offspring.allMillennialVampires);
    }
    return output.flat();
  }
}

module.exports = Vampire;

