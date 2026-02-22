import { Pagination } from "@core/components/pagination"
import ctx from "@core/context"
import { getResource } from "@resources/index"
import { ArticleFilter } from "@service/article"
import { buildFilter, buildSortSearch, clone, datetimeToString, formatDateTime, getDateFormat, Params, removePage } from "web-one"

const fields = ["id", "title", "publishedAt", "description"]

export default async function News({ searchParams }: Params) {
  const filter = buildFilter<ArticleFilter>(searchParams, ["publishedAt"])
  const dateFormat = getDateFormat()
  const resource = getResource()
  const search = removePage(searchParams)
  const sort = buildSortSearch(searchParams, fields, filter.sort)

  const res = await ctx.article.search(clone(filter), filter.limit, filter.page)
  const list = res.list
  return (
    <div className="view-container">
      <header>
        <h2>{resource.news}</h2>
      </header>
      <div className="search-body">
        <form id="articlesForm" name="articlesForm" className="form" noValidate={true} method="GET">
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
          <ul className="row list card-grid">
            {list &&
              list.length > 0 &&
              list.map((item, i) => {
                return (
                  <li key={i} className="col s12 m6 l4 xl3 img-card">
                    <section>
                      <div className="cover" style={{ backgroundImage: `url('${item.thumbnail}')` }}></div>
                      <a href={`/news/${item.slug}`}>{item.title}</a>
                      <p>{formatDateTime(item.publishedAt, dateFormat)}</p>
                      <p>{item.description}</p>
                    </section>
                  </li>
                )
              })}
          </ul>
        </form>
      </div>
    </div>
  )
}
