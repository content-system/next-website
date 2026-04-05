import { Pagination } from "@components/pagination"
import ctx from "@core/context"
import { getLang, getResource } from "@resources"
import { ArticleFilter } from "@service/article"
import Link from "next/link"
import { StringMap } from "onecore"
import { buildFilter, buildSortSearch, clone, datetimeToString, formatDateTime, getDateFormat, removePage } from "web-one"

const fields = ["id", "title", "publishedAt", "description"]

export default async function News({searchParams}: {searchParams: Promise<StringMap>}) {
  const query = await searchParams
  const lang = getLang(query)
  const resource = getResource(lang)
  const dateFormat = getDateFormat()
  const filter = buildFilter<ArticleFilter>(query, ["publishedAt"])
  const search = removePage(query)
  const sort = buildSortSearch(query, fields, filter.sort)

  const res = await ctx.article.search(clone(filter), filter.limit, filter.page)
  const list = res.list
  return (
    <div className="view-container">
      <header>
        <h2>{resource.news}</h2>
      </header>
      <div className="main-body">
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
                      <Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link>
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
