import { getResource } from "@resources/index"
import { Contact } from "@service/contact"
import { formatPhone } from "web-one"

export default function ContactForm() {
  const resource = getResource()
  const contact = {} as Contact
  return (
    <div className="view-container">
      <form id="contactForm" name="contactForm">
        <header>
          <h2>{resource.contact}</h2>
        </header>
        <div className="row">
          <label className="col s12 m6">
            {resource.fullname}
            <input type="text" id="name" name="name" defaultValue={contact.name || ""} maxLength={100} required={true} placeholder={resource.fullname} />
          </label>
          <label className="col s12 m6">
            {resource.country}
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={contact.country || ""}
              maxLength={100}
              required={true}
              placeholder={resource.country}
            />
          </label>
          <label className="col s12 m6">
            {resource.company}
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={contact.company || ""}
              maxLength={100}
              required={true}
              placeholder={resource.company}
            />
          </label>
          <label className="col s12 m6">
            {resource.job_title}
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              data-type="jobTitle"
              defaultValue={contact.jobTitle || ""}
              maxLength={100}
              placeholder={resource.job_title}
            />
          </label>
          <label className="col s12 m6">
            {resource.email}
            <input
              type="text"
              id="email"
              name="email"
              data-type="email"
              defaultValue={contact.email || ""}
              required={true}
              maxLength={120}
              placeholder={resource.email}
            />
          </label>
          <label className="col s12 m6">
            {resource.phone}
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={formatPhone(contact.phone) || ""}
              required={true}
              maxLength={17}
              placeholder={resource.phone}
            />
          </label>
          <label className="col s12 m12">
            {resource.message}
            <textarea id="message" name="message" defaultValue={contact.message} maxLength={400} placeholder={resource.message} />
          </label>
        </div>
        <footer>
          <button type="submit" id="btnSubmit" name="btnSubmit">
            {resource.submit}
          </button>
        </footer>
      </form>
    </div>
  )
}
