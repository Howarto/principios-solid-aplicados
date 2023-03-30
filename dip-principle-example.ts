interface Repository {
  save(): string,
}

class DummyRepository implements Repository {

  save(): string {
    return 'Dummy'
  }

}

class Main {
  #repository: Repository

  constructor( repository: Repository ) {
    this.#repository = repository
  }

  do() {
    this.#repository.save()
  }

}

// Now from the app entrypoint we can do.
const main = new Main( new DummyRepository() )
