import ctx from "@core/lib"

export default async function Careers() {
  const service = ctx.job
  const job = await service.load("senior-backend-developer")
  return (
    <div>
      <p>This is the careers page. {job?.title}</p>
    </div>
  )
}
