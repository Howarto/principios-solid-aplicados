class Bird {

  tweet() {
    console.log( "I'm a bird!" )
  }

}

/**
 * Does not violate LSP rule.
 */
class Parrot extends Bird {

  /**
   * @override
   */
  tweet() {
    console.log( "I'm a parrot!" )
  }

}

/**
 * Violates LSP rule. It needs to set the type before run `tweet` method.
 */
class Owl extends Bird {
  #type?: string

  set type( value: string ) {
    this.#type = value
  }

  /**
   * @override
   */
  tweet() {
    if ( typeof this.#type === 'undefined' ) {
      throw new Error( 'Is not possible because type was not defined.' )
    }

    console.log( `I'm what you want! Now a ${ this.#type }!` )
  }

}

// Example:
const bird = new Bird()
bird.tweet() // No error.

const owl: Bird = new Parrot() // Cast to Bird.
owl.tweet() // No error.

const parrot: Bird = new Owl() // Cast to Bird.
// parrot.type = 'some' // Property does not exist, it can't be set the type.
parrot.tweet() // Throws error.
