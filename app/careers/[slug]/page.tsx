import { Error } from "@components/error";
import { getLang, getResource } from "@resources";
import { ctx } from "@service";
import { enLocale, getLocale } from "locale-service";
import { formatDateTime } from "web-one";

type StringMap = Record<string, string | string[] | undefined>
export default async function Job({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<StringMap> }) {
  const query = await searchParams
  const lang = getLang(query)
  const resource = getResource(lang)
  const locale = getLocale(lang) || enLocale
  const dateFormat = locale.dateFormat
  const { slug } = await params
  const job = await ctx.job.load(slug)
  return (
    !job ? <Error title={resource.error_404_title} message={resource.error_404_message} /> : (
      <article className="article" >
        <header>
          <button type="button" id="btnBack" name="btnBack" className="btn-back" />
          <h2>{job?.title}</h2>
        </header>
        <div className="article-body">
          <h3 className="article-description">
            {resource.location}: {job.location}
          </h3>
          <h4 className="article-meta">{formatDateTime(job.publishedAt, dateFormat)}</h4>
          <h4 className="article-meta">
            {resource.quantity}: {job.quantity}
          </h4>
          <div className="job-description" dangerouslySetInnerHTML={{ __html: job.description }}></div>
        </div>
      </article >
    )
  )
}
