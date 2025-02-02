import ctx from "@core/context"
import { formatDateTime, getDateFormat, Params } from "web-one"

const fields = ["id", "title", "publishedAt", "description"]

export default async function Article({ params: { id } }: Params) {
  const dateFormat = getDateFormat()
  const article = await ctx.article.load(id)
  return (
    <article className="article">
      <header>
        <button type="button" id="btnBack" name="btnBack" className="btn-back" />
        <h2>{article?.title}</h2>
      </header>
      <div className="article-body">
        <h4 className="article-description">{article?.description}</h4>
        <h4 className="article-meta">{formatDateTime(article?.publishedAt, dateFormat)}</h4>
        {/*<img className="article-thumbnail" src={article?.thumbnail}></img>*/}
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article?.content || "" }}></div>
      </div>
    </article>
  )
}
