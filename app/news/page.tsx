import ctx from "@core/lib"

export default async function News() {
  const service = ctx.article
  const article = await service.load("20240826001")
  return (
    <div>
      <p>This is the news page. {article?.description}</p>
    </div>
  )
}
