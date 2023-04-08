// Example extracted from https://blog.susomejias.dev/blog/design-pattern-criteria.

interface Client {
  name: string,
  age: number,
  gender: 'M' | 'F',
  city: string,
}

const clientArray: Array< Client > = [
  { name: 'Ana', age: 25, gender: 'F', city: 'Madrid' },
  { name: 'John', age: 15, gender: 'M', city: 'London' },
  { name: 'Marta', age: 14, gender: 'F', city: 'Madrid' },
  { name: 'Luis', age: 30, gender: 'M', city: 'Barcelona' },
]

// Example of wrong use in case of not use the criteria pattern.
// It represents a scalability problem because normally a real-case
// scenario is an entities table that let you filter, order and paginate
// its results.
const clientsWithMoreThan15Years = clientArray.filter( client => client.age > 15 )

// It was only a single case, but in reality this approach will cause many method
// signatures to hold all the cases:
// filterByAgeLessThan( ... )
// filterByAgeMoreThan( ... )
// filterByAgeEqual( ... )
// ...

interface Criteria< T > {
  meetCriteria( itemArray: Array< T > ): Array< T >,
}

class AndCriteria< T > implements Criteria< T > {
  #criteriaArray: Array< Criteria< T > > = []

  addCriteria( criteria: Criteria< T > ) {
    this.#criteriaArray.push( criteria )
  }

  meetCriteria( itemArray: Array< T > ): Array< T > {
    let result: Array< T > = itemArray

    for ( const criteria of this.#criteriaArray ) {
      result = criteria.meetCriteria( result )
    }

    return result
  }

}

class OrCriteria< T > implements Criteria< T > {
  #criteriaArray: Array< Criteria< T > > = []

  constructor( criteriaArray: Array< Criteria< T > > ) {
    this.#criteriaArray = criteriaArray
  }

  addCriteria( criteria: Criteria< T > ) {
    this.#criteriaArray.push( criteria )
  }

  meetCriteria( itemArray: Array< T > ): Array< T > {
    let result: Array< T > = []

    for ( const criteria of this.#criteriaArray ) {
      result.push( ...criteria.meetCriteria( itemArray ) )
    }

    return Array.from( new Set( result ) )
  }

}

// How to use it.

const hasLegalAge: Criteria< Client > = {
  meetCriteria( itemArray: Array< Client > ) {
    return itemArray.filter( item => item.age >= 18 )
  }
}

const byNameAndAge = new AndCriteria()

byNameAndAge.addCriteria( hasLegalAge )

const herNameIsAna: Criteria< Client > = {
  meetCriteria( itemArray: Array< Client > ) {
    return itemArray.filter( item => item.name === 'Ana' )
  }
}

const hisNameIsJohn: Criteria< Client > = {
  meetCriteria( itemArray: Array< Client > ) {
    return itemArray.filter( item => item.name === 'John' )
  }
}

byNameAndAge.addCriteria(
  new OrCriteria< Client >([
    herNameIsAna,
    hisNameIsJohn,
  ])
)

// What improve? We can implement more information to let pagination and sort
// like in codely https://github.com/CodelyTV/php-ddd-example/tree/main/src/Shared/Domain/Criteria.
