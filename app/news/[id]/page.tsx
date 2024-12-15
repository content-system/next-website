import ctx from "@core/context"
import { formatDateTime, getDateFormat, Params } from "@core/core-next"

const fields = ["id", "title", "publishedAt", "description"]

export default async function Article({ params: { id } }: Params) {
  const dateFormat = getDateFormat()
  const article = await ctx.article.load(id)
  return (
    <div className="view-container">
      <div id="articleForm">
        <header className="article-header">
          <button type="button" id="btnBack" name="btnBack" className="btn-back" />
          <h2>{article?.title}</h2>
        </header>
        <div className="row article-body">
          <h3 className="col s12 article-description">{article?.description}</h3>
          <div className="col s12 article-meta">{formatDateTime(article?.publishedAt, dateFormat)}</div>
          <img className="col s12 article-thumbnail" src={article?.thumbnail}></img>
          <div className="col s12 article-content">{article?.content}</div>
        </div>
      </div>
    </div>
  )
}
