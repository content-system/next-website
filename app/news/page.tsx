import { Pagination } from "@core/components/pagination"
import { clone, datetimeToString, formatDateTime, getDateFormat, getNumber, getPage, removePage, SearchParams } from "@core/core-next"
import ctx from "@core/lib"
import { getResource } from "@resources/index"
import { ArticleFilter } from "@service/article"

export default async function News({ searchParams }: { searchParams: SearchParams }) {
  const dateFormat = getDateFormat()
  const resource = getResource()
  const service = ctx.article
  const limit = getNumber(searchParams.limit)
  const page = getPage(searchParams.page)
  const search = removePage(searchParams)
  const filter: ArticleFilter = {
    q: searchParams.q,
    limit,
    page,
  }
  const res = await service.search(clone(filter), limit, page)
  const list = res.list
  return (
    <div className="view-container">
      <header>
        <h2>{resource.news}</h2>
      </header>
      <div>
        <form id="articlesForm" name="articlesForm" noValidate={true} method="GET">
          <section className="row search-group">
            <label className="col s12 m6 search-input">
              <input type="text" id="q" name="q" defaultValue={filter.q} maxLength={255} placeholder={resource.keyword} />
              <button type="submit" className="btn-search" />
            </label>
            <Pagination className="col s12 m6" total={res.total} size={limit} page={page} search={search} />
          </section>
          <section className="row search-group inline">
            <label className="col s12 m6">
              {resource.published_at_from}
              <input
                type="datetime-local"
                step=".010"
                id="publishedAt_min"
                name="publishedAt_min"
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
                name="publishedAt_max"
                data-field="publishedAt.max"
                defaultValue={datetimeToString(filter.publishedAt?.max)}
              />
            </label>
          </section>
        </form>
        <form className="list-result">
          <ul className="row list-view">
            {list &&
              list.length > 0 &&
              list.map((item, i) => {
                return (
                  <li key={i} className="col s12 m6 l4 xl3 card">
                    <section>
                      <div className="cover" style={{ backgroundImage: `url('${item.thumbnail}')` }}></div>
                      <a href={`/news/${item.id}`}>{item.title}</a>
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
