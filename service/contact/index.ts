import { Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { Contact, ContactFilter, contactModel, ContactRepository, ContactService } from "./contact"
export * from "./contact"

export class SqlContactRepository extends Repository<Contact, string> implements ContactRepository {
  constructor(db: DB) {
    super(db, "contacts", contactModel)
  }
}
export class ContactManager extends Manager<Contact, string, ContactFilter> implements ContactService {
  constructor(search: Search<Contact, ContactFilter>, repository: ContactRepository) {
    super(search, repository)
  }
}

export function useContactService(db: DB): ContactService {
  const builder = new SearchBuilder<Contact, ContactFilter>(db.query, "contacts", contactModel, db.driver)
  const repository = new SqlContactRepository(db)
  return new ContactManager(builder.search, repository)
}
