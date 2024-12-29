import { nanoid } from "nanoid"
import { DB, Repository } from "query-core"
import { Contact, contactModel, ContactRepository, ContactService } from "./contact"
export * from "./contact"

export class SqlContactRepository extends Repository<Contact, string> implements ContactRepository {
  constructor(db: DB) {
    super(db, "contacts", contactModel)
  }
}
export class ContactUseCase implements ContactService {
  constructor(private repository: ContactRepository) {
    this.submit = this.submit.bind(this)
  }
  submit(contact: Contact): Promise<number> {
    contact.id = nanoid(10)
    contact.submittedAt = new Date()
    return this.repository.create(contact)
  }
}
export function useContactService(db: DB): ContactService {
  const repository = new SqlContactRepository(db)
  return new ContactUseCase(repository)
}
