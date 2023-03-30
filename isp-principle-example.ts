interface Flyer {
  fly(): void,
}

interface Barker {
  bark(): void,
}

interface Runner {
  run(): void,
}

class Dog implements Runner, Barker {

  run(): void {
      console.log( 'Dog is running' )
  }

  bark(): void {
      console.log( 'Dog is barking' )
  }

}

class Bird implements Runner, Flyer {

  run(): void {
      console.log( 'Bird is running' )
  }

  fly(): void {
      console.log( 'Bird is flying' )
  }

}
