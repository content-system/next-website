import { formatDateTime, getDateFormat, Params } from "@core/core-next"
import ctx from "@core/lib"

export default async function Job({ params: { id } }: Params) {
  const dateFormat = getDateFormat()
  const job = await ctx.job.load(id)
  return (
    <div className="view-container">
      <div id="jobForm">
        <header className="job-header">
          <button type="button" id="btnBack" name="btnBack" className="btn-back" />
          <h2>{job?.title}</h2>
        </header>
        <div className="row">
          <h3 className="col s12">{job?.description}</h3>
          <div className="col s12">{job?.quantity}</div>
          <div className="col s12">{formatDateTime(job?.publishedAt, dateFormat)}</div>
        </div>
      </div>
    </div>
  )
}
