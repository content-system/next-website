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
        <img className="article-thumbnail" src={article?.thumbnail}></img>
        {/*<div className="article-content" dangerouslySetInnerHTML={{ __html: article?.content || "" }}></div> */}
        <div className="article-content">
          <p>
            Global technology corporation FPT recently hosted the FPT Francophone Day, a dynamic networking and culture exchange platform for the
            French-speaking community in Vietnam. At the event, FPT introduced the FPT Francophone Association, a move to foster its French-proficient
            professionals and nurture opportunities for business and culture exchange.
          </p>
          <p>
            The event was attended by the French Ambassador to Vietnam, H.E. Olivier Brochet, and representatives from the Embassy of Haiti in Vietnam, Business
            France, Campus France, French Institute in Vietnam (IFV), Vietnam - France Friendship and Cooperation Association (AACVF). Also in attendance were
            over 300 attendees from the Francophone community in Vietnam, French organizations and businesses, French Alumni Vietnam Association (UAVF), and
            French major students from universities in Hanoi.
          </p>
          <p>
            According to Dr. Bui Quang Ngoc, FPT Vice Chairman of the Board of Directors, the establishment of FPT Francophone Day and FPT Francophone
            Association will serve as a platform to connect the French-speaking community within and outside the corporation, building a network of highly
            proficient professionals. He also emphasized FPT’s commitment to bridging French and Vietnamese economies and cultures, driven by technologies,
            innovation, and people development.
          </p>
          <p>
            “The French market has been integral to our business expansion in Europe. With the surge in demand for digital solutions in France and
            French-speaking territories, FPT Software aims to fivefold our onsite workforce and expand our presence to all major cities here. Our next milestone
            for this market will be one of the Top 50 IT companies in France,” said Mdm. Chu Thi Thanh Ha, FPT Software Chairwoman.
          </p>
          <img src="https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/francophone-day-2024_4.webp"></img>
          <p>
            FPT Francophone Day also featured a panel discussion titled "From France to FPT: Journey & Experience." With the participation of FPT leaders and
            tech experts, the panel has sparked engaging conversations and provided attendees with valuable perspectives on the evolving landscape of business
            and technology in both France and Vietnam. It also emphasized the importance of cultural adaptability and the role of technology in bridging
            cultural gaps and fostering collaboration.
          </p>
          <img src="https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/francophone-day-2024_3.webp"></img>
          <p>
            Entered France in 2008, FPT now has over 100 local experts working in major French cities and 600 offshore professionals in Vietnam dedicated to
            serving clients across industries, focusing on AI, Big Data, BI, SAP, DevSecOps, Cloud, and AUTOSAR services. Its robust competencies are recognized
            through strategic partnerships with French giants like Airbus, Geopost, Quadient, Canal+, Sagemcom, OPMobility, Valeo, and more.
          </p>
          <p>
            As part of the company's global expansion, FPT has been actively involved in M&A deals to amplify its offshore delivery capabilities and local
            footprint, notably the recent acquisition of an 80% stake in the French IT consulting firm AOSIS. Last year, its French subsidiary also entered
            France's Top 100 ICT Companies.
          </p>
        </div>
      </div>
    </article>
  )
}
