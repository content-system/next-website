import { getResource } from "@resources/index"

export default function Companies() {
  const resource = getResource()
  return (
    <div>
      <header>
        <h1>Companies</h1>
      </header>
      <div>
        <h2>Vertical Industry</h2>
        <ul className="row list">
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/banner/media-desktop.webp"></img>
            <h3>FPT Media & Entertainment</h3>
            <h4>Take the lead in the race of customer-driven content</h4>
            <p>
              For more than 20 years, FPT Software has helped multiple communications, media, and entertainment companies accelerate their roadmaps, rapidly
              delivering solutions to the market.
            </p>
            <p>
              Providing consulting and technology services, leveraged by flexible staffing models, we support the entire media lifecycle and rapidly scale up at
              anytime and anywhere.
            </p>
          </li>
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/industries-healthcare/healthcare-lp_banner.png"></img>
            <h3>FPT Healthcare</h3>
            <h4>Transform the journey of care through the power of technology and human expertise</h4>
            <p>The healthcare industry is witnessing a dramatic transformation marked by changing customer expectations and increased regulations.</p>
            <p>
              As a long-time technology partner of leading healthcare providers, FPT Software stays on top of industry and technological demand, blending
              insights, innovations and expertise to offer tailored solutions that streamline operations and improve patient care experiences. Our expertise and
              experience are centered on delivering Software for Medical Devices, Hospital Information Systems, Digital Health Platforms, Health Insurance,
              Digital Transformation for Pharmaceuticals, Virtual Care, and Telehealth.
            </p>
          </li>
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/automotive/automotive-lp_banner-3.png"></img>
            <h3>FPT Automotive</h3>
            <h4>Moving into the fast lane of smart, software-defined mobility</h4>
            <p>
              With two decades of experience in the Automotive industry, FPT Software's automotive technology subsidiary, FPT Automotive was launched in 2023
              with a mission to drive the advancement of software-defined vehicles and shape the new mobility era.
            </p>
            <p>
              Our team of automotive experts is equipped and experienced to accompany car manufacturers and suppliers in advancing the mobility ecosystem,
              having enabled the world's leading automakers, OEMs, Tier-1 suppliers, and semiconductor companies to innovate, optimize and maintain a
              competitive edge in the automotive industry. This support is crucial for navigating challenges such as industry volatility, disrupted supply
              chains, and rapidly evolving market demands.
            </p>
          </li>
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/logistics/2880x1000-min.png"></img>
            <h3>FPT Logistics</h3>
            <h4>Make substantial and bold moves toward resilience and profitability</h4>
            <p>
              Logistics is at a tipping point for transformation while contending with evolving customer expectations and volatile disruption. Now is the time
              for freight and logistics companies to forge new paths to deliver strong growth, integrating advanced technologies to revolutionize supply chain
              management and enhance efficiency and customer satisfaction.
            </p>
            <p>
              With a track record of success in digital innovation and AI application, FPT Software combines extensive industry insights and technological
              acumen to enable logistics partners to become more resilient, optimize operations, fuel better margins, and enhance customer experiences.
            </p>
          </li>
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/bfsi/banner-2.png"></img>
            <h3>FPT Banking, Financial Services & Insurance</h3>
            <h4>Defy the speed of change and realize the industry’s full potential with digitization</h4>
            <p>
              In the fast-changing digital age, banking and financial institutions, which can be famously conservative, are faced with the choice to adopt a
              fully digital approach and embrace continuous technological innovations to stay competitive, outpace change, and capitalize on emerging
              opportunities.
            </p>
            <p>
              FPT Software has accompanied world-leading financial institutions in their digital transformation journey with comprehensive, AI-enabled services
              and solutions to modernize, streamline processes, enhance security, and provide a seamless customer experience.
            </p>
          </li>
          <li className="col s12 l6 img-card">
            <img src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/manufacturing/ldp_manufacturing_banner1-min.png"></img>
            <h3>FPT Manufacturing</h3>
            <h4>Bridging the gap between Production Strategy and Execution with digitization, analytics, and industry insights</h4>
            <p>
              In today's volatile, uncertain, complex, and ambiguous (VUCA) business landscape, agility and resilience are no longer enough - companies must
              transition to an antifragile state in which values are extracted from obstacles.
            </p>
            <p>
              With over 20 years of manufacturing expertise, FPT Software helps clients establish supply chains that not only withstand uncertainty but also
              grow stronger through adversity. By infusing velocity, collaboration, and emerging technologies such as AI, digital twins, and predictive
              analytics, we empower our partners to anticipate disruptions, transform difficulties into opportunities, and thrive even in the most turbulent
              environments.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
