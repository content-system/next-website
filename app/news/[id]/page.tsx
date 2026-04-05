import { Error } from "@components/error";
import { getLang, getResource } from "@resources";
import { ctx } from "@service";
import { formatDateTime, getDateFormat } from "web-one";

type StringMap = Record<string, string | string[] | undefined>
export default async function Article({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<StringMap> }) {
  const query = await searchParams
  const lang = getLang(query)
  const resource = getResource(lang)
  const dateFormat = getDateFormat()
  const { id } = await params
  const article = await ctx.article.load(id)
  return (
    !article ? <Error title={resource.error_404_title} description={resource.error_404_message} /> : (
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
  )
}
