import { Pagination } from "@core/components/pagination"
import ctx from "@core/context"
import { getResource } from "@resources/index"
import { JobFilter } from "@service/job"
import { buildFilter, buildSortSearch, clone, datetimeToString, formatDateTime, getDateFormat, Params, removePage } from "web-one"

const fields = ["id", "title", "publishedAt", "description"]

export default async function Careers({ searchParams }: Params) {
  const filter = buildFilter<JobFilter>(searchParams, ["publishedAt"])
  const dateFormat = getDateFormat()
  const resource = getResource()
  const search = removePage(searchParams)
  const sort = buildSortSearch(searchParams, fields, filter.sort)

  const res = await ctx.job.search(clone(filter), filter.limit, filter.page)
  const list = res.list
  return (
    <div className="view-container">
      <header>
        <h2>{resource.news}</h2>
      </header>
      <div>
        <form id="jobsForm" name="jobsForm" className="form" noValidate={true} method="GET">
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <input type="text" id="q" name="q" defaultValue={filter.q} maxLength={255} placeholder={resource.keyword} />
              <button type="submit" className="btn-search" />
            </label>
            <Pagination className="col s12 m6" total={res.total} size={filter.limit} page={filter.page} search={search} />
          </section>
          <section className="row search-group inline">
            <label className="col s12 m6">
              {resource.published_at_from}
              <input
                type="datetime-local"
                step=".010"
                id="publishedAt_min"
                name="publishedAt.min"
                data-field="publishedAt.min"
                defaultValue={datetimeToString(filter.publishedAt?.min)}
              />
            </label>
            <label className="col s12 m6">
              {resource.published_at_to}
              <input
                type="datetime-local"
                step=".010"
                id="publishedAt_max"
                name="publishedAt.max"
                data-field="publishedAt.max"
                defaultValue={datetimeToString(filter.publishedAt?.max)}
              />
            </label>
          </section>
        </form>
        <form>
          <ul className="row list">
            {list &&
              list.length > 0 &&
              list.map((item, i) => {
                return (
                  <li key={i} className="col s12 m6 l4 xl3 list-item">
                    <a href={`careers/${item.id}`}>{item.title}</a>
                    <p>
                      {item.location} {item.quantity}
                      <span>{formatDateTime(item.publishedAt, dateFormat)}</span>
                    </p>
                  </li>
                )
              })}
          </ul>
        </form>
      </div>
    </div>
  )
}
