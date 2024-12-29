import ctx from "@core/context"
import { fromFormData, printObject } from "@core/core-next"
import { getResource } from "@resources/index"
import { Contact, contactModel } from "@service/contact"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { formatPhone } from "web-one"
import { validate } from "xvalidators"

export default async function ContactForm() {
  const headerList = headers()
  const pathname = headerList.get("x-current-path")
  console.log("Pathname " + pathname)
  const resource = getResource()
  const contact = {} as Contact
  async function save(formData: FormData) {
    "use server"
    const obj = fromFormData<Contact>(formData, contactModel)
    console.log("Print object " + JSON.stringify(obj))
    printObject(obj)
    const errors = validate<Contact>(obj, contactModel, resource)
    if (errors.length > 0) {
      console.log("Validation Error " + errors[0].message)
      redirect("/works")
    } else {
      const result = await ctx.contact.submit(obj)
      console.log("Result " + result)
      if (result > 0) {
        redirect("/news")
      } else {
        redirect("/leadership")
      }
    }
  }
  return (
    <div className="view-container">
      <form id="contactForm" name="contactForm" noValidate={true} action={save}>
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
